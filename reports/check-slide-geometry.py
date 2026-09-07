import sys
from pptx import Presentation
from pptx.util import Emu
import math
E=914400.0
SW,SH=13.333,7.5
DECK=sys.argv[1] if len(sys.argv)>1 else 'ytd-road-to-9m.pptx'
pr=Presentation(DECK)
# average glyph width as a fraction of point size
AVG={'Courier New':0.600,'Cambria':0.480,'Calibri':0.465}
issues=[]
for si,s in enumerate(pr.slides,1):
    boxes=[]
    for sh in s.shapes:
        if sh.left is None: continue
        x,y,w,h=sh.left/E,sh.top/E,(sh.width or 0)/E,(sh.height or 0)/E
        name=(sh.name or '')
        # 1. bounds
        if x< -0.01 or y< -0.01 or x+w>SW+0.01 or y+h>SH+0.01:
            issues.append(f"slide {si}: '{name}' out of bounds  x{x:.2f} y{y:.2f} w{w:.2f} h{h:.2f}")
        # 2. edge margin (charts/shapes should keep 0.5in)
        if x < 0.49 or y < 0.39 or SW-(x+w) < 0.49 or SH-(y+h) < 0.29:
            issues.append(f"slide {si}: '{name}' tight margin  L{x:.2f} T{y:.2f} R{SW-(x+w):.2f} B{SH-(y+h):.2f}")
        # 3. text fit
        if sh.has_text_frame and sh.text_frame.text.strip():
            txt=sh.text_frame.text
            runs=[r for p_ in sh.text_frame.paragraphs for r in p_.runs]
            fs=max([(r.font.size.pt if r.font.size else 18) for r in runs] or [18])
            ff=next((r.font.name for r in runs if r.font.name),'Calibri')
            adv=AVG.get(ff,0.47)*fs/72.0
            per_line=max(1,int(w/adv)) if w>0 else 1
            lines=sum(max(1,math.ceil(len(p_.text)/per_line)) for p_ in sh.text_frame.paragraphs if p_.text) or 1
            need=lines*fs*1.22/72.0
            if need>h+0.02:
                issues.append(f"slide {si}: TEXT OVERFLOW '{txt[:42]}...' needs {need:.2f}in in {h:.2f}in (font {ff} {fs}pt, w{w:.2f})")
            boxes.append((x,y,w,h,txt[:28]))
    # 4. text-box overlaps
    for i in range(len(boxes)):
        for j in range(i+1,len(boxes)):
            a,b=boxes[i],boxes[j]
            ox=min(a[0]+a[2],b[0]+b[2])-max(a[0],b[0])
            oy=min(a[1]+a[3],b[1]+b[3])-max(a[1],b[1])
            if ox>0.06 and oy>0.06:
                issues.append(f"slide {si}: text overlap {ox:.2f}x{oy:.2f}in  '{a[4]}' <> '{b[4]}'")
print(f"{DECK}: "+("\n".join(issues) if issues else "no geometry issues"))
print(f"\n{len(issues)} issue(s)")
