#!/usr/bin/env python3
"""Render a .pptx to one JPEG per slide.

LibreOffice cannot open .pptx in some sandboxes, so this reads the real shape
tree with python-pptx, lays each slide out as HTML, and screenshots it with
Chromium via Playwright.

    python3 reports/render-slides.py reports/ytd-road-to-9m.pptx out_dir/

Covers what these decks actually use: rectangles, rounded rectangles, text
frames, and clustered/stacked bar and column charts.
"""
import sys, os, html, subprocess, json
from pptx import Presentation
from pptx.util import Emu

EMU = 914400.0
PPI = 144                      # render scale: 13.333in x 7.5in -> 1920 x 1080
PT = PPI / 72.0                # points -> px

def esc(t): return html.escape(t).replace("\n", "<br>")

# the Office fonts are rarely installed on a renderer; Liberation is metric-compatible
FONT_SUB = {
    'Cambria':     '"Liberation Serif",Georgia,serif',
    'Calibri':     '"Liberation Sans",Arial,sans-serif',
    'Courier New': '"Liberation Mono","Courier New",monospace',
}
def font_stack(name):
    return FONT_SUB.get(name, '"%s",Arial,sans-serif' % (name or 'Calibri'))

def rgb_of(color, default=None):
    try:
        if color and color.type is not None and color.rgb is not None:
            return "#%s" % str(color.rgb)
    except Exception:
        pass
    return default

def shape_fill(sh):
    try:
        f = sh.fill
        if f.type is not None and f.type == 1:          # solid
            return rgb_of(f.fore_color)
    except Exception:
        pass
    return None

def shape_line(sh):
    try:
        ln = sh.line
        c = rgb_of(ln.color)
        w = ln.width.pt if ln.width is not None else None
        if c and (w is None or w > 0):
            return c, (w or 1)
    except Exception:
        pass
    return None, 0

def slide_bg(slide):
    # pptxgenjs writes <p:bg><p:bgPr><a:solidFill><a:srgbClr val="..."/>
    el = slide._element.find('{http://schemas.openxmlformats.org/presentationml/2006/main}bg')
    if el is not None:
        clr = el.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}srgbClr')
        if clr is not None and clr.get('val'):
            return '#' + clr.get('val')
    return '#FFFFFF'

ALIGN = {1: 'center', 2: 'right', 3: 'justify'}
# MSO_ANCHOR: TOP=1, MIDDLE=3, BOTTOM=4
ANCHOR = {1: 'flex-start', 3: 'center', 4: 'flex-end'}

def text_html(sh):
    tf = sh.text_frame
    va = getattr(tf, 'vertical_anchor', None)
    anchor = ANCHOR.get(int(va) if va is not None else 1, 'flex-start')
    paras = []
    for p in tf.paragraphs:
        if not p.runs:
            paras.append('<div>&nbsp;</div>'); continue
        align = ALIGN.get(p.alignment.value if p.alignment is not None else 0, 'left')
        runs = []
        for r in p.runs:
            fnt = r.font
            size = (fnt.size.pt if fnt.size else 18) * PT
            fam = fnt.name or 'Calibri'
            col = rgb_of(fnt.color, '#000000')
            sp = ''
            try:
                cs = r._r.get_or_add_rPr().get('spc')
                if cs: sp = 'letter-spacing:%.2fpx;' % (int(cs) / 100.0 * PT)
            except Exception:
                pass
            style = ('font-family:%s;font-size:%.1fpx;color:%s;%s%s%s%s'
                     % (font_stack(fam), size, col,
                        'font-weight:700;' if fnt.bold else '',
                        'font-style:italic;' if fnt.italic else '',
                        sp,
                        'line-height:1.18;'))
            runs.append('<span style="%s">%s</span>' % (style, esc(r.text)))
        paras.append('<div style="text-align:%s">%s</div>' % (align, ''.join(runs)))
    return anchor, ''.join(paras)

def safe_values(series, n):
    """series.values raises when a point is written as an empty <c:v/>, which is
    how a null in the generator's data arrives. Read the cache directly instead."""
    NS = '{http://schemas.openxmlformats.org/drawingml/2006/chart}'
    vals = [0.0] * n
    val = series._element.find(NS + 'val')
    if val is None:
        return vals
    for pt in val.iter(NS + 'pt'):
        try:
            idx = int(pt.get('idx'))
            v = pt.find(NS + 'v')
            if v is not None and v.text not in (None, ''):
                if 0 <= idx < n:
                    vals[idx] = float(v.text)
        except (TypeError, ValueError):
            continue
    return vals

# ---------------------------------------------------------------- charts
def chart_html(sh, w, h):
    ch = sh.chart
    ct = str(ch.chart_type)
    horizontal = 'BAR_' in ct
    stacked = 'STACKED' in ct
    plot = ch.plots[0]
    cats = [str(c) for c in plot.categories]
    series = []
    for s in plot.series:
        vals = safe_values(s, len(cats))
        col = None
        try: col = rgb_of(s.format.fill.fore_color)
        except Exception: pass
        series.append({'name': s.name, 'values': vals, 'color': col or '#07717A'})
    # value axis maximum, as written by the generator
    try: vmax = ch.value_axis.maximum_scale
    except Exception: vmax = None
    if not vmax:
        tot = [sum(s['values'][i] for s in series) if stacked else max(s['values'][i] for s in series)
               for i in range(len(cats))]
        vmax = max(tot) * 1.1 or 1

    cat_lines = max(len(c.split('\n')) for c in cats) if cats else 1
    cat_px = 8 + cat_lines * 11.5 * PT * 1.25
    PLOT_H = h - (cat_px + 34)           # room for category labels and the legend
    PLOT_X = 92
    PLOT_W = w - PLOT_X - 16
    out = ['<div style="position:relative;width:%dpx;height:%dpx;">' % (w, h)]
    # gridlines + value labels
    for i in range(5):
        frac = i / 4.0
        y = PLOT_H * (1 - frac)
        out.append('<div style="position:absolute;left:%dpx;top:%.1fpx;width:%dpx;height:1px;'
                   'background:#D5DCDA"></div>' % (PLOT_X, y, PLOT_W))
        out.append('<div style="position:absolute;left:0;top:%.1fpx;width:%dpx;text-align:right;'
                   'font:%.0fpx \'Liberation Sans\',Arial;color:#6B7A77">£%s</div>'
                   % (y - 9, PLOT_X - 10, 11 * PT, format(int(vmax * frac), ',')))
    # bars
    n = len(cats)
    slot = PLOT_W / float(n)
    grp = slot * 0.62
    for ci in range(n):
        cx = PLOT_X + ci * slot
        if stacked:
            acc = 0
            for s in series:
                v = s['values'][ci]
                if not v: continue
                bh = PLOT_H * v / vmax
                out.append('<div style="position:absolute;left:%.1fpx;bottom:%.1fpx;width:%.1fpx;'
                           'height:%.1fpx;background:%s"></div>'
                           % (cx + (slot - grp) / 2, (h - PLOT_H) + acc, grp, bh, s['color']))
                acc += bh
        else:
            bw = grp / len(series)
            for si, s in enumerate(series):
                v = s['values'][ci]
                bh = PLOT_H * max(v, 0) / vmax
                out.append('<div style="position:absolute;left:%.1fpx;bottom:%.1fpx;width:%.1fpx;'
                           'height:%.1fpx;background:%s"></div>'
                           % (cx + (slot - grp) / 2 + si * bw, h - PLOT_H, bw - 2, bh, s['color']))
        out.append('<div style="position:absolute;left:%.1fpx;top:%.1fpx;width:%.1fpx;text-align:center;'
                   'font:%.0fpx \'Liberation Sans\',Arial;color:#6B7A77;white-space:pre-line">%s</div>'
                   % (cx, PLOT_H + 6, slot, 11.5 * PT, esc(cats[ci])))
    # legend
    lg = ['<div style="position:absolute;left:0;top:%dpx;width:%dpx;display:flex;gap:26px;'
          'justify-content:center;font:%.0fpx \'Liberation Sans\',Arial;color:#6B7A77">'
          % (h - 28, w, 11.5 * PT)]
    for s in series:
        lg.append('<span style="display:flex;align-items:center;gap:7px">'
                  '<span style="width:12px;height:12px;background:%s;display:inline-block"></span>%s</span>'
                  % (s['color'], esc(s['name'])))
    lg.append('</div>')
    out.append(''.join(lg))
    out.append('</div>')
    return ''.join(out)

# ---------------------------------------------------------------- slides
def render_slide(slide):
    parts = []
    for sh in slide.shapes:
        if sh.left is None: continue
        x, y = sh.left / EMU * PPI, sh.top / EMU * PPI
        w, hh = (sh.width or 0) / EMU * PPI, (sh.height or 0) / EMU * PPI
        box = 'position:absolute;left:%.1fpx;top:%.1fpx;width:%.1fpx;height:%.1fpx;' % (x, y, w, hh)
        if sh.has_chart:
            parts.append('<div style="%s">%s</div>' % (box, chart_html(sh, w, hh)))
            continue
        fill = shape_fill(sh)
        lc, lw = shape_line(sh)
        deco = ''
        if fill: deco += 'background:%s;' % fill
        if lc and lw: deco += 'border:%.1fpx solid %s;box-sizing:border-box;' % (max(lw * PT / 2, 1), lc)
        try:
            if sh.shape_type is not None and 'ROUNDED' in str(sh.shape_type): deco += 'border-radius:6px;'
        except Exception:
            pass
        inner = ''
        if sh.has_text_frame and sh.text_frame.text.strip():
            anchor, t = text_html(sh)
            inner = ('<div style="display:flex;flex-direction:column;justify-content:%s;'
                     'width:100%%;height:100%%;overflow:visible">%s</div>' % (anchor, t))
        parts.append('<div style="%s%s">%s</div>' % (box, deco, inner))
    return parts

def main():
    src = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else 'slides'
    os.makedirs(out, exist_ok=True)
    pr = Presentation(src)
    W = int(pr.slide_width / EMU * PPI)
    H = int(pr.slide_height / EMU * PPI)
    pages = []
    for i, slide in enumerate(pr.slides, 1):
        body = ''.join(render_slide(slide))
        page = ('<!doctype html><meta charset="utf-8">'
                '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
                'family=Courier+Prime:wght@400;700&display=swap">'
                '<style>html,body{margin:0;padding:0}'
                'body{width:%dpx;height:%dpx;overflow:hidden;background:%s}'
                '*{box-sizing:content-box}</style><body>%s</body>'
                % (W, H, slide_bg(slide), body))
        f = os.path.join(out, 'slide-%02d.html' % i)
        open(f, 'w').write(page)
        pages.append(f)
    meta = {'w': W, 'h': H, 'pages': [os.path.abspath(p) for p in pages], 'out': os.path.abspath(out)}
    open(os.path.join(out, '_pages.json'), 'w').write(json.dumps(meta))
    print('%d slide pages written to %s (%dx%d)' % (len(pages), out, W, H))

if __name__ == '__main__':
    main()
