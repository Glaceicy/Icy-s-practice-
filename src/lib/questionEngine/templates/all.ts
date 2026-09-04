import { registerTemplates } from "../registry";
import y1l1 from "./year1/level1";
import y1l2 from "./year1/level2";
import y1l10 from "./year1/level10";
import y4l1 from "./year4/level1";
import y5l1 from "./year5/level1";
import y5l2 from "./year5/level2";
import y5l3 from "./year5/level3";
import y7l1 from "./year7/level1";
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
  registerTemplates("Y7L1", y7l1);
  registerTemplates("Y10L1", y10l1);
  loaded = true;
}

export const COMPLETE_LEVEL_KEYS = ["Y1L1", "Y1L2", "Y1L10", "Y4L1", "Y5L1", "Y5L2", "Y5L3", "Y7L1", "Y10L1"] as const;
