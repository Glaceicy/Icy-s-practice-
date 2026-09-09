import { registerTemplates } from "../registry";
import y1l1 from "./year1/level1";
import y1l2 from "./year1/level2";
import y1l10 from "./year1/level10";
import y4l1 from "./year4/level1";
import y5l1 from "./year5/level1";
import y5l2 from "./year5/level2";
import y5l3 from "./year5/level3";
import y5l4 from "./year5/level4";
import y5l5 from "./year5/level5";
import y5l6 from "./year5/level6";
import y5l7 from "./year5/level7";
import y5l8 from "./year5/level8";
import y5l9 from "./year5/level9";
import y5l10 from "./year5/level10";
import y2l1 from "./year2/level1";
import y2l2 from "./year2/level2";
import y2l3 from "./year2/level3";
import y2l4 from "./year2/level4";
import y3l1 from "./year3/level1";
import y6l1 from "./year6/level1";
import y7l1 from "./year7/level1";
import y8l1 from "./year8/level1";
import y9l1 from "./year9/level1";
import y10l1 from "./year10/level1";

// Levels with a fully authored, validated question bank (>=15 templates,
// each verified to reach >=150 distinct valid variations — Year 1 Levels 1,
// 2 and 10 meet the full >=30-template bar). Every other level in the
// curriculum has complete metadata/objectives (src/lib/curriculum) but no
// registered templates yet, so the app must never offer practice/mastery for
// them — see levelHasQuestionBank() in ../registry and DOCUMENTATION.md.
let loaded = false;

export function loadAllTemplates(): void {
  if (loaded) return;
  registerTemplates("Y1L1", y1l1);
  registerTemplates("Y1L2", y1l2);
  registerTemplates("Y1L10", y1l10);
  registerTemplates("Y4L1", y4l1);
  registerTemplates("Y5L1", y5l1);
  registerTemplates("Y5L2", y5l2);
  registerTemplates("Y5L3", y5l3);
  registerTemplates("Y5L4", y5l4);
  registerTemplates("Y5L5", y5l5);
  registerTemplates("Y5L6", y5l6);
  registerTemplates("Y5L7", y5l7);
  registerTemplates("Y5L8", y5l8);
  registerTemplates("Y5L9", y5l9);
  registerTemplates("Y5L10", y5l10);
  registerTemplates("Y2L1", y2l1);
  registerTemplates("Y2L2", y2l2);
  registerTemplates("Y2L3", y2l3);
  registerTemplates("Y2L4", y2l4);
  registerTemplates("Y3L1", y3l1);
  registerTemplates("Y6L1", y6l1);
  registerTemplates("Y7L1", y7l1);
  registerTemplates("Y8L1", y8l1);
  registerTemplates("Y9L1", y9l1);
  registerTemplates("Y10L1", y10l1);
  loaded = true;
}

export const COMPLETE_LEVEL_KEYS = ["Y1L1", "Y1L2", "Y1L10", "Y2L1", "Y2L2", "Y2L3", "Y2L4", "Y3L1", "Y4L1", "Y5L1", "Y5L2", "Y5L3", "Y5L4", "Y5L5", "Y5L6", "Y5L7", "Y5L8", "Y5L9", "Y5L10", "Y6L1", "Y7L1", "Y8L1", "Y9L1", "Y10L1"] as const;
