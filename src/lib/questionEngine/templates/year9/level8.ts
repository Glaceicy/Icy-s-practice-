import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 8 — "Circles, surface area and volume"
const ROUND_THINGS = ["a pizza slice", "a fan blade", "a clock hand sweep", "a radar screen", "a garden sprinkler", "a protractor", "a cheese wedge", "a windscreen wiper"];
const ROUND_THINGS_FR = ["une part de pizza", "une pale de ventilateur", "le balayage d'une aiguille d'horloge", "un écran radar", "un arroseur de jardin", "un rapporteur", "une part de fromage", "un essuie-glace"];
const SOLIDS = ["a water butt", "a soup tin", "a candle", "a storage drum", "a paint pot", "a rainwater pipe"];
const SOLIDS_FR = ["un récupérateur d'eau", "une boîte de soupe", "une bougie", "un bidon de stockage", "un pot de peinture", "une gouttière"];
const oneDp = (n: number) => n.toFixed(1);

export const level: QuestionTemplateDef[] = [
  // --- Y9-L8-1: arc lengths, sector angles and sector areas ---
  arithmeticTemplate({
    key: "y9l8.arcLength", levelKey: "Y9L8", objectiveCode: "Y9-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SECTOR_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[2, 30], [20, 340]], compute: (v) => (2 * Math.PI * v[0]! * v[1]!) / 360, formatValue: oneDp,
    derive: (v) => ({ rad: v[0]!, ang: v[1]! }),
    promptTemplates: [
      "A sector has radius {rad} cm and angle {ang}°. How long is its arc, in cm to 1 decimal place?",
      "{ctx} sweeps through {ang}° at a radius of {rad} cm. How far does its tip travel, in cm to 1 decimal place?"
    ],
    explain: (v, r) => [`Arc = 2πr x (angle ÷ 360).`, `2 x π x ${v[0]} x (${v[1]} ÷ 360) = ${r} cm.`],
    hints: () => ["Find the whole circumference first, then take the fraction of it that the angle represents."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un secteur a un rayon de {rad} cm et un angle de {ang}°. Quelle est la longueur de son arc, en cm au dixième près ?",
        "{ctx} balaie {ang}° à un rayon de {rad} cm. Quelle distance parcourt son extrémité, en cm au dixième près ?"
      ],
      explain: (v, r) => [`Arc = 2πr x (angle ÷ 360).`, `2 x π x ${v[0]} x (${v[1]} ÷ 360) = ${r} cm.`],
      hints: () => ["Calcule d'abord la circonférence entière, puis prends la fraction correspondant à l'angle."]
    },
    declaredVariationSpace: 29 * 321
  }),
  arithmeticTemplate({
    key: "y9l8.sectorArea", levelKey: "Y9L8", objectiveCode: "Y9-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SECTOR_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[2, 25], [20, 340]], compute: (v) => (Math.PI * v[0]! * v[0]! * v[1]!) / 360, formatValue: oneDp,
    derive: (v) => ({ rad: v[0]!, ang: v[1]! }),
    promptTemplates: [
      "A sector has radius {rad} cm and angle {ang}°. What is its area, in cm² to 1 decimal place?",
      "{ctx} covers a sector of radius {rad} m and angle {ang}°. What area does it cover, in m² to 1 decimal place?"
    ],
    explain: (v, r) => [`Sector area = πr² x (angle ÷ 360).`, `π x ${v[0]}² x (${v[1]} ÷ 360) = ${r} cm².`],
    hints: () => ["Work out the whole circle's area, then take the angle's share of it."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un secteur a un rayon de {rad} cm et un angle de {ang}°. Quelle est son aire, en cm² au dixième près ?",
        "{ctx} couvre un secteur de rayon {rad} m et d'angle {ang}°. Quelle aire couvre-t-il, en m² au dixième près ?"
      ],
      explain: (v, r) => [`Aire d'un secteur = πr² x (angle ÷ 360).`, `π x ${v[0]}² x (${v[1]} ÷ 360) = ${r} cm².`],
      hints: () => ["Calcule l'aire du cercle entier, puis prends la part correspondant à l'angle."]
    },
    declaredVariationSpace: 24 * 321
  }),
  arithmeticTemplate({
    key: "y9l8.sectorAngleAsPercentage", levelKey: "Y9L8", objectiveCode: "Y9-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["SECTOR_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 350]], compute: (v) => (v[0]! * 100) / 360, formatValue: oneDp,
    derive: (v) => ({ ang: v[0]! }),
    promptTemplates: [
      "A sector has an angle of {ang}°. What percentage of the whole circle is it, to 1 decimal place?",
      "What percentage of a full turn is {ang}°? Give your answer to 1 decimal place.",
      "A pie chart slice has an angle of {ang}°. What percentage of the data does it represent, to 1 decimal place?"
    ],
    explain: (v, r) => [`A full circle is 360°.`, `${v[0]} ÷ 360 x 100 = ${r}%.`],
    hints: () => ["Divide the angle by 360, then multiply by 100."],
    fr: {
      promptTemplates: [
        "Un secteur a un angle de {ang}°. Quel pourcentage du cercle entier représente-t-il, au dixième près ?",
        "Quel pourcentage d'un tour complet représente {ang}° ? Donne ta réponse au dixième près.",
        "Une part de diagramme circulaire a un angle de {ang}°. Quel pourcentage des données représente-t-elle, au dixième près ?"
      ],
      explain: (v, r) => [`Un cercle complet fait 360°.`, `${v[0]} ÷ 360 x 100 = ${r} %.`],
      hints: () => ["Divise l'angle par 360, puis multiplie par 100."]
    },
    declaredVariationSpace: 341 * 3
  }),
  arithmeticTemplate({
    key: "y9l8.semicirclePerimeter", levelKey: "Y9L8", objectiveCode: "Y9-L8-1", difficulty: "REASONING",
    misconceptionTags: ["PERIMETER_AREA_CONFUSION"], type: "MULTI_STEP", contextPool: ROUND_THINGS,
    ranges: [[2, 40]], compute: (v) => Math.PI * v[0]! + 2 * v[0]!, formatValue: oneDp,
    derive: (v) => ({ rad: v[0]!, dia: 2 * v[0]! }),
    promptTemplates: [
      "A semicircle has radius {rad} cm. What is its full perimeter, in cm to 1 decimal place?",
      "A half-circle window has a radius of {rad} cm. How much edging strip goes right around it, in cm to 1 decimal place?",
      "{ctx} traces a semicircle of radius {rad} cm. What is the perimeter of that semicircle, in cm to 1 decimal place?"
    ],
    explain: (v, r) => [`The curved edge is half the circumference: π x ${v[0]}.`, `Add the straight diameter of ${2 * v[0]!} cm to get ${r} cm.`],
    hints: () => ["Half the circumference is only part of it — do not forget the straight diameter across the bottom."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un demi-cercle a un rayon de {rad} cm. Quel est son périmètre complet, en cm au dixième près ?",
        "Une fenêtre en demi-cercle a un rayon de {rad} cm. Quelle longueur de bordure en fait tout le tour, en cm au dixième près ?",
        "{ctx} décrit un demi-cercle de rayon {rad} cm. Quel est le périmètre de ce demi-cercle, en cm au dixième près ?"
      ],
      explain: (v, r) => [`Le bord courbe est la moitié de la circonférence : π x ${v[0]}.`, `Ajoute le diamètre droit de ${2 * v[0]!} cm pour obtenir ${r} cm.`],
      hints: () => ["La moitié de la circonférence n'est qu'une partie — n'oublie pas le diamètre droit en bas."]
    },
    declaredVariationSpace: 39 * 3 * (1 + ROUND_THINGS.length)
  }),
  categoricalPoolTemplate({
    key: "y9l8.mcSectorFormula", levelKey: "Y9L8", objectiveCode: "Y9-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SECTOR_FORMULA_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { want: ["the arc length", "the sector area", "the full circumference", "the full circle area"] },
    build: (picked, rng) => {
      const r = rng.int(2, 25);
      const ang = rng.int(20, 340);
      const formulas: Record<string, string> = {
        "the arc length": `2 x π x ${r} x (${ang} ÷ 360)`,
        "the sector area": `π x ${r}² x (${ang} ÷ 360)`,
        "the full circumference": `2 x π x ${r}`,
        "the full circle area": `π x ${r}²`
      };
      const want = picked.want!;
      return {
        prompt: `A sector has radius ${r} cm and angle ${ang}°. Which calculation gives ${want}?`,
        correctLabel: formulas[want]!,
        distractorLabels: Object.values(formulas).filter((f) => f !== formulas[want]).slice(0, 3),
        explanationSteps: [`For ${want} you need ${formulas[want]}.`],
        hints: ["An area formula squares the radius; an arc or circumference formula doubles it. The fraction of 360 only appears for a sector."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const wantFr: Record<string, string> = {
          "the arc length": "la longueur de l'arc",
          "the sector area": "l'aire du secteur",
          "the full circumference": "la circonférence entière",
          "the full circle area": "l'aire du cercle entier"
        };
        const m = drawn.prompt.match(/^A sector has radius (\d+) cm and angle (\d+)°\./);
        if (!m) return {};
        return {
          prompt: `Un secteur a un rayon de ${m[1]} cm et un angle de ${m[2]}°. Quel calcul donne ${wantFr[picked.want!]} ?`,
          explanationSteps: [`Pour ${wantFr[picked.want!]}, il faut ${drawn.correctLabel}.`],
          hints: ["Une formule d'aire élève le rayon au carré ; une formule d'arc ou de circonférence le double. La fraction de 360 n'apparaît que pour un secteur."]
        };
      }
    },
    declaredVariationSpace: 4 * 24 * 321
  }),

  // --- Y9-L8-2: surface area and volume of cylinders and prisms ---
  arithmeticTemplate({
    key: "y9l8.cylinderVolumeInTermsOfPi", levelKey: "Y9L8", objectiveCode: "Y9-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "NUMBER_ENTRY", contextPool: SOLIDS,
    ranges: [[1, 15], [1, 20]], compute: (v) => v[0]! * v[0]! * v[1]!,
    promptTemplates: [
      "A cylinder has radius {a} cm and height {b} cm. Its volume is ___π cm³. What number is missing?",
      "{ctx} is a cylinder of radius {a} cm and height {b} cm. Give its volume as a multiple of π: ___π cm³."
    ],
    explain: (v, r) => [`V = πr²h = π x ${v[0]}² x ${v[1]} = ${r}π cm³.`],
    hints: () => ["A cylinder is a prism with a circular cross-section, so volume is the circle's area times the height."],
    fr: {
      contextPool: SOLIDS_FR,
      promptTemplates: [
        "Un cylindre a un rayon de {a} cm et une hauteur de {b} cm. Son volume est ___π cm³. Quel nombre manque ?",
        "{ctx} est un cylindre de rayon {a} cm et de hauteur {b} cm. Donne son volume comme un multiple de π : ___π cm³."
      ],
      explain: (v, r) => [`V = πr²h = π x ${v[0]}² x ${v[1]} = ${r}π cm³.`],
      hints: () => ["Un cylindre est un prisme à section circulaire : le volume est l'aire du cercle multipliée par la hauteur."]
    },
    declaredVariationSpace: 15 * 20 * (1 + SOLIDS.length)
  }),
  arithmeticTemplate({
    key: "y9l8.cylinderSurfaceAreaInTermsOfPi", levelKey: "Y9L8", objectiveCode: "Y9-L8-2", difficulty: "REASONING",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "MULTI_STEP",
    ranges: [[1, 15], [1, 20]], compute: (v) => 2 * v[0]! * v[0]! + 2 * v[0]! * v[1]!,
    promptTemplates: [
      "A closed cylinder has radius {a} cm and height {b} cm. Its total surface area is ___π cm². What number is missing?",
      "Using A = 2πr² + 2πrh, give the surface area of a closed cylinder of radius {a} cm and height {b} cm in the form ___π cm²."
    ],
    explain: (v, r) => [
      `The two circular ends give 2 x π x ${v[0]}² = ${2 * v[0]! * v[0]!}π.`,
      `The curved surface gives 2 x π x ${v[0]} x ${v[1]} = ${2 * v[0]! * v[1]!}π.`,
      `Together that is ${r}π cm².`
    ],
    hints: () => ["Think of the net: two circles plus one rectangle whose width is the circumference."],
    fr: {
      promptTemplates: [
        "Un cylindre fermé a un rayon de {a} cm et une hauteur de {b} cm. Son aire totale est ___π cm². Quel nombre manque ?",
        "En utilisant A = 2πr² + 2πrh, donne l'aire d'un cylindre fermé de rayon {a} cm et de hauteur {b} cm sous la forme ___π cm²."
      ],
      explain: (v, r) => [
        `Les deux disques donnent 2 x π x ${v[0]}² = ${2 * v[0]! * v[0]!}π.`,
        `La surface latérale donne 2 x π x ${v[0]} x ${v[1]} = ${2 * v[0]! * v[1]!}π.`,
        `Au total, cela fait ${r}π cm².`
      ],
      hints: () => ["Pense au patron : deux disques plus un rectangle dont la largeur est la circonférence."]
    },
    declaredVariationSpace: 15 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y9l8.cylinderVolumeRounded", levelKey: "Y9L8", objectiveCode: "Y9-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "NUMBER_ENTRY", contextPool: SOLIDS,
    ranges: [[1, 20], [1, 25]], compute: (v) => Math.PI * v[0]! * v[0]! * v[1]!, formatValue: oneDp,
    derive: (v) => ({ rad: v[0]!, hei: v[1]! }),
    promptTemplates: [
      "A cylinder has radius {rad} cm and height {hei} cm. What is its volume, in cm³ to 1 decimal place?",
      "{ctx} is a cylinder of radius {rad} cm and height {hei} cm. How much does it hold, in cm³ to 1 decimal place?"
    ],
    explain: (v, r) => [`V = πr²h = π x ${v[0]}² x ${v[1]} = π x ${v[0]! * v[0]! * v[1]!}.`, `That is ${r} cm³.`],
    hints: () => ["Square the radius, multiply by the height, then multiply by π."],
    fr: {
      contextPool: SOLIDS_FR,
      promptTemplates: [
        "Un cylindre a un rayon de {rad} cm et une hauteur de {hei} cm. Quel est son volume, en cm³ au dixième près ?",
        "{ctx} est un cylindre de rayon {rad} cm et de hauteur {hei} cm. Quelle est sa contenance, en cm³ au dixième près ?"
      ],
      explain: (v, r) => [`V = πr²h = π x ${v[0]}² x ${v[1]} = π x ${v[0]! * v[0]! * v[1]!}.`, `Soit ${r} cm³.`],
      hints: () => ["Élève le rayon au carré, multiplie par la hauteur, puis multiplie par π."]
    },
    declaredVariationSpace: 20 * 25 * (1 + SOLIDS.length)
  }),
  arithmeticTemplate({
    key: "y9l8.prismVolumeFromCrossSection", levelKey: "Y9L8", objectiveCode: "Y9-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[4, 60], [2, 40]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A prism has a cross-sectional area of {a} cm² and a length of {b} cm. What is its volume, in cm³?",
      "The uniform cross-section of a prism has area {a} cm². The prism is {b} cm long. Find its volume, in cm³.",
      "A chocolate bar is a prism with cross-section {a} cm² and length {b} cm. What is its volume, in cm³?"
    ],
    explain: (v, r) => [`For any prism, volume = cross-section x length.`, `${v[0]} x ${v[1]} = ${r} cm³.`],
    hints: () => ["This one rule works for every prism, whatever shape the cross-section is."],
    fr: {
      promptTemplates: [
        "Un prisme a une section de {a} cm² et une longueur de {b} cm. Quel est son volume, en cm³ ?",
        "La section constante d'un prisme a une aire de {a} cm². Le prisme mesure {b} cm de long. Trouve son volume, en cm³.",
        "Une barre de chocolat est un prisme de section {a} cm² et de longueur {b} cm. Quel est son volume, en cm³ ?"
      ],
      explain: (v, r) => [`Pour tout prisme, volume = section x longueur.`, `${v[0]} x ${v[1]} = ${r} cm³.`],
      hints: () => ["Cette seule règle fonctionne pour tous les prismes, quelle que soit la forme de la section."]
    },
    declaredVariationSpace: 57 * 39 * 3
  }),
  arithmeticTemplate({
    key: "y9l8.triangularPrismVolume", levelKey: "Y9L8", objectiveCode: "Y9-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 20], [2, 20], [2, 20]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]! * v[2]!) / 2,
    promptTemplates: [
      "A triangular prism has a cross-section with base {a} cm and perpendicular height {b} cm, and a length of {c} cm. What is its volume, in cm³?",
      "A tent is a triangular prism: its end has base {a} m and height {b} m, and it is {c} m long. What volume does it enclose, in m³?"
    ],
    explain: (v, r) => [`Cross-section = ½ x ${v[0]} x ${v[1]} = ${(v[0]! * v[1]!) / 2} cm².`, `${(v[0]! * v[1]!) / 2} x ${v[2]} = ${r} cm³.`],
    hints: () => ["Find the triangle's area first, then multiply by the length of the prism."],
    fr: {
      promptTemplates: [
        "Un prisme triangulaire a une section de base {a} cm et de hauteur perpendiculaire {b} cm, et une longueur de {c} cm. Quel est son volume, en cm³ ?",
        "Une tente est un prisme triangulaire : son extrémité a une base de {a} m et une hauteur de {b} m, et elle mesure {c} m de long. Quel volume contient-elle, en m³ ?"
      ],
      explain: (v, r) => [`Section = ½ x ${v[0]} x ${v[1]} = ${(v[0]! * v[1]!) / 2} cm².`, `${(v[0]! * v[1]!) / 2} x ${v[2]} = ${r} cm³.`],
      hints: () => ["Calcule d'abord l'aire du triangle, puis multiplie par la longueur du prisme."]
    },
    declaredVariationSpace: 19 * 19 * 19
  }),

  // --- Y9-L8-3: circle theorems ---
  arithmeticTemplate({
    key: "y9l8.angleInSemicircle", levelKey: "Y9L8", objectiveCode: "Y9-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["CIRCLE_THEOREM_CONFUSION"], type: "MULTI_STEP",
    ranges: [[10, 80]], compute: (v) => 90 - v[0]!,
    promptTemplates: [
      "A triangle is drawn in a semicircle with the diameter as its longest side. One of its other angles is {a}°. What is the remaining angle, in degrees?",
      "The angle in a semicircle is a right angle. If a second angle of that triangle is {a}°, what is the third, in degrees?",
      "Points A and B are the ends of a diameter and C is on the circle. Angle ABC = {a}°. Find angle BAC, in degrees."
    ],
    explain: (v, r) => [`The angle in a semicircle is 90°.`, `180 - 90 - ${v[0]} = ${r}°.`],
    hints: () => ["A triangle drawn on a diameter always has a right angle at the circle — that uses up 90° of the 180°."],
    fr: {
      promptTemplates: [
        "Un triangle est tracé dans un demi-cercle avec le diamètre comme plus grand côté. L'un de ses autres angles vaut {a}°. Quelle est la mesure de l'angle restant, en degrés ?",
        "L'angle inscrit dans un demi-cercle est droit. Si un deuxième angle de ce triangle vaut {a}°, combien mesure le troisième, en degrés ?",
        "Les points A et B sont les extrémités d'un diamètre et C est sur le cercle. L'angle ABC = {a}°. Trouve l'angle BAC, en degrés."
      ],
      explain: (v, r) => [`L'angle inscrit dans un demi-cercle vaut 90°.`, `180 - 90 - ${v[0]} = ${r}°.`],
      hints: () => ["Un triangle tracé sur un diamètre a toujours un angle droit sur le cercle — cela consomme 90° des 180°."]
    },
    declaredVariationSpace: 71 * 3
  }),
  arithmeticTemplate({
    key: "y9l8.angleAtCentre", levelKey: "Y9L8", objectiveCode: "Y9-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["CIRCLE_THEOREM_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[10, 170]], compute: (v) => 2 * v[0]!,
    promptTemplates: [
      "The angle at the circumference standing on an arc is {a}°. What is the angle at the centre standing on the same arc, in degrees?",
      "An inscribed angle measures {a}°. What does the central angle on the same arc measure, in degrees?",
      "Angle ABC at the circumference is {a}°. Find angle AOC at the centre, in degrees."
    ],
    explain: (v, r) => [`The angle at the centre is twice the angle at the circumference.`, `2 x ${v[0]} = ${r}°.`],
    hints: () => ["Centre angle = 2 x circumference angle, when both stand on the same arc."],
    fr: {
      promptTemplates: [
        "L'angle inscrit qui s'appuie sur un arc vaut {a}°. Quelle est la mesure de l'angle au centre s'appuyant sur le même arc, en degrés ?",
        "Un angle inscrit mesure {a}°. Combien mesure l'angle au centre sur le même arc, en degrés ?",
        "L'angle inscrit ABC vaut {a}°. Trouve l'angle au centre AOC, en degrés."
      ],
      explain: (v, r) => [`L'angle au centre vaut le double de l'angle inscrit.`, `2 x ${v[0]} = ${r}°.`],
      hints: () => ["Angle au centre = 2 x angle inscrit, quand les deux s'appuient sur le même arc."]
    },
    declaredVariationSpace: 161 * 3
  }),
  arithmeticTemplate({
    key: "y9l8.cyclicQuadrilateral", levelKey: "Y9L8", objectiveCode: "Y9-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["CIRCLE_THEOREM_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[20, 160]], compute: (v) => 180 - v[0]!,
    promptTemplates: [
      "A cyclic quadrilateral has one angle of {a}°. What is the angle opposite it, in degrees?",
      "All four vertices of a quadrilateral lie on a circle. One angle is {a}°. Find the opposite angle, in degrees.",
      "In cyclic quadrilateral ABCD, angle A = {a}°. What is angle C, in degrees?"
    ],
    explain: (v, r) => [`Opposite angles of a cyclic quadrilateral add to 180°.`, `180 - ${v[0]} = ${r}°.`],
    hints: () => ["Opposite angles in a cyclic quadrilateral are supplementary — they add to 180°."],
    fr: {
      promptTemplates: [
        "Un quadrilatère inscriptible a un angle de {a}°. Quelle est la mesure de l'angle opposé, en degrés ?",
        "Les quatre sommets d'un quadrilatère sont sur un cercle. Un angle vaut {a}°. Trouve l'angle opposé, en degrés.",
        "Dans le quadrilatère inscriptible ABCD, l'angle A = {a}°. Combien vaut l'angle C, en degrés ?"
      ],
      explain: (v, r) => [`Les angles opposés d'un quadrilatère inscriptible ont pour somme 180°.`, `180 - ${v[0]} = ${r}°.`],
      hints: () => ["Les angles opposés d'un quadrilatère inscriptible sont supplémentaires — leur somme vaut 180°."]
    },
    declaredVariationSpace: 141 * 3
  }),
  arithmeticTemplate({
    key: "y9l8.tangentRadiusAngle", levelKey: "Y9L8", objectiveCode: "Y9-L8-3", difficulty: "REASONING",
    misconceptionTags: ["CIRCLE_THEOREM_CONFUSION"], type: "MULTI_STEP",
    ranges: [[10, 80]], compute: (v) => 90 - v[0]!,
    promptTemplates: [
      "A tangent touches a circle at T, and OT is a radius. In triangle OTP, angle OPT is {a}°. What is angle TOP, in degrees?",
      "A radius meets a tangent at a right angle. In that right-angled triangle one other angle is {a}°. Find the third angle, in degrees.",
      "PT is a tangent and OT a radius. Angle at P is {a}°. Work out the angle at O, in degrees."
    ],
    explain: (v, r) => [`A tangent always meets a radius at 90°, so angle OTP = 90°.`, `180 - 90 - ${v[0]} = ${r}°.`],
    hints: () => ["Mark the right angle where the radius meets the tangent first — then it is just the angle sum of a triangle."],
    fr: {
      promptTemplates: [
        "Une tangente touche un cercle en T, et OT est un rayon. Dans le triangle OTP, l'angle OPT vaut {a}°. Combien mesure l'angle TOP, en degrés ?",
        "Un rayon rencontre une tangente à angle droit. Dans ce triangle rectangle, un autre angle vaut {a}°. Trouve le troisième angle, en degrés.",
        "PT est une tangente et OT un rayon. L'angle en P vaut {a}°. Calcule l'angle en O, en degrés."
      ],
      explain: (v, r) => [`Une tangente rencontre toujours un rayon à 90°, donc l'angle OTP = 90°.`, `180 - 90 - ${v[0]} = ${r}°.`],
      hints: () => ["Marque d'abord l'angle droit entre le rayon et la tangente — ensuite, c'est juste la somme des angles d'un triangle."]
    },
    declaredVariationSpace: 71 * 3
  }),
  categoricalPoolTemplate({
    key: "y9l8.mcCircleTheoremName", levelKey: "Y9L8", objectiveCode: "Y9-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["CIRCLE_THEOREM_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { theorem: ["the angle in a semicircle is 90°", "the angle at the centre is twice the angle at the circumference", "opposite angles of a cyclic quadrilateral add to 180°", "a tangent meets a radius at 90°", "angles in the same segment are equal"] },
    build: (picked, rng) => {
      const ang = rng.int(20, 150);
      const theorem = picked.theorem!;
      const setups: Record<string, string> = {
        "the angle in a semicircle is 90°": `a triangle has its longest side along a diameter, and the angle at the circle turns out to be 90° rather than ${ang}°`,
        "the angle at the centre is twice the angle at the circumference": `an inscribed angle of ${ang}° sits on the same arc as a central angle of ${2 * ang}°`,
        "opposite angles of a cyclic quadrilateral add to 180°": `a quadrilateral with all four corners on the circle has an angle of ${ang}° opposite one of ${180 - ang}°`,
        "a tangent meets a radius at 90°": `a line touching the circle at one point makes a 90° angle with the radius drawn to that point`,
        "angles in the same segment are equal": `two inscribed angles both standing on the same arc each measure ${ang}°`
      };
      return {
        prompt: `In a circle diagram, ${setups[theorem]}. Which theorem is being used?`,
        correctLabel: theorem,
        distractorLabels: Object.keys(setups).filter((t) => t !== theorem).slice(0, 3),
        explanationSteps: [`That description is exactly the statement that ${theorem}.`],
        hints: ["Look at where the angles sit: on a diameter, at the centre, in a cyclic quadrilateral, at a tangent, or on the same arc."]
      };
    },
    fr: {
      translate: (drawn) => {
        const theoremsFr: Record<string, string> = {
          "the angle in a semicircle is 90°": "l'angle inscrit dans un demi-cercle vaut 90°",
          "the angle at the centre is twice the angle at the circumference": "l'angle au centre vaut le double de l'angle inscrit",
          "opposite angles of a cyclic quadrilateral add to 180°": "les angles opposés d'un quadrilatère inscriptible ont pour somme 180°",
          "a tangent meets a radius at 90°": "une tangente rencontre un rayon à 90°",
          "angles in the same segment are equal": "les angles inscrits dans le même segment sont égaux"
        };
        const m = drawn.prompt.match(/^In a circle diagram, (.+)\. Which theorem is being used\?$/);
        const setupFr = (m ? m[1]! : "")
          .replace(/^a triangle has its longest side along a diameter, and the angle at the circle turns out to be 90° rather than (\d+)°$/, "un triangle a son plus grand côté sur un diamètre, et l'angle sur le cercle vaut 90° et non $1°")
          .replace(/^an inscribed angle of (\d+)° sits on the same arc as a central angle of (\d+)°$/, "un angle inscrit de $1° s'appuie sur le même arc qu'un angle au centre de $2°")
          .replace(/^a quadrilateral with all four corners on the circle has an angle of (\d+)° opposite one of (\d+)°$/, "un quadrilatère dont les quatre sommets sont sur le cercle a un angle de $1° opposé à un angle de $2°")
          .replace(/^a line touching the circle at one point makes a 90° angle with the radius drawn to that point$/, "une droite touchant le cercle en un point forme un angle de 90° avec le rayon mené à ce point")
          .replace(/^two inscribed angles both standing on the same arc each measure (\d+)°$/, "deux angles inscrits s'appuyant sur le même arc mesurent chacun $1°");
        return {
          prompt: `Sur un schéma de cercle, ${setupFr}. Quel théorème est utilisé ?`,
          correctLabel: theoremsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => theoremsFr[d] ?? d),
          hints: ["Regarde où se trouvent les angles : sur un diamètre, au centre, dans un quadrilatère inscriptible, sur une tangente, ou sur le même arc."]
        };
      }
    },
    declaredVariationSpace: 5 * 131
  }),
  matchingTemplate({
    key: "y9l8.matchCircleParts", levelKey: "Y9L8", objectiveCode: "Y9-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["CIRCLE_VOCABULARY_ERROR"],
    generatePairs: (rng) => {
      const r = rng.int(2, 40);
      const all = [
        { left: `the straight line from the centre to the edge, ${r} cm long`, right: "radius" },
        { left: `the straight line right across through the centre, ${2 * r} cm long`, right: "diameter" },
        { left: `the curved distance all the way round, about ${(2 * Math.PI * r).toFixed(1)} cm`, right: "circumference" },
        { left: `a straight line joining two points on the edge without passing through the centre`, right: "chord" },
        { left: `a line that touches the circle at exactly one point`, right: "tangent" },
        { left: `part of the curved edge between two points`, right: "arc" }
      ];
      return rng.shuffle(all).slice(0, 3);
    },
    promptTemplates: ["Match each description to the part of a circle it names.", "Match each circle description to its correct name."],
    explain: (pairs) => [pairs.map((p) => `${p.right}: ${p.left}`).join("; ") + "."],
    hints: () => ["A tangent touches once, a chord joins two points, and an arc is part of the curve itself."],
    fr: {
      promptTemplates: ["Associe chaque description à la partie du cercle qu'elle désigne.", "Associe chaque description de cercle à son nom correct."],
      explain: (pairs) => [pairs.map((p) => `${p.right} : ${p.left}`).join(" ; ") + "."],
      hints: () => ["Une tangente touche en un seul point, une corde joint deux points, et un arc est une portion de la courbe."],
      translatePairs: (pairs) => pairs.map((p) => {
        const names: Record<string, string> = { radius: "rayon", diameter: "diamètre", circumference: "circonférence", chord: "corde", tangent: "tangente", arc: "arc" };
        return {
          left: p.left
            .replace(/^the straight line from the centre to the edge, (.+) long$/, "le segment du centre au bord, de $1 de long")
            .replace(/^the straight line right across through the centre, (.+) long$/, "le segment traversant le cercle par le centre, de $1 de long")
            .replace(/^the curved distance all the way round, about (.+)$/, "la distance courbe tout autour, environ $1")
            .replace(/^a straight line joining two points on the edge without passing through the centre$/, "un segment joignant deux points du bord sans passer par le centre")
            .replace(/^a line that touches the circle at exactly one point$/, "une droite qui touche le cercle en exactement un point")
            .replace(/^part of the curved edge between two points$/, "une portion du bord courbe entre deux points"),
          right: names[p.right] ?? p.right
        };
      })
    },
    declaredVariationSpace: 4000
  })
];

export default level;
