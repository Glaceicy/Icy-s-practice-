export type MascotMood = "wave" | "cheer" | "trophy" | "think";

const BODY = "#ffcb47";
const EAR = "#ffb800";
const LINE = "#0c5391";

/** A small friendly fox mascot used as decoration on key screens (level
 * overview, session completion, results). Purely decorative — always
 * aria-hidden, with the surrounding text carrying the actual meaning. */
export default function Mascot({ mood = "wave", className = "h-24 w-24" }: { mood?: MascotMood; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      {mood === "cheer" && (
        <>
          <path d="M18 82 Q6 58 20 44" stroke={EAR} strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M102 82 Q114 58 100 44" stroke={EAR} strokeWidth="10" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === "wave" && <path d="M96 78 Q114 70 110 50 Q107 62 94 66 Z" fill={EAR} />}

      {/* ears */}
      <path d="M26 42 L18 12 L48 32 Z" fill={EAR} />
      <path d="M94 42 L102 12 L72 32 Z" fill={EAR} />
      <path d="M30 38 L26 22 L42 32 Z" fill="#fff" />
      <path d="M90 38 L94 22 L78 32 Z" fill="#fff" />

      {/* head */}
      <circle cx="60" cy="66" r="40" fill={BODY} />
      <ellipse cx="60" cy="76" rx="25" ry="19" fill="#fff" />

      {/* eyes */}
      {mood === "think" ? (
        <>
          <circle cx="49" cy="70" r="3.5" fill={LINE} />
          <circle cx="71" cy="70" r="3.5" fill={LINE} />
        </>
      ) : (
        <>
          <path d="M43 68 Q49 60 55 68" stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M65 68 Q71 60 77 68" stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* nose + mouth */}
      <ellipse cx="60" cy="82" rx="5" ry="3.5" fill={LINE} />
      <path d="M51 86 Q60 93 69 86" stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" />

      {mood === "trophy" && (
        <text x="60" y="36" fontSize="30" textAnchor="middle">
          🏆
        </text>
      )}
      {mood === "cheer" && (
        <>
          <text x="10" y="34" fontSize="16">
            ✨
          </text>
          <text x="98" y="30" fontSize="16">
            ✨
          </text>
        </>
      )}
      {mood === "think" && (
        <>
          <circle cx="94" cy="28" r="6" fill="#fff" stroke="#83d1ff" strokeWidth="2" />
          <circle cx="102" cy="14" r="9" fill="#fff" stroke="#83d1ff" strokeWidth="2" />
          <text x="102" y="19" fontSize="11" textAnchor="middle" fill={LINE}>
            ?
          </text>
        </>
      )}
    </svg>
  );
}
