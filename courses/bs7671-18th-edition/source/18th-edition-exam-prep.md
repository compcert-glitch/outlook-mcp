# 18th Edition Exam Prep

*BS 7671:2018 \+ A2:2022 \+ A3:2024 \+ A4:2026 — City & Guilds 2382 revision notes and a 152-question practice bank.*

This is a companion to your own copy of BS 7671, not a replacement for it — the exam is open book, so use these notes to sharpen recall and technique, and use the practice questions to test yourself before checking the answer key at the end.

---

## Contents

1. [Revision Notes](#revision-notes)  
2. [Practice Questions](#practice-questions)  
3. [Answer Key](#answer-key)

---

## Revision Notes

### 0\. Exam technique & format

*What you are actually being tested on, and how to spend your revision time.*

- **Format:** 60 questions  
- **Time:** 2 hours  
- **Book status:** Open book  
- **Pass mark:** \~60% (aim 80%+)

The exam is **open book** — you are allowed your copy of BS 7671 and a scientific calculator (check your exam centre’s exact permitted-materials list, since some centres exclude the On-Site Guide). That changes what “revision” should mean:

- You do *not* need to memorise every table value. You need to know the structure of the book cold, so you can land on the right regulation, chapter or table in well under a minute.  
- Learn the **Parts** (1–8), and roughly which Chapter/Section covers what — that is the single biggest time-saver in the exam room.  
- Where a question gives you numbers, work the calculation through properly rather than guessing — the formulas are simple once you know which one applies.  
- Tab or flag the sections you personally find slow to locate (earthing systems, disconnection times, special locations) before exam day.

>   
> **Rule of thumb:** if a question is really a “go and look this up” question, don’t fight it from memory — find the table. If it’s a “do you understand the principle” question, the book won’t save you, so that’s where genuine understanding matters most.

### 1–2. Scope, purpose & key definitions

*Parts 1 and 2 set the scope of BS 7671 and define the vocabulary used throughout the rest of the book.*

#### Structure of the book, at a glance

| Part | Covers |
| :---- | :---- |
| 1 | Scope, object and fundamental principles |
| 2 | Definitions |
| 3 | Assessment of general characteristics |
| 4 | Protection for safety (shock, thermal, overcurrent, isolation & switching) |
| 5 | Selection and erection of equipment (cables, earthing, switchgear) |
| 6 | Inspection and testing |
| 7 | Special installations or locations (bathrooms, pools, sites, EV charging…) |
| 8 | Prosumer’s installations, energy efficiency & functional requirements |

#### Definitions worth knowing cold

- **Basic protection** — protection against shock under normal, fault-free conditions (insulation, barriers, enclosures).  
- **Fault protection** — protection against shock under a single fault condition (earthing \+ automatic disconnection, or an equivalent measure).  
- **Exposed-conductive-part** — a conductive part of equipment, touchable, not normally live but can become live under fault.  
- **Extraneous-conductive-part** — a conductive part liable to introduce a potential, not part of the electrical installation (structural steel, incoming pipework).  
- **Circuit protective conductor (cpc)** — connects exposed-conductive-parts to the main earthing terminal.  
- **Ze / Zs** — external earth fault loop impedance / total earth fault loop impedance. `Zs = Ze + (R1+R2)`.  
- **Prospective fault current (PFC)** — the current that would flow for a fault of negligible impedance.  
- **Diversity** — the allowance made because not everything runs flat-out at once.  
- **Competent person** — has the skill, knowledge and experience to avoid danger to self and others.

### 3\. Assessment of general characteristics

*Before design begins, Part 3 requires the whole picture of the supply, structure and environment to be understood.*

- **Purpose, supplies & structure** — maximum demand and diversity, number and type of live conductors, earthing arrangement, nature of the structure.  
- **External influences** — the AA/AB/AC… coding system (ambient temperature, altitude, presence of water, mechanical impact, presence of corrosive/polluting substances, and so on) that governs equipment selection (IP ratings, cable types, containment).  
- **Compatibility** — checking that one item of equipment (starting current, harmonics, earth leakage) won’t cause a harmful effect on other equipment or the supply itself.  
- **Maintainability** — the installation must be designed so inspection, testing and maintenance can actually be carried out.

>   
> On an existing installation, this assessment extends to the condition of equipment to be reused and the characteristics of the existing supply — you cannot design an extension in isolation from what is already there.

### 4.1. Protection against electric shock (411)

*The core shock-protection regulation, and the one most calculation questions circle back to.*

#### Maximum disconnection times — Table 41.1

*Uo \= 230V nominal*

| System | Final circuit ≤32A | Distribution circuits / \>32A |
| :---- | :---- | :---- |
| TN | 0.4s | 5s |
| TT | 0.2s | 1s |

#### Additional protection — 30mA RCDs

Required (subject to the limited exceptions BS 7671 lists) for:

- Socket-outlets rated up to 32A for use by ordinary persons (411.3.3).  
- Mobile equipment not exceeding 32A used outdoors.  
- AC final circuits supplying luminaires in domestic (dwelling) premises (411.3.4).  
- Cables concealed in a wall/partition at less than 50mm depth, outside the permitted safe zones (522.6.202), unless otherwise protected.

#### The other protective measures

- **SELV / PELV** (extra-low voltage): ≤50V a.c. / 120V ripple-free d.c., basic \+ fault protection both provided by the low voltage and source isolation itself.  
- **Electrical separation (413)** — a single circuit fed from an isolating source, live parts not connected to earth or another circuit.  
- **Obstacles / placing out of reach** — only where the installation is supervised or controlled by skilled/instructed persons, not for ordinary persons.

>   
> **TT reminder:** Ze on a TT system is often too high for an overcurrent device alone to achieve ADS in time — an RCD is almost always the mechanism actually doing the fault-protection job.

### 4.2. Protection against thermal effects & fire (42)

*Covers burns, fire risk from equipment, and (since Amendment 2\) Arc Fault Detection Devices.*

- Fixed equipment likely to reach ignition temperatures must be positioned or guarded so nearby materials can’t be subjected to a dangerous temperature.  
- Hand-held equipment: accessible non-metallic parts liable to be touched should not exceed **65°C** in normal use (Table 42.1).  
- 422 covers locations with particular fire risk — escape routes, high fire-load areas, and where a “significant quantity” of flammable liquid (generally treated as **25 litres**) is stored.  
- Spotlights/luminaires near combustible surfaces: minimum spacing broadly increases with wattage (illustrative bands often quoted: ≤100W ≈0.5m, \>100–300W ≈0.8m, \>300–500W ≈1.0m — always confirm the current figures).

#### Arc Fault Detection Devices (AFDDs) — 421.1.7

AFDDs detect arcing faults (series/parallel) that conventional overcurrent devices and RCDs may not catch — a leading cause of electrical fires. Fitted **at the origin of the final circuit** they protect. Required as a minimum for single-phase a.c. final circuits ≤32A in higher-risk residential premises such as HMOs, purpose-built student accommodation and care homes; recommended more widely.

### 4.3. Overcurrent protection (43 & 434\)

*The rules and formulas behind selecting a protective device and checking a conductor survives a fault.*

- **Device selection:** Ib ≤ In ≤ Iz  
    
- **Effective operation:** I2 ≤ 1.45 × Iz  
    
- **Adiabatic (fault):** S \= √(I²t) / k  
    
- **Ib** — design current of the circuit. **In** — rated current of the device. **Iz** — the cable’s effective current-carrying capacity once all rating factors are applied.  
    
- The breaking capacity of a device must be ≥ the prospective fault current at that point (or be backed up per 434.5.1).  
    
- Table 43.1 gives k-values for the adiabatic equation, by conductor material, insulation type and joint (e.g. a tinned soldered copper joint with 60°C thermosetting insulation is a commonly cited example around k=122) — confirm the exact figure for your exact combination.  
    
- Overload protection can only be omitted in the limited circumstances BS 7671 specifically allows (433.3) — it is not a general exemption.

### 4.4/4.6/53. Overvoltage, switching, isolation & SPDs

- **SPDs (surge protective devices)** guard against transient overvoltages (lightning, switching events); a risk assessment (or the simplified method in 443\) determines whether they’re required.  
- **Isolation** must disconnect all live supply conductors of the relevant part, be identifiable, accessible, and resist inadvertent/unauthorised reclosure while work is in progress.  
- **Functional switching** controls normal operation (a light switch) — it is not a substitute for isolation.  
- **Emergency switching** must act rapidly, by a single action, to remove danger.  
- **Mechanical maintenance switches (537.3.2.4)** must be securable in the OFF position (lockable, or by fuse/link removal).  
- **Firefighter’s switches** (e.g. for discharge-tube signage) — typically red, positioned for fire-service access, with an indicator lamp.

### 5.2. Cable selection, current-carrying capacity & voltage drop

*Chapter 52 — how a cable’s tabulated rating becomes the real, installed-condition rating, and how voltage drop is checked.*

#### Rating factors

`Iz = It × Ca × Cg × Ci × (other relevant factors)`

- **Ca** — ambient temperature (reduces Iz above the tabulated reference temperature).  
- **Cg** — grouping (bunched cables mutually heat each other).  
- **Ci** — thermal insulation (a cable fully surrounded by insulation can’t shed heat — the biggest single derating factor in domestic work).  
- General form: `Ca = √[(θz − θa) / (θz − θref)]` — conductor operating temp, actual ambient, tabulated reference.

#### Voltage drop

| Use | Limit (public LV supply) |
| :---- | :---- |
| Lighting | 3% |
| Other uses | 5% |

`Voltage drop (V) = mV/A/m × Ib × length (m) / 1000`

#### Cable placement in structures (522.6.201/.202)

- Cables in joists: ≥50mm from the top/bottom, or mechanically protected, unless run in a permitted safe zone.  
- Safe zones in walls: horizontal/vertical bands within 150mm of a wall/ceiling junction or corner, or running directly to/from an accessory.  
- Outside a safe zone at \<50mm depth: needs 30mA RCD protection or robust mechanical protection.

#### Core colours

| Conductor | Colour |
| :---- | :---- |
| Line (single-phase AC) | Brown |
| Neutral | Blue |
| Protective (earth) | Green & yellow |
| DC positive (L+) | Brown |
| DC negative (L−) | Grey |

### 5.4. Earthing arrangements & bonding

*Chapter 54 — how the earth path is formed, and what has to be bonded to it.*

#### Earthing systems

| System | Earth path back to source |
| :---- | :---- |
| TN-S | Metallic cable sheath/armour from the DNO transformer |
| TN-C-S (PME) | Combined PEN conductor on the supply side; split into separate N and cpc within the installation |
| TT | No metallic path — relies on a local earth electrode |

> **Open-PEN risk:** if a PME neutral fails, exposed-conductive-parts can become live relative to true earth — the reason PME earthing carries restrictions in certain special locations and for EV charge points.

#### Bonding

- **Main protective bonding** connects extraneous-conductive-parts (incoming water/gas pipes, structural steel) to the main earthing terminal. Table 54.8 minimum is 6mm² copper-equivalent (many DNOs specify a practical 10mm² minimum on PME supplies).  
- **Supplementary bonding**: minimum 4mm² if not mechanically protected, 2.5mm² if mechanically protected.  
- Warning notice at a bonding connection: *“Safety Electrical Connection – Do Not Remove”* (514.13.1).  
- **Functional earthing** (Section 545, revised by A4) is distinct from protective earthing — it exists for correct operation of equipment and EMC, not shock protection.

### 6\. Inspection & testing

*Part 6 — the sequence, the tests, and how findings get certified.*

#### Dead-test sequence (then live tests)

1. Continuity of protective conductors (including main & supplementary bonding)  
2. Continuity of ring final circuit conductors (figure-of-eight method)  
3. Insulation resistance  
4. Polarity (can be confirmed via the continuity tests)  
5. Site-applied insulation / protection by SELV, PELV or electrical separation, where relevant

*Live tests:* Ze, then Zs, prospective fault current, RCD operation, phase sequence, functional testing.

#### Key test values

| Test | Voltage/condition | Minimum result |
| :---- | :---- | :---- |
| Insulation resistance, up to 500V circuits | 500V DC | 1.0 MΩ |
| Insulation resistance, SELV/PELV | 250V DC | 0.5 MΩ |
| General RCD at IΔn | — | ≤300ms |
| General RCD at 5×IΔn | — | ≤40ms |

Ze is measured with the main switch closed, main bonding in place, and the installation’s earthing conductor temporarily disconnected from the MET for the test.

#### Certification

- **EIC** — new installation work, or any addition/alteration that includes a new circuit.  
- **Minor Electrical Installation Works Certificate** — alterations/additions with no new circuit.  
- **EICR** — periodic inspection of an existing installation.

#### EICR observation codes

| Code | Meaning |
| :---- | :---- |
| C1 | Danger present — immediate remedial action required |
| C2 | Potentially dangerous — urgent remedial action required |
| C3 | Improvement recommended |
| FI | Further investigation required, without delay |

Typical maximum re-inspection intervals: owner-occupied domestic — 10 years or change of occupancy; private rented (England, statutory) — 5 years or sooner as required; commercial — 5 years; industrial — 3 years; construction site installations — 3 months. Always check the current guidance for the specific premises type.

### 7\. Special installations & locations

*Part 7 — extra rules for higher-risk or unusual environments. Learn the zone concept once and it transfers across sections.*

#### 701 — Bathrooms

| Zone | Extent | Min. IP |
| :---- | :---- | :---- |
| 0 | Inside the bath/shower basin | IPX7 |
| 1 | Above zone 0, up to 2.25m | IPX4 |
| 2 | 0.6m beyond zone 1 | IPX4 |

Supplementary bonding may be omitted where all final circuits meet 411.3.2 disconnection times, have 30mA RCD additional protection, and main bonding is in place.

#### 702 — Swimming pools

Zone 0 \= the pool basin; zones 1 & 2 extend outward and, above diving boards/platforms, vertically to around 2.5m.

#### 703 — Saunas

Zoned by height rather than distance from a wet area — zone 1 broadly 0–1.0m near the heater, zone 3 generally starting above the 1.0m mark.

#### 704 / 705 / 706 — Sites, agriculture, restrictive locations

- **Construction sites**: reduced low voltage (110V CTE) for portable tools halves the shock voltage to earth (55V) in harsh conditions.  
- **Agricultural/horticultural**: extra RCD protection — livestock can be more sensitive to shock, and the environment is damp/corrosive.  
- **Restrictive conductive locations** (inside a tank/boiler): body resistance is effectively reduced by extensive contact with earthed metal, raising shock risk.

#### 708 / 709 — Caravan parks & marinas

Individually RCD-protected (30mA) socket-outlet per pitch/berth (caravan pitch typically 16A, flexible connecting cable minimum 2.5mm²).

#### 710 — Medical locations (revised by A4)

Higher-risk (“Group 2”) areas such as operating theatres often use an IT system so a first fault doesn’t force immediate disconnection of life-support equipment. Amendment 4 added enhanced supplementary bonding procedures and a schedule for recording bonding-conductor resistance measurements.

#### 712 — Solar PV

DC side needs particular care — DC arcs are harder to extinguish and can’t simply be switched off while the array is illuminated.

#### 722 — EV charging

- PME (TN-C-S) supplies carry open-PEN risk to the vehicle’s exposed metalwork — addressed via open-PEN detection devices, or a TT arrangement at the charge point.  
- EV charging equipment can introduce smooth DC leakage that blinds a standard RCD — addressed with a Type B RCD, or Type A plus a 6mA DC RDC-DD.

#### 711 / 740 — Exhibitions & fairgrounds

Temporary installations: 30mA RCD protection on socket-outlet and public-accessible circuits, equipment positioned out of arm’s reach where relevant.

### 8\. Prosumer's installations & Amendment 4 (2026)

*Part 8 (introduced by A2:2022) covers installations that both consume and generate/store energy. Amendment 4 (2026) builds on it.*

- **Prosumer’s installation** — consumes AND can generate/store/export (PV, battery storage, V2G-capable EV charging).  
- **EEMS** (Electrical Energy Management System) — monitors and controls generation, storage and consumption, potentially including automatic disconnection functions.  
- **PEI** (Power Electronic/converter-based Interface) — e.g. a PV or battery inverter. In “island mode” (disconnected from the DNO), the normal PME earth reference is gone, so a suitable local means of earthing is required.

#### Amendment 4:2026 headline changes

Published **15 April 2026**; the previous edition (BS 7671:2018+A2:2022+A3:2024) is withdrawn roughly six months later.

- **Chapter 57 (new):** Stationary secondary batteries  
    
- **Section 716 (new):** Power over Ethernet  
    
- **Section 545 (revised):** Functional earthing/bonding  
    
- **Section 710 (revised):** Medical locations  
    
- **Chapter 81 (new):** Energy efficiency assessment  
    
- **Chapter 57** — battery energy storage systems: siting, ventilation, fire risk, isolation. Roof-space installation is generally discouraged (detection/containment difficulty).  
    
- **Section 716** — thermal/derating considerations where data cabling carries DC power at meaningful levels (PoE lighting, access points, cameras).  
    
- **Chapter 81** — a framework for assessing energy losses in LV installations, applying to new work and significant alterations.

>   
> Don’t confuse eras: AFDDs and the original Part 8 provisions are **Amendment 2:2022**. Amendment 4:2026 is batteries, PoE, functional earthing, medical locations and energy efficiency.

---

## Practice Questions

152 questions across 13 topic areas. Answers and explanations are in the [Answer Key](#answer-key) — try each topic block without looking ahead.

### Exam Technique

**Q1.** The City & Guilds 2382 18th Edition exam is:

A. Closed book, 40 questions, 1 hour B. Open book, 60 questions, 2 hours C. Open book, 50 questions, 90 minutes D. Closed book, 60 questions, 3 hours

**Q2.** What is the typical minimum pass mark, and the score you should really be aiming for?

A. 40%, aim 50% B. 50%, aim 60% C. 60%, aim 80% D. 75%, aim 90%

**Q3.** Because the exam is open-book, your revision time is best spent:

A. Memorising every table value word for word B. Learning the structure of the book and practising finding the right clause/table quickly C. Ignoring the book entirely D. Reading only Part 1

**Q4.** If a question gives you numerical data, the safest approach is:

A. Guess based on similar past questions B. Work the calculation through methodically using the correct formula and reference C. Pick the middle option D. Skip and never return to it

**Q5.** Which item is essential to bring to the exam alongside ID?

A. A laptop B. The current edition of BS 7671 and a scientific calculator C. A copy of the On-Site Guide only D. Your own printed notes

### Definitions & Terms

**Q6.** "Basic protection" refers to protection against electric shock:

A. Under a single fault condition B. Under normal, fault-free conditions C. Only in special locations D. Only for SELV circuits

**Q7.** What does "Zs" represent?

A. The impedance of the earth electrode only B. The total earth fault loop impedance (external \+ internal) C. The prospective short-circuit current D. The resistance of the line conductor only

**Q8.** PME stands for:

A. Protective Multiple Earthing B. Portable Mains Equipment C. Primary Motor Enclosure D. Permanent Main Earth

**Q9.** In a TT earthing system, the installation's means of earthing is provided by:

A. The supply cable sheath B. A PEN conductor from the DNO C. A local earth electrode D. Bonding to gas and water pipes only

**Q10.** SELV is defined as:

A. A system not exceeding 50V a.c., electrically separated from earth and other systems B. Any circuit protected by an RCD C. A circuit with a functional earth connection D. A 110V site supply

**Q11.** "Prospective fault current" (PFC) is:

A. The current that would flow for a fault of negligible impedance B. The maximum current a cable can carry continuously C. The rated current of the protective device D. The design current of the circuit

**Q12.** A "competent person" under BS 7671 is someone who:

A. Holds a City & Guilds 2382 certificate only B. Has the skill, knowledge and experience to avoid danger to themselves and others C. Is employed by a DNO D. Has more than 10 years' experience regardless of training

**Q13.** The term "exposed-conductive-part" describes:

A. A touchable conductive part, not normally live, that can become live under fault conditions B. Any conductive part of the installation, live or not C. A live conductor with damaged insulation D. The earth electrode

**Q14.** An "extraneous-conductive-part" is:

A. Part of the electrical installation B. A conductive part liable to introduce a potential, not forming part of the electrical installation (e.g. structural steel) C. A protective conductor D. A bonding conductor

**Q15.** What is a "circuit protective conductor" (cpc)?

A. The conductor connecting exposed-conductive-parts to the main earthing terminal B. The line conductor of a final circuit C. A conductor used only for functional earthing D. The neutral conductor

**Q16.** RCBO is an abbreviation for:

A. A device combining overcurrent and residual current protection in one unit B. Ring Circuit Breaker Outlet C. Radial Circuit Bonding Outlet D. Residual Current Bonded Outlet

**Q17.** "Diversity" in an electrical installation refers to:

A. The requirement to use different cable types on every circuit B. The allowance made because not all connected loads run simultaneously at full demand C. A type of earthing arrangement D. The variation in supply voltage

### Assessing Characteristics

**Q18.** Part 3 (Assessment of General Characteristics) requires the designer to consider all of the following EXCEPT:

A. Purpose, supplies and structure of the installation B. External influences (ambient temperature, water, etc.) C. Compatibility of equipment characteristics D. The exact make and model of every light fitting

**Q19.** "External influences", coded AA/AB/AC..., relate to:

A. The financial cost of the installation B. Environmental conditions affecting equipment selection (temperature, altitude, water, impact) C. The supplier's tariff type D. The manufacturer's nationality

**Q20.** Before working on an existing installation, BS 7671 requires assessment of:

A. Only the consumer unit B. Supply/installation characteristics likely to affect the design, including maximum demand, earthing arrangement, and condition of equipment to be reused C. Nothing — Part 3 is new-build only D. The colour of existing cables only

**Q21.** Maximum demand of an installation is assessed:

A. By adding the rated current of every appliance with no allowance B. Taking diversity into account, using recognised guidance C. By reference to postcode D. It is not required under Part 3

**Q22.** Compatibility (Part 3\) requires checking that:

A. All equipment is the same colour B. Equipment characteristics (starting current, harmonics, leakage) won't harmfully affect other equipment or the supply C. Only British-made equipment is used D. All circuits use the same device rating

**Q23.** Which is an example of "AD" (presence of water) external-influence classification?

A. AD4 – splashing B. AC2 – altitude C. AA5 – high temperature D. AB1 – dry

### Shock Protection (411)

**Q24.** For a TN system, the maximum disconnection time for a final circuit ≤32A is:

A. 0.1s B. 0.2s C. 0.4s D. 5s

**Q25.** For a TT system, the maximum disconnection time for a final circuit ≤32A is:

A. 0.2s B. 0.4s C. 1s D. 5s

**Q26.** For distribution circuits (and final circuits \>32A) on a TN system, the maximum disconnection time is:

A. 0.4s B. 1s C. 5s D. No limit applies

**Q27.** Additional protection by a 30mA RCD (411.3.3) is required for socket outlets ≤32A for use by ordinary persons:

A. Only in bathrooms B. In all locations, with only very limited listed exceptions C. Only for outdoor sockets D. Only in commercial premises

**Q28.** In domestic premises, 30mA RCD additional protection is also specifically required for:

A. AC final circuits supplying luminaires (lighting) B. Immersion heaters only C. Cooker circuits only D. Nothing beyond socket outlets

**Q29.** Fault protection (single-fault-condition shock protection) is most commonly achieved by:

A. Double insulation alone B. Automatic Disconnection of Supply (ADS) C. Warning labels on equipment D. SELV only

**Q30.** Electrical separation (413) as a protective measure relies on:

A. A single circuit from an isolating source, live parts not connected to earth or another circuit B. A 30mA RCD C. A TT earth electrode D. PME bonding

**Q31.** SELV and PELV are protective measures classed under:

A. Automatic disconnection of supply B. Extra-low voltage (both basic and fault protection from the low voltage itself) C. Electrical separation D. Obstacles and placing out of reach

**Q32.** The nominal voltage limit for SELV/PELV under normal conditions is:

A. 12V a.c. B. 50V a.c. / 120V ripple-free d.c. C. 110V d.c. D. 230V a.c.

**Q33.** "Obstacles" and "placing out of reach" as protective measures are:

A. Permitted for ordinary persons in all installations B. Only permitted where supervised/controlled by skilled or instructed persons C. Banned entirely under BS 7671 D. Only used in agricultural locations

**Q34.** Basic protection by insulation of live parts requires the insulation to:

A. Be removable with a standard tool for maintenance B. Only be removable by destruction, solvents or heat — not by hand C. Be any colour so long as present D. Only cover conductors above 1mm²

**Q35.** A barrier providing basic protection must give at least a degree of protection of:

A. IPXXB (IP2X), or IPXXD on accessible horizontal top surfaces where required B. IP44 in all cases C. No specific rating is required D. IP65 always

**Q36.** Which is correct about RCDs and TT systems?

A. An RCD is never required on TT if Zs is low enough B. Because Ze is often too high for overcurrent devices alone, an RCD is almost always essential for fault protection C. TT systems cannot use RCDs D. TT systems don't require an earth electrode

**Q37.** To confirm automatic disconnection will occur in time on a TN system, you must check:

A. Only the cable colour B. That Zs does not exceed the tabulated maximum for that device and disconnection time C. The length of cable only D. The consumer unit's diameter

### Fire & Thermal (42)

**Q38.** Arc Fault Detection Devices (AFDDs) are designed to:

A. Detect overload current only B. Detect arc faults that conventional overcurrent/RCD protection may miss, reducing fire risk C. Replace RCDs entirely D. Only function on three-phase circuits

**Q39.** Under Regulation 421.1.7, AFDDs are required as a minimum for certain final circuits ≤32A in premises such as:

A. Detached bungalows only B. HMOs and similarly higher-risk residential premises listed in BS 7671 C. Garages only D. All installations without exception

**Q40.** Where fitted, an AFDD should be installed:

A. At the furthest point of the circuit from the origin B. At the origin of the final circuit it protects C. Only at the main switchboard D. In the socket outlet itself only

**Q41.** Regulation 422 deals with:

A. Precautions for locations with particular risks — fire, explosion, escape routes, high fire load B. Voltage drop only C. Cable colours D. RCD selection

**Q42.** For a luminaire close to combustible material rated over 300W up to 500W, minimum spacing guidance is broadly around:

A. 0.2m B. 0.5m C. 1.0m D. 2.0m

**Q43.** A "significant quantity" of flammable liquid, for fire-risk assessment purposes, is generally taken as:

A. 1 litre B. 10 litres C. 25 litres D. 100 litres

**Q44.** Where a circuit passes through a fire-risk location (e.g. escape route), measures may include:

A. Ignoring the risk if PVC insulated B. Fire-resistant wiring systems, avoiding combustible surfaces, protection against mechanical damage C. Only increasing cable csa D. No special measures are ever needed

**Q45.** Thermal effects requirements (Chapter 42\) primarily protect against:

A. Burns and fire from heat generated by equipment or faults B. Voltage drop C. Electromagnetic interference D. Corrosion of conductors

**Q46.** Fixed equipment likely to reach ignition temperatures should be:

A. Installed with no consideration required B. Positioned/guarded so adjacent materials can't reach a dangerous temperature, or mounted/enclosed to withstand it C. Always mounted directly on timber D. Wrapped in PVC tape

**Q47.** For hand-held equipment, the maximum accessible temperature for non-metallic parts liable to be touched is around:

A. 45°C B. 65°C C. 90°C D. 105°C

### Overcurrent (43)

**Q48.** The basic rule for selecting a protective device against overload (433.1) is:

A. Ib ≤ In ≤ Iz, and I2 ≤ 1.45 Iz B. Ib \= In \= Iz always exactly C. In must always exceed Iz D. Ib has no relationship to Iz

**Q49.** "Ib" represents:

A. The rated current of the protective device B. The design current of the circuit C. The tabulated current-carrying capacity of the cable D. The breaking capacity of the device

**Q50.** "Iz" represents:

A. The design current B. The rated current of the device C. The cable's effective current-carrying capacity in its installed conditions D. The prospective fault current

**Q51.** The adiabatic equation for a conductor's thermal withstand under fault is:

A. S \= √(I²t) / k B. S \= I × t × k C. S \= k / (I × t) D. S \= √(I × t) / k²

**Q52.** Using S=√(I²t)/k, for I=1000A, t=0.4s, k=115, the minimum csa is approximately:

A. 2.75 mm² B. 5.5 mm² C. 8.7 mm² D. 11 mm²

**Q53.** The breaking capacity of a protective device must be:

A. Less than the prospective fault current at that point B. Equal to or greater than the prospective fault current at that point (or backed up per 434.5.1) C. Ignored if an RCD is fitted D. Only relevant for three-phase circuits

**Q54.** A "distribution circuit" (as opposed to a final circuit) is one that:

A. Directly supplies current-using equipment only B. Connects the origin (or a distribution board) to another board/consumer unit supplying final circuits C. Only exists in industrial premises D. Cannot exceed 32A

**Q55.** Overload protection may be omitted (433.3) only where, for example:

A. Consequences of overload are negligible/unlikely, under the specific conditions BS 7671 lists B. Never — overload protection is always mandatory with no exceptions C. The circuit supplies socket outlets D. The customer requests it in writing

**Q56.** Table 43.1 provides:

A. Voltage drop limits B. k-values for the adiabatic equation by conductor/insulation/joint C. Zs values for RCDs D. Cable colour codes

**Q57.** For a tinned soldered joint in copper with 60°C thermosetting insulation, a commonly referenced k-value example is around:

A. 76 B. 94 C. 122 D. 143

### Switching, Isolation & SPDs

**Q58.** Surge Protective Devices (SPDs) protect against:

A. Overload current only B. Transient overvoltages (e.g. lightning, switching events) C. Undervoltage only D. Harmonic distortion only

**Q59.** A risk assessment (or the simplified method) determines:

A. The colour of cables required B. Whether SPDs are required for a given installation C. The size of the consumer unit only D. Whether RCDs are needed

**Q60.** A mechanical maintenance switch (537.3.2.4) must be capable of:

A. Being operated remotely only B. Being secured OFF (locking, or removal of a fuse/link) to prevent unintended reclosure C. Switching under full load only D. Isolating the neutral only

**Q61.** A means of isolation must:

A. Never be needed if an RCD is fitted B. Disconnect all live supply conductors of the relevant part, and be identifiable and accessible C. Only isolate the line conductor D. Only be fitted at the main switchboard

**Q62.** A functional switch (e.g. a light switch) is used to:

A. Provide isolation for maintenance B. Control normal operation without necessarily disconnecting all poles C. Provide overcurrent protection D. Provide fault protection

**Q63.** Emergency switching devices must operate:

A. Slowly, to avoid arcing B. Rapidly, by a single action, to remove danger C. Only after a time delay D. Only when the RCD also trips

**Q64.** A switch used for isolation should be installed so that it:

A. Cannot be inadvertently or accidentally operated by unauthorised persons while isolated B. Automatically resets after 30 minutes C. Only isolates during working hours D. Requires no marking or identification

**Q65.** Firefighter's switches (e.g. for discharge-tube signage) are typically:

A. Coloured red, accessible to the fire service, with an indicator lamp B. Coloured blue with no marking C. Located inside a locked switch room only D. Not required under BS 7671

**Q66.** BS EN 61439-6 relates to:

A. Cable colour identification B. Busbar trunking systems C. RCD test procedures D. Insulation resistance testing

### Cables & Volt Drop (52)

**Q67.** A cable's current-carrying capacity (Iz) is derived from the tabulated value (It) by applying:

A. Rating factors for ambient temperature, grouping, thermal insulation etc. B. Only the length of the cable C. The colour of the cable D. The supply voltage only

**Q68.** A cable in an ambient temperature above the tabulated reference has its capacity:

A. Increased B. Reduced, via an ambient temperature factor (Ca) less than 1 C. Unaffected D. Doubled

**Q69.** A grouping rating factor (Cg) is applied because:

A. Grouped cables mutually heat each other, reducing safe current per cable B. Grouping always increases capacity C. Grouping has no thermal effect D. Only three-phase cables are affected

**Q70.** A cable fully surrounded by thermal insulation has its capacity:

A. Increased, since insulation retains heat usefully B. Significantly reduced — a thermal insulation factor (Ci) less than 1 applies C. Unaffected D. Only relevant for SWA cable

**Q71.** For a 90°C cable at reference ambient 30°C, installed at 40°C, Ca is calculated using:

A. Ca \= (θz−θa)/(θz−θref) B. Ca \= √\[(θz−θa)/(θz−θref)\] C. Ca \= θz/θa D. Ca \= θref−θa

**Q72.** The recommended maximum voltage drop, origin to load point, for a low-voltage public supply, is generally:

A. 3% for lighting, 5% for other uses B. 1% for all circuits C. 10% for all circuits D. 5% for lighting, 3% for other uses

**Q73.** Voltage drop in a cable run is approximately calculated using:

A. mV/A/m × Ib × length(m) / 1000 B. Ib × csa only C. length × csa D. It can only be measured, not calculated

**Q74.** Using mV/A/m=18, Ib=20A, length=15m, the approximate voltage drop is:

A. 1.8V B. 5.4V C. 18V D. 27V

**Q75.** The minimum copper line conductor csa generally quoted for a fixed power circuit is:

A. 1.0 mm² B. 1.5 mm² C. 2.5 mm² D. 4.0 mm²

**Q76.** A cable through a timber joist, outside a permitted safe zone, must (522.6.201) be:

A. At any depth without restriction B. At least 50mm from the top/bottom of the joist, or otherwise protected against damage C. Painted red for visibility D. Run only in steel conduit

**Q77.** A cable in a wall at less than 50mm depth, outside a safe zone, generally requires:

A. No additional protection B. Additional protection, typically 30mA RCD or robust mechanical protection C. A different cable colour D. A minimum csa of 10mm²

**Q78.** Safe zones for cables in walls are generally defined as bands:

A. Within 150mm of a wall/ceiling junction or corner, or running directly to/from an accessory B. Only at the centre of the wall C. At floor level only D. There are no defined safe zones

**Q79.** For a single-phase a.c. installation, the line conductor core colour is:

A. Blue B. Brown C. Green/yellow D. Black

**Q80.** The protective (earth) conductor is identified by:

A. Brown insulation B. Blue insulation C. Green-and-yellow bi-colour combination D. Black insulation

**Q81.** For a DC circuit, the colour identification for the positive conductor (L+) is:

A. Blue B. Grey C. Brown D. Black

### Earthing & Bonding (54)

**Q82.** In a TN-S system, the earth path back to source is provided by:

A. A separate local earth electrode only B. The metallic sheath/armour of the supply cable C. A PEN conductor D. There is no earth path

**Q83.** In a TN-C-S system, within the installation the neutral and protective functions are:

A. Combined throughout B. Combined only on the supply side (PEN); separated into N and cpc within the installation C. Never combined anywhere D. Provided by a local electrode

**Q84.** Main protective bonding connects extraneous-conductive-parts to:

A. The neutral bar directly B. The main earthing terminal C. The nearest socket outlet D. Nothing — it's optional

**Q85.** The minimum copper-equivalent csa for main protective bonding per Table 54.8 is:

A. 2.5 mm² B. 6 mm² C. 10 mm² D. 16 mm²

**Q86.** Supplementary bonding conductors NOT mechanically protected need a minimum csa of:

A. 1.5 mm² B. 2.5 mm² C. 4 mm² D. 6 mm²

**Q87.** Supplementary bonding conductors that ARE mechanically protected need a minimum csa of:

A. 1.0 mm² B. 2.5 mm² C. 4 mm² D. 6 mm²

**Q88.** A warning notice at a bonding connection should read:

A. "Danger – Live Parts" B. "Safety Electrical Connection – Do Not Remove" C. "Earth – Test Point Only" D. "Isolate Before Use"

**Q89.** Zs \= Ze \+ (R1+R2) means:

A. Zs is independent of the circuit's protective conductor resistance B. Total loop impedance \= external impedance \+ line and cpc resistance within the circuit C. R1 and R2 refer to two separate earth electrodes D. Ze is measured after the circuit is wired

**Q90.** Which system relies on the general mass of earth rather than a metallic path back to the source?

A. TN-S B. TN-C-S C. TT D. None — all use a local electrode

**Q91.** A PEN conductor is:

A. A conductor combining protective conductor and neutral functions, used by the DNO in PME systems B. A type of bonding conductor only C. Only used in TT systems D. A conductor used exclusively in SELV circuits

**Q92.** Under an "open PEN" fault on a PME supply, exposed-conductive-parts can become:

A. Completely safe with no risk B. Live at a dangerous voltage relative to true earth C. Automatically disconnected instantly with no further action D. Irrelevant to the design

**Q93.** Which is generally NOT acceptable as the sole means of earthing for a TT installation?

A. A driven earth rod/electrode B. An earth mat or plate electrode C. Reliance on the metallic water service pipe alone D. A properly designed earth electrode system

**Q94.** Bonding of simultaneously-accessible exposed and extraneous parts, beyond main bonding, is called:

A. Main protective bonding B. Supplementary (equipotential) bonding C. Functional earthing D. Isolation

**Q95.** Functional earthing (Section 545, revised by A4) is provided:

A. For electric shock protection only B. For correct equipment operation and EMC, distinct from protective earthing C. Only in agricultural locations D. Instead of protective earthing, replacing it

### Inspection & Testing (Pt 6\)

**Q96.** Initial verification of a new installation comprises:

A. Inspection only B. Testing only C. Inspection followed by testing (dead tests, then live tests) D. A visual check by the customer

**Q97.** Which test is normally carried out FIRST in the dead-test sequence?

A. Earth fault loop impedance B. Continuity of protective conductors (incl. bonding) C. RCD operation D. Insulation resistance

**Q98.** A ring final circuit continuity test (figure-of-eight method) confirms:

A. The RCD operates correctly B. No breaks or crossed connections in the ring, and correct polarity at each outlet C. Voltage drop only D. Earth electrode resistance

**Q99.** Insulation resistance testing on a circuit up to 500V is typically carried out at:

A. 250V, minimum 0.5 MΩ B. 500V DC, minimum 1.0 MΩ C. 1000V, minimum 1.0 MΩ D. 50V, minimum 2.0 MΩ

**Q100.** For SELV/PELV circuits, insulation resistance testing is typically carried out at:

A. 250V DC, minimum 0.5 MΩ B. 500V DC, minimum 1.0 MΩ C. 1000V DC, minimum 2.0 MΩ D. No test is required

**Q101.** Before insulation resistance testing, you should typically:

A. Nothing extra is needed B. Disconnect/isolate voltage-sensitive electronics that could be damaged by the test voltage C. Switch all RCDs to test position D. Remove all fuses only

**Q102.** Polarity verification confirms that:

A. The voltage is correct B. Single-pole devices switch the line conductor, and lampholder centre-pins connect to line not neutral C. The RCD trips within the correct time D. Cable colour matches wall colour

**Q103.** Ze (external earth fault loop impedance) is measured:

A. With main switch closed, main bonding in place, and the earthing conductor temporarily disconnected from the MET B. With the supply completely disconnected C. Only at socket outlets D. It cannot be measured, only calculated

**Q104.** A general-purpose RCD tested at its rated residual current (IΔn) should disconnect within:

A. 40ms B. 300ms C. 1s D. 5s

**Q105.** The same RCD, tested at 5×IΔn, should disconnect within:

A. 40ms B. 150ms C. 300ms D. 500ms

**Q106.** An Electrical Installation Certificate (EIC) is used for:

A. Periodic inspection of an existing installation B. New installation work, or an addition/alteration including a new circuit C. Minor alterations not involving a new circuit D. PAT testing

**Q107.** A Minor Electrical Installation Works Certificate is appropriate for:

A. A brand-new consumer unit installation B. Additions/alterations that do NOT include a new circuit C. A full rewire D. Any periodic inspection

**Q108.** An Electrical Installation Condition Report (EICR) is used to:

A. Certify new installation work B. Report on the condition of an existing installation following periodic inspection C. Replace the need for an EIC on new work D. Certify PAT-tested appliances

**Q109.** Observation code "C1" on an EICR means:

A. Improvement recommended B. Potentially dangerous — urgent remedial action required C. Danger present — immediate remedial action required D. Further investigation required

**Q110.** Observation code "C2" on an EICR means:

A. Danger present — immediate action required B. Potentially dangerous — urgent remedial action required C. Improvement recommended, not presently dangerous D. Compliant, no action needed

**Q111.** Observation code "FI" on an EICR indicates:

A. "Fully Inspected" — a pass code B. Further investigation required without delay C. The installation failed entirely D. The fuse is incorrect

**Q112.** The typical maximum recommended interval before the next EICR for an owner-occupied domestic dwelling is generally:

A. 1 year B. 3 years C. 10 years, or at change of occupancy D. 25 years

**Q113.** Under the Electrical Safety Standards in the Private Rented Sector Regulations, landlords in England must have an EICR at intervals not exceeding:

A. 1 year B. 5 years, or sooner as required C. 10 years D. There is no requirement

### Special Locations (Pt 7\)

**Q114.** In a bathroom (701), Zone 0 is defined as:

A. The area more than 3m from the bath B. The interior of the bath tub or shower basin itself C. The whole bathroom floor D. Only the area under the sink

**Q115.** Zone 1 in a bathroom extends broadly to:

A. Above zone 0 up to 2.25m from the floor, within the bath/shower boundary B. The entire room C. 3m in every direction D. Only above the shower head

**Q116.** The minimum IP rating required for equipment in Zone 0 of a bathroom is:

A. IPX4 B. IPX5 C. IPX7 D. No rating required

**Q117.** Supplementary bonding in a bathroom may be omitted, provided (among other conditions):

A. The room has a window B. All final circuits meet 411.3.2 disconnection times, have 30mA RCD protection, and main bonding is in place C. The homeowner agrees in writing D. It may never be omitted

**Q118.** In a swimming pool location (702), Zone 0 covers:

A. The interior of the pool basin B. The whole pool hall C. A 2m perimeter around the pool D. Only underwater lighting

**Q119.** For a pool with a diving board, Zone 1 typically extends vertically above the board to around:

A. 1.0m B. 1.5m C. 2.5m D. 4.0m

**Q120.** In a sauna (703), Zone 1 is generally the space:

A. More than 2m above the floor B. From floor level up to around 1.0m, near the heater C. Only inside the heater casing D. Outside the sauna cabin

**Q121.** Sauna Zone 3 generally starts:

A. At floor level B. Above around the 1.0m mark C. Only above 3m D. There is no Zone 3 in saunas

**Q122.** Construction sites (704) typically use 110V CTE for portable tools because:

A. It looks different from permanent supplies B. It halves the shock voltage to earth (55V) in harsh, damp conditions C. It is cheaper to install D. BS 7671 does not address construction sites

**Q123.** Agricultural/horticultural premises (705) require additional RCD protection because:

A. Livestock can be more sensitive to shock, and the environment is damp/corrosive B. There is no additional risk C. Animals are unaffected by electricity D. Section 705 only applies to arable farms

**Q124.** A caravan pitch electrical supply (708) is typically provided via:

A. A hardwired connection with no plug B. A weatherproof socket-outlet per pitch (commonly 16A), individually RCD-protected C. A 13A domestic socket with no RCD D. A shared, unprotected supply

**Q125.** The flexible cable connecting a caravan to its pitch supply should have a minimum csa of around:

A. 1.0 mm² B. 1.5 mm² C. 2.5 mm² D. 4.0 mm²

**Q126.** Marina (709) socket-outlets supplying pontoons/berths should be:

A. Standard sockets with no special consideration B. Individually 30mA RCD-protected, suitably rated for the marine environment C. Fed from a single shared unprotected circuit D. Prohibited under BS 7671

**Q127.** Medical locations (710) often use an IT system in higher-risk 'Group 2' areas primarily because:

A. It is cheaper B. A first fault doesn't force immediate disconnection, so life-support equipment can keep running C. It removes the need for any earthing D. IT systems are mandatory in all medical rooms

**Q128.** Amendment 4 revised Section 710 (medical locations) primarily around:

A. Removing the requirement for supplementary bonding entirely B. Enhanced supplementary bonding procedures and a schedule for recording resistance measurements C. Banning IT systems in hospitals D. Reducing disconnection times to zero

**Q129.** Solar PV (712) DC-side installations need particular care because:

A. DC arcs can be harder to extinguish, and can't be switched off at will while illuminated B. DC has no associated shock risk C. PV systems never produce DC D. There is no specific PV guidance in BS 7671

**Q130.** For EV charging (722) on a PME supply, a key safety concern is:

A. Voltage drop only B. Open-PEN fault risk making vehicle metalwork dangerously live — addressed by open-PEN detection or a TT arrangement C. Cable colour D. PME supplies need no special measures for EV charging

**Q131.** RCD protection for an EV charge point commonly addresses smooth DC leakage by using:

A. A Type AC RCD only B. A Type B RCD, or Type A plus a 6mA DC RDC-DD C. No RCD at all D. A time-delayed (S-type) RCD only

**Q132.** Temporary installations at exhibitions/fairgrounds require:

A. No RCD protection because they're temporary B. 30mA RCD protection on socket-outlet/public-accessible circuits, equipment out of arm's reach where relevant C. Only three-phase supplies D. Permanent wiring methods only

**Q133.** Restrictive conductive locations (706), e.g. inside a metal tank, impose extra precautions mainly because:

A. Body resistance is effectively reduced by extensive contact with earthed metal, raising shock risk B. There is no additional risk in confined metal spaces C. It only relates to gas installations D. The location is always outdoors

### Prosumer & Amendment 4

**Q134.** A prosumer's low-voltage installation (Part 8\) is one that:

A. Only consumes electricity B. Both consumes AND can generate/store/potentially export electricity C. Has no connection to the public supply D. Is only found in industrial premises

**Q135.** An EEMS (Electrical Energy Management System) is used to:

A. Physically rewire an installation B. Monitor and control generation, storage and consumption, potentially including automatic disconnection C. Replace the main switch D. Only measure voltage drop

**Q136.** A PEI (Power Electronic Interface, e.g. a PV/battery inverter) needs a suitable means of earthing in island mode because:

A. Island mode never occurs B. When disconnected from the DNO, the normal PME earth reference is unavailable, so an alternative is needed C. Earthing is never required for inverters D. It only applies to three-phase inverters

**Q137.** Amendment 4 introduced a completely new Chapter 57 covering:

A. Voltage drop B. Stationary secondary batteries (BESS) — siting, ventilation, fire risk, isolation C. Cable colours D. SELV circuits

**Q138.** Amendment 4 introduced a new Section 716, addressing:

A. Swimming pools B. Power over Ethernet — thermal/derating where data cables carry DC power C. Agricultural premises D. Fire alarm systems

**Q139.** Amendment 4 introduced a new Chapter 81 covering:

A. An energy-efficiency assessment framework for LV installations B. Emergency lighting only C. Lightning protection D. Data cabling standards

**Q140.** BS 7671 Amendment 4:2026 was published on:

A. 1 January 2026 B. 15 April 2026 C. 1 July 2026 D. 31 December 2026

**Q141.** Chapter 57 guidance generally advises stationary secondary batteries should NOT be sited:

A. In a garage B. In roof spaces, due to detection, ventilation and fire-containment challenges C. On an external wall D. In a purpose-designed enclosure

**Q142.** Which of these originates from Amendment 2:2022 rather than Amendment 4:2026?

A. Chapter 57 (batteries) B. Section 716 (PoE) C. AFDD requirements (421.1.7) and the original Part 8 prosumer provisions D. Chapter 81 (energy efficiency)

### Calculations

**Q143.** A circuit has Ze=0.35Ω, R1=0.10Ω, R2=0.16Ω. What is Zs?

A. 0.35Ω B. 0.51Ω C. 0.61Ω D. 0.26Ω

**Q144.** A device has In=20A. After all rating factors, Iz=18.5A, and Ib=17A. Is Ib≤In≤Iz satisfied?

A. Yes — 17≤20≤18.5 is satisfied B. No — In (20A) exceeds Iz (18.5A) C. It's irrelevant, only Ib matters D. Yes, because Ib is less than In

**Q145.** A cable has It=27A. Applying Cg=0.8 and Ca=0.94, what is Iz?

A. 20.3A B. 22.7A C. 25.4A D. 27.0A

**Q146.** Adiabatic check: I=800A, t=0.2s, k=143. Minimum csa required?

A. 1.9 mm² B. 2.5 mm² C. 3.6 mm² D. 5.0 mm²

**Q147.** A 25m run carries 15A design current, with a tabulated 11 mV/A/m. What's the voltage drop, and does it meet a 5% (11.5V) limit on 230V?

A. 4.1V — complies B. 4.1V — does not comply C. 41V — does not comply D. 16.5V — does not comply

**Q148.** Measured R1+R2=0.42Ω, Ze=0.30Ω. What is the calculated Zs?

A. 0.12Ω B. 0.42Ω C. 0.72Ω D. 0.30Ω

**Q149.** A ring's line conductor end-to-end resistance (r1) measures 0.8Ω, with r1=rn=r2. What would you expect the line-cpc reading at the ring's midpoint socket to be roughly?

A. Approximately 0.2Ω, per the standard cross-connection ring test method B. Exactly 0.8Ω C. Exactly 1.6Ω D. 0Ω

**Q150.** For a three-phase balanced load, the design current Ib used to select a device is:

A. Checked per line conductor, based on the current that conductor actually carries B. Only the total three-phase power, never per-line current C. Irrelevant — three-phase never needs overcurrent protection D. Irrelevant to voltage drop

**Q151.** A calculation gives a required csa of 4.3mm². The size you must select is:

A. 4.0mm² (round down, close enough) B. 6.0mm² (round up to the next standard size at or above the minimum) C. Either is acceptable D. 2.5mm²

**Q152.** Two RCDs in series (100mA time-delayed main, 30mA instantaneous final circuit) achieve discrimination, meaning:

A. Both will always trip simultaneously B. Under a final-circuit fault, only the 30mA device should operate, leaving the rest energised C. Discrimination isn't possible with RCDs D. The 100mA device is redundant

---

## Answer Key

| \# | Answer | Explanation |
| :---- | :---- | :---- |
| 1 | **B** — Open book, 60 questions, 2 hours | It's open book — your copy of BS 7671 plus a calculator — 60 questions, 2 hours. |
| 2 | **C** — 60%, aim 80% | Pass marks can vary slightly by cohort — treat 60% as the floor and aim well above it. |
| 3 | **B** — Learning the structure of the book and practising finding the right clause/table quickly | The real skill tested is fast, accurate navigation and application — not rote recall. |
| 4 | **B** — Work the calculation through methodically using the correct formula and reference |  |
| 5 | **B** — The current edition of BS 7671 and a scientific calculator | Check your exam centre's exact permitted-materials list beforehand — some restrict which additional guides are allowed. |
| 6 | **B** — Under normal, fault-free conditions | Fault protection is the single-fault-condition case (ADS, earthing, bonding). |
| 7 | **B** — The total earth fault loop impedance (external \+ internal) | Zs \= Ze \+ (R1 \+ R2). |
| 8 | **A** — Protective Multiple Earthing | PME describes a TN-C-S supply where the combined PEN conductor is earthed at multiple points by the DNO. |
| 9 | **C** — A local earth electrode |  |
| 10 | **A** — A system not exceeding 50V a.c., electrically separated from earth and other systems |  |
| 11 | **A** — The current that would flow for a fault of negligible impedance |  |
| 12 | **B** — Has the skill, knowledge and experience to avoid danger to themselves and others |  |
| 13 | **A** — A touchable conductive part, not normally live, that can become live under fault conditions |  |
| 14 | **B** — A conductive part liable to introduce a potential, not forming part of the electrical installation (e.g. structural steel) |  |
| 15 | **A** — The conductor connecting exposed-conductive-parts to the main earthing terminal |  |
| 16 | **A** — A device combining overcurrent and residual current protection in one unit |  |
| 17 | **B** — The allowance made because not all connected loads run simultaneously at full demand |  |
| 18 | **D** — The exact make and model of every light fitting |  |
| 19 | **B** — Environmental conditions affecting equipment selection (temperature, altitude, water, impact) |  |
| 20 | **B** — Supply/installation characteristics likely to affect the design, including maximum demand, earthing arrangement, and condition of equipment to be reused |  |
| 21 | **B** — Taking diversity into account, using recognised guidance |  |
| 22 | **B** — Equipment characteristics (starting current, harmonics, leakage) won't harmfully affect other equipment or the supply |  |
| 23 | **A** — AD4 – splashing |  |
| 24 | **C** — 0.4s |  |
| 25 | **A** — 0.2s |  |
| 26 | **C** — 5s |  |
| 27 | **B** — In all locations, with only very limited listed exceptions |  |
| 28 | **A** — AC final circuits supplying luminaires (lighting) | Regulation 411.3.4 extended the requirement to domestic lighting circuits. |
| 29 | **B** — Automatic Disconnection of Supply (ADS) |  |
| 30 | **A** — A single circuit from an isolating source, live parts not connected to earth or another circuit |  |
| 31 | **B** — Extra-low voltage (both basic and fault protection from the low voltage itself) |  |
| 32 | **B** — 50V a.c. / 120V ripple-free d.c. |  |
| 33 | **B** — Only permitted where supervised/controlled by skilled or instructed persons |  |
| 34 | **B** — Only be removable by destruction, solvents or heat — not by hand |  |
| 35 | **A** — IPXXB (IP2X), or IPXXD on accessible horizontal top surfaces where required |  |
| 36 | **B** — Because Ze is often too high for overcurrent devices alone, an RCD is almost always essential for fault protection |  |
| 37 | **B** — That Zs does not exceed the tabulated maximum for that device and disconnection time |  |
| 38 | **B** — Detect arc faults that conventional overcurrent/RCD protection may miss, reducing fire risk |  |
| 39 | **B** — HMOs and similarly higher-risk residential premises listed in BS 7671 |  |
| 40 | **B** — At the origin of the final circuit it protects |  |
| 41 | **A** — Precautions for locations with particular risks — fire, explosion, escape routes, high fire load |  |
| 42 | **C** — 1.0m | Illustrative bands: ≤100W≈0.5m, \>100–300W≈0.8m, \>300–500W≈1.0m — confirm current figures. |
| 43 | **C** — 25 litres |  |
| 44 | **B** — Fire-resistant wiring systems, avoiding combustible surfaces, protection against mechanical damage |  |
| 45 | **A** — Burns and fire from heat generated by equipment or faults |  |
| 46 | **B** — Positioned/guarded so adjacent materials can't reach a dangerous temperature, or mounted/enclosed to withstand it |  |
| 47 | **B** — 65°C |  |
| 48 | **A** — Ib ≤ In ≤ Iz, and I2 ≤ 1.45 Iz |  |
| 49 | **B** — The design current of the circuit |  |
| 50 | **C** — The cable's effective current-carrying capacity in its installed conditions |  |
| 51 | **A** — S \= √(I²t) / k |  |
| 52 | **B** — 5.5 mm² | √(1000²×0.4)=632.5; 632.5/115≈5.5mm². |
| 53 | **B** — Equal to or greater than the prospective fault current at that point (or backed up per 434.5.1) |  |
| 54 | **B** — Connects the origin (or a distribution board) to another board/consumer unit supplying final circuits |  |
| 55 | **A** — Consequences of overload are negligible/unlikely, under the specific conditions BS 7671 lists |  |
| 56 | **B** — k-values for the adiabatic equation by conductor/insulation/joint |  |
| 57 | **C** — 122 | Exact k-values depend on the specific combination — confirm against the current Table 43.1. |
| 58 | **B** — Transient overvoltages (e.g. lightning, switching events) |  |
| 59 | **B** — Whether SPDs are required for a given installation |  |
| 60 | **B** — Being secured OFF (locking, or removal of a fuse/link) to prevent unintended reclosure |  |
| 61 | **B** — Disconnect all live supply conductors of the relevant part, and be identifiable and accessible |  |
| 62 | **B** — Control normal operation without necessarily disconnecting all poles |  |
| 63 | **B** — Rapidly, by a single action, to remove danger |  |
| 64 | **A** — Cannot be inadvertently or accidentally operated by unauthorised persons while isolated |  |
| 65 | **A** — Coloured red, accessible to the fire service, with an indicator lamp |  |
| 66 | **B** — Busbar trunking systems |  |
| 67 | **A** — Rating factors for ambient temperature, grouping, thermal insulation etc. |  |
| 68 | **B** — Reduced, via an ambient temperature factor (Ca) less than 1 |  |
| 69 | **A** — Grouped cables mutually heat each other, reducing safe current per cable |  |
| 70 | **B** — Significantly reduced — a thermal insulation factor (Ci) less than 1 applies |  |
| 71 | **B** — Ca \= √\[(θz−θa)/(θz−θref)\] | Here: √\[(90−40)/(90−30)\] \= √(50/60) ≈ 0.91. |
| 72 | **A** — 3% for lighting, 5% for other uses |  |
| 73 | **A** — mV/A/m × Ib × length(m) / 1000 |  |
| 74 | **B** — 5.4V | (18×20×15)/1000 \= 5.4V. |
| 75 | **C** — 2.5 mm² | 1.5mm² is typical for lighting; 2.5mm² is the common general minimum for power — always check the specific circuit and exceptions. |
| 76 | **B** — At least 50mm from the top/bottom of the joist, or otherwise protected against damage |  |
| 77 | **B** — Additional protection, typically 30mA RCD or robust mechanical protection |  |
| 78 | **A** — Within 150mm of a wall/ceiling junction or corner, or running directly to/from an accessory |  |
| 79 | **B** — Brown |  |
| 80 | **C** — Green-and-yellow bi-colour combination |  |
| 81 | **C** — Brown | DC positive is Brown; DC negative is Grey. |
| 82 | **B** — The metallic sheath/armour of the supply cable |  |
| 83 | **B** — Combined only on the supply side (PEN); separated into N and cpc within the installation |  |
| 84 | **B** — The main earthing terminal |  |
| 85 | **B** — 6 mm² | 6mm² is the BS 7671 table minimum, though DNOs often specify 10mm² in practice on PME supplies. |
| 86 | **C** — 4 mm² |  |
| 87 | **B** — 2.5 mm² |  |
| 88 | **B** — "Safety Electrical Connection – Do Not Remove" |  |
| 89 | **B** — Total loop impedance \= external impedance \+ line and cpc resistance within the circuit |  |
| 90 | **C** — TT |  |
| 91 | **A** — A conductor combining protective conductor and neutral functions, used by the DNO in PME systems |  |
| 92 | **B** — Live at a dangerous voltage relative to true earth |  |
| 93 | **C** — Reliance on the metallic water service pipe alone |  |
| 94 | **B** — Supplementary (equipotential) bonding |  |
| 95 | **B** — For correct equipment operation and EMC, distinct from protective earthing |  |
| 96 | **C** — Inspection followed by testing (dead tests, then live tests) |  |
| 97 | **B** — Continuity of protective conductors (incl. bonding) |  |
| 98 | **B** — No breaks or crossed connections in the ring, and correct polarity at each outlet |  |
| 99 | **B** — 500V DC, minimum 1.0 MΩ |  |
| 100 | **A** — 250V DC, minimum 0.5 MΩ |  |
| 101 | **B** — Disconnect/isolate voltage-sensitive electronics that could be damaged by the test voltage |  |
| 102 | **B** — Single-pole devices switch the line conductor, and lampholder centre-pins connect to line not neutral |  |
| 103 | **A** — With main switch closed, main bonding in place, and the earthing conductor temporarily disconnected from the MET |  |
| 104 | **B** — 300ms |  |
| 105 | **A** — 40ms |  |
| 106 | **B** — New installation work, or an addition/alteration including a new circuit |  |
| 107 | **B** — Additions/alterations that do NOT include a new circuit |  |
| 108 | **B** — Report on the condition of an existing installation following periodic inspection |  |
| 109 | **C** — Danger present — immediate remedial action required |  |
| 110 | **B** — Potentially dangerous — urgent remedial action required |  |
| 111 | **B** — Further investigation required without delay |  |
| 112 | **C** — 10 years, or at change of occupancy |  |
| 113 | **B** — 5 years, or sooner as required |  |
| 114 | **B** — The interior of the bath tub or shower basin itself |  |
| 115 | **A** — Above zone 0 up to 2.25m from the floor, within the bath/shower boundary |  |
| 116 | **C** — IPX7 |  |
| 117 | **B** — All final circuits meet 411.3.2 disconnection times, have 30mA RCD protection, and main bonding is in place |  |
| 118 | **A** — The interior of the pool basin |  |
| 119 | **C** — 2.5m |  |
| 120 | **B** — From floor level up to around 1.0m, near the heater |  |
| 121 | **B** — Above around the 1.0m mark |  |
| 122 | **B** — It halves the shock voltage to earth (55V) in harsh, damp conditions |  |
| 123 | **A** — Livestock can be more sensitive to shock, and the environment is damp/corrosive |  |
| 124 | **B** — A weatherproof socket-outlet per pitch (commonly 16A), individually RCD-protected |  |
| 125 | **C** — 2.5 mm² |  |
| 126 | **B** — Individually 30mA RCD-protected, suitably rated for the marine environment |  |
| 127 | **B** — A first fault doesn't force immediate disconnection, so life-support equipment can keep running |  |
| 128 | **B** — Enhanced supplementary bonding procedures and a schedule for recording resistance measurements |  |
| 129 | **A** — DC arcs can be harder to extinguish, and can't be switched off at will while illuminated |  |
| 130 | **B** — Open-PEN fault risk making vehicle metalwork dangerously live — addressed by open-PEN detection or a TT arrangement |  |
| 131 | **B** — A Type B RCD, or Type A plus a 6mA DC RDC-DD |  |
| 132 | **B** — 30mA RCD protection on socket-outlet/public-accessible circuits, equipment out of arm's reach where relevant |  |
| 133 | **A** — Body resistance is effectively reduced by extensive contact with earthed metal, raising shock risk |  |
| 134 | **B** — Both consumes AND can generate/store/potentially export electricity |  |
| 135 | **B** — Monitor and control generation, storage and consumption, potentially including automatic disconnection |  |
| 136 | **B** — When disconnected from the DNO, the normal PME earth reference is unavailable, so an alternative is needed |  |
| 137 | **B** — Stationary secondary batteries (BESS) — siting, ventilation, fire risk, isolation |  |
| 138 | **B** — Power over Ethernet — thermal/derating where data cables carry DC power |  |
| 139 | **A** — An energy-efficiency assessment framework for LV installations |  |
| 140 | **B** — 15 April 2026 |  |
| 141 | **B** — In roof spaces, due to detection, ventilation and fire-containment challenges |  |
| 142 | **C** — AFDD requirements (421.1.7) and the original Part 8 prosumer provisions |  |
| 143 | **C** — 0.61Ω | Zs \= 0.35 \+ (0.10+0.16) \= 0.61Ω. |
| 144 | **B** — No — In (20A) exceeds Iz (18.5A) | In must not exceed Iz — here 20A\>18.5A, so a larger cable or smaller device is needed. |
| 145 | **A** — 20.3A | 27×0.94×0.8 \= 20.3A. |
| 146 | **B** — 2.5 mm² | √(800²×0.2)=√128000≈357.8; 357.8/143≈2.5mm². |
| 147 | **A** — 4.1V — complies | (11×15×25)/1000=4.125V, below the 11.5V limit. |
| 148 | **C** — 0.72Ω | Zs \= 0.30+0.42 \= 0.72Ω. |
| 149 | **A** — Approximately 0.2Ω, per the standard cross-connection ring test method | The standard ring test should give a broadly consistent reading around a quarter of (r1+r2) at the midpoint, confirming no break. |
| 150 | **A** — Checked per line conductor, based on the current that conductor actually carries |  |
| 151 | **B** — 6.0mm² (round up to the next standard size at or above the minimum) | The selected csa must never be below the calculated minimum. |
| 152 | **B** — Under a final-circuit fault, only the 30mA device should operate, leaving the rest energised |  |

