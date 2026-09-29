import ReadAloudButton from "./ReadAloudButton";
import { useT } from "./I18nProvider";

export interface WrongAnswerSupportView {
  encouragement: string;
  misconceptionLabel: string | null;
  stepExplanation: string[];
  hint: string;
  isSecondWrongAttempt: boolean;
  scaffoldToEasier: boolean;
}

/** The "wrong-answer explanation" screen (spec §4 / required screen #13):
 * never says "wrong" — responds positively, names the likely misconception,
 * re-explains step by step, and offers a hint before the child tries a
 * similar follow-up question. */
export default function WrongAnswerCard({ support }: { support: WrongAnswerSupportView }) {
  const t = useT();
  return (
    <div className="rounded-xl2 border-2 border-sunny-400 bg-sunny-50 p-5" role="status" data-testid="wrong-answer-card">
      <p className="text-lg font-bold text-amber-800">{support.encouragement}</p>

      {support.misconceptionLabel && (
        <p className="mt-2 text-sm text-amber-700">
          {t("wrongAnswerCard.misconceptionIntro")} <strong>{support.misconceptionLabel}</strong>
        </p>
      )}

      <div className="mt-3">
        <p className="text-sm font-semibold text-amber-800">{t("wrongAnswerCard.stepByStep")}</p>
        <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {support.stepExplanation.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <p className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-700">
        💡 <strong>{t("wrongAnswerCard.hintLabel")}</strong> {support.hint}
      </p>

      {support.scaffoldToEasier && <p className="mt-3 text-sm text-amber-800">{t("wrongAnswerCard.scaffoldEasier")}</p>}

      <div className="mt-3">
        <ReadAloudButton text={`${support.encouragement} ${support.stepExplanation.join(". ")}. ${t("wrongAnswerCard.hintLabel")} ${support.hint}`} />
      </div>
    </div>
  );
}
