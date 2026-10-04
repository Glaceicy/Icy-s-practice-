import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 8 — "Circles, vectors, area, surface area and volume"
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const ROUND_THINGS = ["a pizza", "a clock face", "a pond", "a trampoline", "a dinner plate", "a roundabout", "a drum skin", "a bike wheel"];
const ROUND_THINGS_FR = ["une pizza", "un cadran d'horloge", "un bassin", "un trampoline", "une assiette", "un rond-point", "une peau de tambour", "une roue de vélo"];
const SOLID_THINGS = ["a water tank", "a tin of soup", "a candle", "a storage drum", "a paint pot", "a bird bath"];
const SOLID_THINGS_FR = ["un réservoir d'eau", "une boîte de soupe", "une bougie", "un bidon de stockage", "un pot de peinture", "une vasque à oiseaux"];
const BOXES = ["a gift box", "a toolbox", "a fish tank", "a crate", "a wardrobe", "a cool box"];
const BOXES_FR = ["une boîte cadeau", "une boîte à outils", "un aquarium", "une caisse", "une armoire", "une glacière"];
const oneDp = (n: number) => n.toFixed(1);

export const level: QuestionTemplateDef[] = [
  // --- Y10-L8-1: perimeter, area, surface area and volume ---
  arithmeticTemplate({
    key: "y10l8.circleAreaInTermsOfPi", levelKey: "Y10L8", objectiveCode: "Y10-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["CIRCLE_FORMULA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[1, 40]], compute: (v) => v[0]! * v[0]!,
    promptTemplates: [
      "A circle has a radius of {a} cm. Its area is ___π cm². What number is missing?",
      "{ctx} is a circle of radius {a} cm. Its area is ___π cm². What number is missing?",
      "Give the area of a circle of radius {a} cm as a multiple of π: ___π cm²."
    ],
    explain: (v, r) => [`Area = πr² = π x ${v[0]}² = ${r}π cm².`],
    hints: () => ["Area of a circle is πr² — square the radius and leave π as a factor."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un cercle a un rayon de {a} cm. Son aire est ___π cm². Quel nombre manque ?",
        "{ctx} est un cercle de rayon {a} cm. Son aire est ___π cm². Quel nombre manque ?",
        "Donne l'aire d'un cercle de rayon {a} cm comme un multiple de π : ___π cm²."
      ],
      explain: (v, r) => [`Aire = πr² = π x ${v[0]}² = ${r}π cm².`],
      hints: () => ["L'aire d'un cercle est πr² — élève le rayon au carré et garde π en facteur."]
    },
    declaredVariationSpace: 40 * (1 + 2 * ROUND_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y10l8.circumferenceInTermsOfPi", levelKey: "Y10L8", objectiveCode: "Y10-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["CIRCLE_FORMULA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[1, 60]], compute: (v) => 2 * v[0]!,
    promptTemplates: [
      "A circle has a radius of {a} cm. Its circumference is ___π cm. What number is missing?",
      "{ctx} has a radius of {a} cm. Give its circumference as a multiple of π: ___π cm.",
      "Write the circumference of a circle of radius {a} cm in the form ___π cm."
    ],
    explain: (v, r) => [`Circumference = 2πr = 2 x π x ${v[0]} = ${r}π cm.`],
    hints: () => ["Circumference is 2πr — double the radius and keep π as a factor."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un cercle a un rayon de {a} cm. Sa circonférence est ___π cm. Quel nombre manque ?",
        "{ctx} a un rayon de {a} cm. Donne sa circonférence comme un multiple de π : ___π cm.",
        "Écris la circonférence d'un cercle de rayon {a} cm sous la forme ___π cm."
      ],
      explain: (v, r) => [`Circonférence = 2πr = 2 x π x ${v[0]} = ${r}π cm.`],
      hints: () => ["La circonférence est 2πr — double le rayon et garde π en facteur."]
    },
    declaredVariationSpace: 60 * (1 + 2 * ROUND_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y10l8.circleAreaRounded", levelKey: "Y10L8", objectiveCode: "Y10-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["CIRCLE_FORMULA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[1, 30]], compute: (v) => Math.PI * v[0]! * v[0]!, formatValue: oneDp,
    derive: (v) => ({ rad: v[0]! }),
    promptTemplates: [
      "A circle has a radius of {rad} cm. What is its area in cm², to 1 decimal place?",
      "{ctx} is a circle of radius {rad} m. What is its area in m², to 1 decimal place?",
      "Work out the area of a circle with radius {rad} cm, giving your answer in cm² to 1 decimal place."
    ],
    explain: (v, r) => [`Area = πr² = π x ${v[0]}² = π x ${v[0]! * v[0]!}.`, `That gives ${r} cm² to 1 decimal place.`],
    hints: () => ["Square the radius first, then multiply by π."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un cercle a un rayon de {rad} cm. Quelle est son aire en cm², au dixième près ?",
        "{ctx} est un cercle de rayon {rad} m. Quelle est son aire en m², au dixième près ?",
        "Calcule l'aire d'un cercle de rayon {rad} cm, en cm² au dixième près."
      ],
      explain: (v, r) => [`Aire = πr² = π x ${v[0]}² = π x ${v[0]! * v[0]!}.`, `Cela donne ${r} cm² au dixième près.`],
      hints: () => ["Élève d'abord le rayon au carré, puis multiplie par π."]
    },
    declaredVariationSpace: 30 * (1 + 2 * ROUND_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y10l8.sphereSurfaceAreaInTermsOfPi", levelKey: "Y10L8", objectiveCode: "Y10-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 60]], compute: (v) => 4 * v[0]! * v[0]!,
    promptTemplates: [
      "A sphere has a radius of {a} cm. Its surface area is ___π cm². What number is missing?",
      "Using A = 4πr², give the surface area of a sphere of radius {a} cm in the form ___π cm².",
      "A ball has radius {a} cm. Write its surface area as a multiple of π: ___π cm²."
    ],
    explain: (v, r) => [`A = 4πr² = 4 x π x ${v[0]}² = ${r}π cm².`],
    hints: () => ["Surface area of a sphere is 4πr² — square the radius, then multiply by 4."],
    fr: {
      promptTemplates: [
        "Une sphère a un rayon de {a} cm. Son aire est ___π cm². Quel nombre manque ?",
        "En utilisant A = 4πr², donne l'aire d'une sphère de rayon {a} cm sous la forme ___π cm².",
        "Un ballon a un rayon de {a} cm. Écris son aire comme un multiple de π : ___π cm²."
      ],
      explain: (v, r) => [`A = 4πr² = 4 x π x ${v[0]}² = ${r}π cm².`],
      hints: () => ["L'aire d'une sphère est 4πr² — élève le rayon au carré, puis multiplie par 4."]
    },
    declaredVariationSpace: 60 * 3
  }),
  arithmeticTemplate({
    key: "y10l8.cylinderVolumeInTermsOfPi", levelKey: "Y10L8", objectiveCode: "Y10-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "NUMBER_ENTRY", contextPool: SOLID_THINGS,
    ranges: [[1, 15], [1, 20]], compute: (v) => v[0]! * v[0]! * v[1]!,
    promptTemplates: [
      "A cylinder has a radius of {a} cm and a height of {b} cm. Its volume is ___π cm³. What number is missing?",
      "{ctx} is a cylinder of radius {a} cm and height {b} cm. Give its volume as a multiple of π: ___π cm³."
    ],
    explain: (v, r) => [`V = πr²h = π x ${v[0]}² x ${v[1]} = ${r}π cm³.`],
    hints: () => ["Volume of a cylinder is πr²h — square the radius, multiply by the height, keep π."],
    fr: {
      contextPool: SOLID_THINGS_FR,
      promptTemplates: [
        "Un cylindre a un rayon de {a} cm et une hauteur de {b} cm. Son volume est ___π cm³. Quel nombre manque ?",
        "{ctx} est un cylindre de rayon {a} cm et de hauteur {b} cm. Donne son volume comme un multiple de π : ___π cm³."
      ],
      explain: (v, r) => [`V = πr²h = π x ${v[0]}² x ${v[1]} = ${r}π cm³.`],
      hints: () => ["Le volume d'un cylindre est πr²h — élève le rayon au carré, multiplie par la hauteur, garde π."]
    },
    declaredVariationSpace: 15 * 20 * (1 + SOLID_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y10l8.cuboidSurfaceArea", levelKey: "Y10L8", objectiveCode: "Y10-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "MULTI_STEP", contextPool: BOXES,
    ranges: [[2, 20], [2, 20], [2, 20]],
    compute: (v) => 2 * (v[0]! * v[1]! + v[0]! * v[2]! + v[1]! * v[2]!),
    promptTemplates: [
      "A cuboid measures {a} cm by {b} cm by {c} cm. What is its total surface area, in cm²?",
      "{ctx} is a cuboid {a} cm by {b} cm by {c} cm. How much card is needed to cover it completely, in cm²?"
    ],
    explain: (v, r) => [
      `The three different faces have areas ${v[0]! * v[1]!}, ${v[0]! * v[2]!} and ${v[1]! * v[2]!} cm².`,
      `Each occurs twice: 2 x (${v[0]! * v[1]!} + ${v[0]! * v[2]!} + ${v[1]! * v[2]!}) = ${r} cm².`
    ],
    hints: () => ["A cuboid has three pairs of identical faces — work out one of each, add, then double."],
    fr: {
      contextPool: BOXES_FR,
      promptTemplates: [
        "Un pavé droit mesure {a} cm sur {b} cm sur {c} cm. Quelle est son aire totale, en cm² ?",
        "{ctx} est un pavé droit de {a} cm sur {b} cm sur {c} cm. Combien de carton faut-il pour le couvrir entièrement, en cm² ?"
      ],
      explain: (v, r) => [
        `Les trois faces différentes ont pour aires ${v[0]! * v[1]!}, ${v[0]! * v[2]!} et ${v[1]! * v[2]!} cm².`,
        `Chacune apparaît deux fois : 2 x (${v[0]! * v[1]!} + ${v[0]! * v[2]!} + ${v[1]! * v[2]!}) = ${r} cm².`
      ],
      hints: () => ["Un pavé droit a trois paires de faces identiques — calcule une de chaque, additionne, puis double."]
    },
    declaredVariationSpace: 19 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y10l8.triangularPrismVolume", levelKey: "Y10L8", objectiveCode: "Y10-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SURFACE_AREA_VOLUME_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 20], [2, 20], [2, 20]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]! * v[2]!) / 2,
    promptTemplates: [
      "A triangular prism has a cross-section with base {a} cm and height {b} cm, and a length of {c} cm. What is its volume, in cm³?",
      "A wedge of cheese is a triangular prism: its triangular face has base {a} cm and height {b} cm, and it is {c} cm long. Find its volume, in cm³."
    ],
    explain: (v, r) => [
      `The cross-sectional area is ½ x ${v[0]} x ${v[1]} = ${(v[0]! * v[1]!) / 2} cm².`,
      `Volume = cross-section x length = ${(v[0]! * v[1]!) / 2} x ${v[2]} = ${r} cm³.`
    ],
    hints: () => ["For any prism, volume = area of cross-section x length."],
    fr: {
      promptTemplates: [
        "Un prisme triangulaire a une section de base {a} cm et de hauteur {b} cm, et une longueur de {c} cm. Quel est son volume, en cm³ ?",
        "Un morceau de fromage est un prisme triangulaire : sa face triangulaire a une base de {a} cm et une hauteur de {b} cm, et il mesure {c} cm de long. Trouve son volume, en cm³."
      ],
      explain: (v, r) => [
        `L'aire de la section est ½ x ${v[0]} x ${v[1]} = ${(v[0]! * v[1]!) / 2} cm².`,
        `Volume = section x longueur = ${(v[0]! * v[1]!) / 2} x ${v[2]} = ${r} cm³.`
      ],
      hints: () => ["Pour tout prisme, volume = aire de la section x longueur."]
    },
    declaredVariationSpace: 19 * 19 * 19
  }),

  // --- Y10-L8-2: vectors ---
  categoricalPoolTemplate({
    key: "y10l8.mcTranslationVector", levelKey: "Y10L8", objectiveCode: "Y10-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const x1 = rng.int(-6, 6);
      const y1 = rng.int(-6, 6);
      const dx = rng.int(-7, 7);
      const dy = rng.int(-7, 7);
      const correct = `(${dx}, ${dy})`;
      const candidates = [`(${dy}, ${dx})`, `(${-dx}, ${-dy})`, `(${dx + 1}, ${dy})`, `(${dx}, ${dy + 1})`, `(${dx - 1}, ${dy + 2})`, `(${dx + 2}, ${dy - 1})`];
      const distractors: string[] = [];
      for (const c of candidates) {
        if (c === correct || distractors.includes(c)) continue;
        distractors.push(c);
        if (distractors.length === 3) break;
      }
      return {
        prompt: `Point A is at (${x1}, ${y1}) and point B is at (${x1 + dx}, ${y1 + dy}). Which column vector describes the translation from A to B?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`Across: ${x1 + dx} - ${x1} = ${dx}. Up: ${y1 + dy} - ${y1} = ${dy}.`, `So the translation vector is ${correct}.`],
        hints: ["Subtract the start coordinates from the end coordinates: across first, then up."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Point A is at \((.+?)\) and point B is at \((.+?)\)\./);
        if (!m) return {};
        return {
          prompt: `Le point A est en (${m[1]}) et le point B en (${m[2]}). Quel vecteur colonne décrit la translation de A vers B ?`,
          hints: ["Soustrais les coordonnées de départ de celles d'arrivée : d'abord horizontalement, puis verticalement."]
        };
      }
    },
    declaredVariationSpace: 13 * 13 * 15 * 15
  }),
  arithmeticTemplate({
    key: "y10l8.addVectorsXComponent", levelKey: "Y10L8", objectiveCode: "Y10-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["VECTOR_ARITHMETIC_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-9, 9], [-9, 9], [-9, 9], [-9, 9]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: [
      "Vector a = ({a}, {b}) and vector b = ({c}, {d}). What is the top (x) component of a + b?",
      "If a = ({a}, {b}) and b = ({c}, {d}), find the x-component of a + b."
    ],
    explain: (v, r) => [`Add the top components: ${v[0]} + ${v[2]} = ${r}.`],
    hints: () => ["Add vectors component by component — top with top, bottom with bottom."],
    fr: {
      promptTemplates: [
        "Le vecteur a = ({a}, {b}) et le vecteur b = ({c}, {d}). Quelle est la composante du haut (x) de a + b ?",
        "Si a = ({a}, {b}) et b = ({c}, {d}), trouve la composante x de a + b."
      ],
      explain: (v, r) => [`Additionne les composantes du haut : ${v[0]} + ${v[2]} = ${r}.`],
      hints: () => ["Additionne les vecteurs composante par composante — haut avec haut, bas avec bas."]
    },
    declaredVariationSpace: 19 * 19 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y10l8.subtractVectorsYComponent", levelKey: "Y10L8", objectiveCode: "Y10-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["VECTOR_ARITHMETIC_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-9, 9], [-9, 9], [-9, 9], [-9, 9]], compute: (v) => v[1]! - v[3]!,
    promptTemplates: [
      "Vector a = ({a}, {b}) and vector b = ({c}, {d}). What is the bottom (y) component of a - b?",
      "If a = ({a}, {b}) and b = ({c}, {d}), find the y-component of a - b."
    ],
    explain: (v, r) => [`Subtract the bottom components: ${v[1]} - (${v[3]}) = ${r}.`],
    hints: () => ["Subtracting a vector means subtracting each component — watch the signs."],
    fr: {
      promptTemplates: [
        "Le vecteur a = ({a}, {b}) et le vecteur b = ({c}, {d}). Quelle est la composante du bas (y) de a - b ?",
        "Si a = ({a}, {b}) et b = ({c}, {d}), trouve la composante y de a - b."
      ],
      explain: (v, r) => [`Soustrais les composantes du bas : ${v[1]} - (${v[3]}) = ${r}.`],
      hints: () => ["Soustraire un vecteur revient à soustraire chaque composante — attention aux signes."]
    },
    declaredVariationSpace: 19 * 19 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y10l8.scalarMultipleOfVector", levelKey: "Y10L8", objectiveCode: "Y10-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["VECTOR_ARITHMETIC_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [-9, 9], [-9, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Vector a = ({b}, {c}). What is the x-component of {a}a?",
      "If a = ({b}, {c}), work out the top component of {a}a."
    ],
    explain: (v, r) => [`Multiply every component by ${v[0]}: ${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiplying a vector by a number multiplies both components by it."],
    fr: {
      promptTemplates: [
        "Le vecteur a = ({b}, {c}). Quelle est la composante x de {a}a ?",
        "Si a = ({b}, {c}), calcule la composante du haut de {a}a."
      ],
      explain: (v, r) => [`Multiplie chaque composante par ${v[0]} : ${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplier un vecteur par un nombre multiplie ses deux composantes."]
    },
    declaredVariationSpace: 8 * 19 * 19 * 2
  }),
  arithmeticTemplate({
    key: "y10l8.magnitudeOfVector", levelKey: "Y10L8", objectiveCode: "Y10-L8-2", difficulty: "REASONING",
    misconceptionTags: ["VECTOR_MAGNITUDE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[0, TRIPLES.length - 1], [1, 8], [0, 1]],
    compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => {
      const t = TRIPLES[v[0]!]!;
      const sign = v[2]! === 0 ? 1 : -1;
      return { p: t[0] * v[1]! * sign, q: t[1] * v[1]! };
    },
    promptTemplates: [
      "Vector a = ({p}, {q}). What is its magnitude |a|?",
      "Find the length of the vector ({p}, {q})."
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const p = t[0] * v[1]! * (v[2]! === 0 ? 1 : -1), q = t[1] * v[1]!;
      return [`|a| = √((${p})² + ${q}²) = √${p * p + q * q}.`, `That equals ${r}.`];
    },
    hints: () => ["The magnitude is the hypotenuse of a right-angled triangle: √(x² + y²). Squaring removes any minus sign."],
    fr: {
      promptTemplates: [
        "Le vecteur a = ({p}, {q}). Quelle est sa norme |a| ?",
        "Trouve la longueur du vecteur ({p}, {q})."
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]! * (v[2]! === 0 ? 1 : -1), q = t[1] * v[1]!;
        return [`|a| = √((${p})² + ${q}²) = √${p * p + q * q}.`, `Cela vaut ${r}.`];
      },
      hints: () => ["La norme est l'hypoténuse d'un triangle rectangle : √(x² + y²). Le carré élimine le signe moins."]
    },
    declaredVariationSpace: TRIPLES.length * 8 * 2 * 2
  }),
  categoricalPoolTemplate({
    key: "y10l8.tfParallelVectors", levelKey: "Y10L8", objectiveCode: "Y10-L8-2", difficulty: "REASONING",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const x = rng.int(1, 9);
      const y = rng.int(1, 9);
      const k = rng.int(2, 6);
      const isParallel = rng.chance(0.5);
      const second = isParallel ? `(${k * x}, ${k * y})` : `(${k * x}, ${k * y + rng.int(1, 5)})`;
      return {
        prompt: `The vector (${x}, ${y}) is parallel to the vector ${second}. True or false?`,
        correctLabel: isParallel ? "True" : "False",
        distractorLabels: [isParallel ? "False" : "True"],
        explanationSteps: [isParallel
          ? `Every component has been multiplied by ${k}, so one vector is a scalar multiple of the other and they are parallel.`
          : "The components are not in the same ratio, so neither vector is a scalar multiple of the other."],
        hints: ["Two vectors are parallel exactly when one is a number times the other."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^The vector \((.+?)\) is parallel to the vector \((.+?)\)\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Le vecteur (${m[1]}) est parallèle au vecteur (${m[2]}). Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Chaque composante a été multipliée par le même nombre, donc un vecteur est un multiple scalaire de l'autre : ils sont parallèles."
            : "Les composantes ne sont pas dans le même rapport, donc aucun vecteur n'est un multiple scalaire de l'autre."],
          hints: ["Deux vecteurs sont parallèles exactement quand l'un est un nombre fois l'autre."]
        };
      }
    },
    declaredVariationSpace: 9 * 9 * 5 * 2 * 5
  }),

  // --- Y10-L8-3: vector methods in geometric arguments and proof ---
  arithmeticTemplate({
    key: "y10l8.midpointVectorComponent", levelKey: "Y10L8", objectiveCode: "Y10-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["VECTOR_ARITHMETIC_ERROR"], type: "MULTI_STEP",
    ranges: [[-9, 9], [-9, 9], [-9, 9], [-9, 9]], constraint: (v) => (v[0]! + v[2]!) % 2 === 0,
    compute: (v) => (v[0]! + v[2]!) / 2,
    promptTemplates: [
      "OA = ({a}, {b}) and OB = ({c}, {d}). M is the midpoint of AB. What is the x-component of OM?",
      "In a diagram, OA = ({a}, {b}) and OB = ({c}, {d}). Find the top component of the position vector of the midpoint of AB."
    ],
    explain: (v, r) => [`OM = ½(OA + OB).`, `The x-component is (${v[0]} + ${v[2]}) ÷ 2 = ${r}.`],
    hints: () => ["The position vector of a midpoint is the average of the two position vectors."],
    fr: {
      promptTemplates: [
        "OA = ({a}, {b}) et OB = ({c}, {d}). M est le milieu de AB. Quelle est la composante x de OM ?",
        "Sur un schéma, OA = ({a}, {b}) et OB = ({c}, {d}). Trouve la composante du haut du vecteur position du milieu de AB."
      ],
      explain: (v, r) => [`OM = ½(OA + OB).`, `La composante x est (${v[0]} + ${v[2]}) ÷ 2 = ${r}.`],
      hints: () => ["Le vecteur position d'un milieu est la moyenne des deux vecteurs positions."]
    },
    declaredVariationSpace: 19 * 19 * 19 * 19
  }),
  categoricalPoolTemplate({
    key: "y10l8.tfVectorRoundTrip", levelKey: "Y10L8", objectiveCode: "Y10-L8-3", difficulty: "REASONING",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const x = rng.int(-8, 8);
      const y = rng.int(-8, 8);
      const claims: Array<{ text: string; valid: boolean }> = [
        { text: `AB = (${x}, ${y}) means BA = (${-x}, ${-y})`, valid: true },
        { text: `AB = (${x}, ${y}) means BA = (${y}, ${x})`, valid: false },
        { text: `if AB = (${x}, ${y}) then AB + BA is the zero vector`, valid: true },
        { text: `if AB = (${x}, ${y}) then AB + BA = (${2 * x}, ${2 * y})`, valid: false },
        { text: `if M is the midpoint of AB then AM = ½AB`, valid: true },
        { text: `if M is the midpoint of AB then AM = 2AB`, valid: false }
      ];
      const claim = rng.pick(claims);
      return {
        prompt: `${claim.text}. True or false?`,
        correctLabel: claim.valid ? "True" : "False",
        distractorLabels: [claim.valid ? "False" : "True"],
        explanationSteps: [claim.valid
          ? "Reversing a vector reverses both components, so a there-and-back journey adds to zero, and a midpoint is reached by half the vector."
          : "Reversing a vector changes the signs — it does not swap the components, double the vector, or scale it up."],
        hints: ["BA is the reverse of AB, so BA = -AB. Travelling AB then BA returns you to the start."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^AB = \((.+?)\) means BA = \((.+?)\)$/, "AB = ($1) signifie que BA = ($2)")
          .replace(/^if AB = \((.+?)\) then AB \+ BA is the zero vector$/, "si AB = ($1) alors AB + BA est le vecteur nul")
          .replace(/^if AB = \((.+?)\) then AB \+ BA = \((.+?)\)$/, "si AB = ($1) alors AB + BA = ($2)")
          .replace(/^if M is the midpoint of AB then AM = ½AB$/, "si M est le milieu de AB alors AM = ½AB")
          .replace(/^if M is the midpoint of AB then AM = 2AB$/, "si M est le milieu de AB alors AM = 2AB");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Inverser un vecteur inverse ses deux composantes : un aller-retour donne donc le vecteur nul, et on atteint un milieu avec la moitié du vecteur."
            : "Inverser un vecteur change les signes — cela n'échange pas les composantes, ne double pas le vecteur et ne l'agrandit pas."],
          hints: ["BA est l'inverse de AB, donc BA = -AB. Parcourir AB puis BA te ramène au départ."]
        };
      }
    },
    declaredVariationSpace: 17 * 17 * 6
  }),
  arithmeticTemplate({
    key: "y10l8.vectorProofMidsegment", levelKey: "Y10L8", objectiveCode: "Y10-L8-3", difficulty: "REASONING",
    misconceptionTags: ["VECTOR_PROOF_ERROR"], type: "MULTI_STEP", pathway: "HIGHER",
    ranges: [[-18, 18], [-18, 18]], constraint: (v) => v[0]! % 2 === 0 && v[1]! % 2 === 0,
    compute: (v) => v[0]! / 2,
    promptTemplates: [
      "In triangle OAB, M is the midpoint of OA and N is the midpoint of OB. Given AB = ({a}, {b}), show MN is parallel to AB and state the x-component of MN.",
      "M and N are the midpoints of OA and OB in triangle OAB, and AB = ({a}, {b}). Using vectors, find the x-component of MN."
    ],
    explain: (v, r) => [
      `MN = ON - OM = ½OB - ½OA = ½(OB - OA) = ½AB.`,
      `Because MN is a scalar multiple of AB, MN is parallel to AB and half its length.`,
      `So MN = (${v[0]! / 2}, ${v[1]! / 2}) and its x-component is ${r}.`
    ],
    hints: () => ["Write OM and ON as halves of OA and OB, then subtract — the OA and OB terms factorise into ½AB."],
    fr: {
      promptTemplates: [
        "Dans le triangle OAB, M est le milieu de OA et N le milieu de OB. Sachant que AB = ({a}, {b}), montre que MN est parallèle à AB et donne la composante x de MN.",
        "M et N sont les milieux de OA et OB dans le triangle OAB, et AB = ({a}, {b}). En utilisant les vecteurs, trouve la composante x de MN."
      ],
      explain: (v, r) => [
        `MN = ON - OM = ½OB - ½OA = ½(OB - OA) = ½AB.`,
        `Comme MN est un multiple scalaire de AB, MN est parallèle à AB et moitié moins long.`,
        `Donc MN = (${v[0]! / 2}, ${v[1]! / 2}) et sa composante x est ${r}.`
      ],
      hints: () => ["Écris OM et ON comme les moitiés de OA et OB, puis soustrais — les termes OA et OB se factorisent en ½AB."]
    },
    declaredVariationSpace: 19 * 19 * 2
  }),
  categoricalPoolTemplate({
    key: "y10l8.mcVectorProofConclusion", levelKey: "Y10L8", objectiveCode: "Y10-L8-3", difficulty: "REASONING",
    misconceptionTags: ["VECTOR_PROOF_ERROR"], type: "MULTIPLE_CHOICE", pathway: "HIGHER",
    pools: { shape: ["XY", "PQ", "MN", "DE"] },
    build: (picked, rng) => {
      const k = rng.int(2, 6);
      const x = rng.int(1, 12);
      const y = rng.int(1, 12);
      const label = picked.shape!;
      const useFraction = rng.chance(0.5);
      const relation = useFraction ? `${label} = (1/${k})AB` : `${label} = ${k}AB`;
      const correct = useFraction
        ? `${label} is parallel to AB and ${k} times shorter`
        : `${label} is parallel to AB and ${k} times longer`;
      const wrong = [
        `${label} is perpendicular to AB`,
        `${label} is equal in length to AB but points the other way`,
        `${label} and AB cannot be compared from this information`
      ];
      return {
        prompt: `A vector proof ends with ${relation}, where AB = (${x}, ${y}). What does this tell you?`,
        correctLabel: correct,
        distractorLabels: wrong,
        explanationSteps: [`${relation} says ${label} is a scalar multiple of AB.`, `A scalar multiple always means parallel, with the scalar giving the length ratio.`],
        hints: ["If one vector is a number times another, the two are parallel and the number is the ratio of their lengths."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A vector proof ends with (.+?), where AB = \((.+?)\)\./);
        if (!m) return {};
        const label = drawn.correctLabel.split(" ")[0]!;
        const correctFr = drawn.correctLabel.includes("shorter")
          ? `${label} est parallèle à AB et ${drawn.correctLabel.replace(/\D+/g, "")} fois plus court`
          : `${label} est parallèle à AB et ${drawn.correctLabel.replace(/\D+/g, "")} fois plus long`;
        return {
          prompt: `Une démonstration vectorielle se termine par ${m[1]}, où AB = (${m[2]}). Qu'est-ce que cela t'apprend ?`,
          correctLabel: correctFr,
          distractorLabels: drawn.distractorLabels.map((d) => d
            .replace(/^(\w+) is perpendicular to AB$/, "$1 est perpendiculaire à AB")
            .replace(/^(\w+) is equal in length to AB but points the other way$/, "$1 a la même longueur que AB mais pointe dans l'autre sens")
            .replace(/^(\w+) and AB cannot be compared from this information$/, "$1 et AB ne peuvent pas être comparés avec ces informations")),
          explanationSteps: [`${m[1]} indique que ${label} est un multiple scalaire de AB.`, `Un multiple scalaire signifie toujours parallèle, et le scalaire donne le rapport des longueurs.`],
          hints: ["Si un vecteur est un nombre fois un autre, ils sont parallèles et le nombre est le rapport de leurs longueurs."]
        };
      }
    },
    declaredVariationSpace: 4 * 5 * 12 * 12 * 2
  })
];

export default level;
