# TikTok launch kit — Maths Journey UK

Everything needed to set up and run the account. The account itself has to be
created by a human at tiktok.com (phone/email verification, terms acceptance).

Every question quoted below is **real output from the question engine**, not
invented for the script — each one names the template key it came from, so you
can regenerate it or pull a different seed with:

```
# brand images (profile avatars, mascot exports)
npx tsx --tsconfig scripts/tsconfig.json scripts/export-brand-assets.ts

# video cards + scripts for any live level, straight from the question banks
npx tsx --tsconfig scripts/tsconfig.json scripts/tiktok-content.ts --level Y4L4 --count 3
```

There is also a `tiktok` subagent (`.claude/agents/tiktok.md`) that knows the
brand, the banks and the rules below — ask it for content rather than writing
questions by hand.

---

## 1. Account setup

| Field | Value |
| --- | --- |
| Handle | `@mathsjourney.co.uk` — live |
| Name | Maths Journey UK (**currently set to "math-master" — change this**) |
| Bio (80 char limit) | `Years 1–10 maths, National Curriculum 🦊 Free levels · EN/FR` |
| Link | `mathsjourney.co.uk` |
| Profile picture | `public/brand/avatar-wave-400.png` |
| Category | Education |

Alternative avatars are in `public/brand/`: `avatar-cheer-400.png`,
`avatar-trophy-400.png`, `avatar-think-400.png`. `wave` reads most clearly at
the ~40px TikTok renders it at; `trophy` is busier but works for a milestone
post. Transparent 1080×1080 mascots (`mascot-<mood>-1080.png`) are for
overlaying on video, and the `.svg` files are the vector originals.

**Display name.** TikTok's display name is the searchable, human-readable one
and is separate from the handle. It should read `Maths Journey UK`. Note the
spelling: "math" is American, and this is a product sold on being aligned to
the National Curriculum for England — a UK parent reads "math" as a signal the
product is not for them.

**Audience note.** TikTok's minimum age is 13, so nobody in the Year 1–6 range
is legally on the platform. Write for the parent or teacher who installs it,
not the child who uses it. That changes the framing of almost every script
below: the viewer is someone who wants to know what their child is expected to
cope with.

---

## 2. Video scripts

Format for all of these: vertical, question held on screen long enough to
pause, mascot in a corner, answer revealed after a beat. Nothing needs a
presenter on camera.

### 1. "Same numbers. Different answer." — the remainder trap
*Source: `y4l4.containersNeeded` and `y4l4.fullContainersFromTotal`, seed 42*

> **Hook (0–2s):** "Two Year 4 questions. Identical numbers. Different answers."
>
> **Body:** Show both, side by side, 3 seconds each:
> - *68 items are put into baskets holding 6 each. How many baskets are full?*
> - *68 items must all be packed into baskets of 6. How many baskets are needed?*
>
> **Payoff:** 11 and 12. "68 ÷ 6 = 11 remainder 2. The first question throws the
> remainder away. The second one needs a whole extra basket for it."
>
> **Close:** "This is the single most-missed idea in Year 4."

**Caption:** Why your child gets division 'wrong' when they got the division right. #year4 #ks2 #primarymaths #parenting

This is the strongest opener in the set — it is a genuine conceptual trap, not
a trick, and it gives parents a thing to notice rather than a thing to buy.

### 2. "Can you still do Year 6 mental maths?"
*Source: `y6l10.longMultiplication`, seed 42*

> **Hook:** "Year 6 is expected to do this without a calculator."
>
> **Body:** *50 boxes each hold 6050 badges. How many is that in total?*
> Three-second countdown on screen.
>
> **Payoff:** 302,500. Show the working: 6050 × 5 = 30,250, then ×10.

**Caption:** Be honest — how long did that take you? #sats #year6 #maths

### 3. The reverse percentage that catches adults out
*Source: `y10l10.reversePercentage`, seed 3*

> **Hook:** "Almost everyone gets this wrong on the first go."
>
> **Body:** *After a 2% increase, a price is £3,774. What was the original price?*
>
> **Payoff:** Not £3,698.52. The answer is **£3,700**. "Taking 2% off the new
> price isn't the same as undoing a 2% rise. You divide by 1.02, you don't
> subtract."

**Caption:** The percentage mistake that costs people money in real life. #gcse #maths #moneytips

Strongest candidate for reaching beyond the parent audience — reverse
percentages are a genuine adult-life numeracy gap.

### 4. Scale factor: the cube that surprises people
*Source: `y8l3.volumeRatioFromLengthRatio`, seed 3*

> **Hook:** "Make a cube 9 times bigger. What happens to the volume?"
>
> **Body:** Let the guesses land. Show "×9?" then cross it out.
>
> **Payoff:** **729 times bigger.** 9³. "Lengths scale by k, areas by k², volumes
> by k³. This is why a cake twice the width feeds eight people, not two."

**Caption:** Year 8 geometry that explains your recipe scaling problems. #year8 #ks3 #maths

### 5. Five exact values you should never need a calculator for
*Source: `y10l7.mcExactTrigValue`, seeds 3 and 11*

> **Hook:** "Your calculator is banned. What is cos 60°?"
>
> **Body:** Hold for 3 seconds. Reveal ½. Then run through sin 30° = ½,
> tan 45° = 1, cos 45° = √2/2, sin 60° = √3/2.
>
> **Payoff:** Draw the 30-60-90 triangle (1, 2, √3) and show all five being
> read straight off it. "You don't memorise five facts. You memorise one triangle."

**Caption:** GCSE exact values without the memorising. #gcsemaths #revision #trigonometry

### 6. The circle theorem in one sentence
*Source: `y9l8.angleAtCentre`, seed 42*

> **Hook:** "One rule, and half the circle theorem questions fall over."
>
> **Body:** *An inscribed angle measures 106°. What does the central angle on the
> same arc measure?*
>
> **Payoff:** 212°. "The angle at the centre is always twice the angle at the
> circumference, standing on the same arc. That's it."

**Caption:** Year 9 circle theorems, shortest possible version. #gcse #maths #revision

### 7. Both languages, same maths
*Source: `y4l4.fullContainersFromTotal`, seed 42, EN and FR*

> **Hook:** "The same maths question in two languages."
>
> **Body:** Show them stacked:
> - *68 items are put into baskets holding 6 each. How many baskets are full?*
> - *68 objets sont rangés dans des paniers de 6 places. Combien de paniers peut-on remplir entièrement ?*
>
> **Payoff:** "Same answer: 11. Every level in the app is written twice, in
> English and in French — not machine-translated, written."

**Caption:** For bilingual households and French immersion schools. #bilingual #frenchimmersion #maths

The differentiator nobody else in UK primary maths apps has. Worth posting
early even if it performs modestly — it is the one that gets saved and shared
into specific communities.

### 8. "Where does it actually start?"
*Source: `y1l5.bondsTo10FromAddition`, seed 3, through to `y10l1.upperBound`, seed 3*

> **Hook:** "Year 1 to Year 10, in fifteen seconds."
>
> **Body:** Fast cuts, one second each, counting the year up in the corner:
> - Y1: *What number bonds with 7 to make 10?* → 3
> - Y4: *68 items in baskets of 6 — how many baskets are needed?* → 12
> - Y6: *50 boxes of 6,050 badges* → 302,500
> - Y9: *Inscribed angle 106°, what is the central angle?* → 212°
> - Y10: *363 cm to the nearest cm — what is the upper bound?* → 363.5
>
> **Payoff:** "One app. Ten years. Same journey."

**Caption:** The whole National Curriculum, one level at a time. #homeschool #primarymaths #gcse

Best pinned video once there are three or four others live.

---

## 3. Practical notes

- **Order to post:** 1, 3, 2, 5, 4, 6, 8, 7. Lead with the two that work on
  people who have never heard of the app (the remainder trap and the reverse
  percentage), not with the app tour.
- **Cadence:** three a week is enough. The scripts above are five weeks of
  content; the question banks can generate indefinitely more.
- **Do not** put a child's face or voice in any of this. Mascot, text on
  screen, and a voiceover is the whole format, and it sidesteps every
  safeguarding and consent question.
- **Comments** are the real content engine. "Do a Year 3 one" is a video.
  People arguing about the answer to #1 is the best thing that can happen.
- The `why:` explanation steps shipped with every template are already written
  in child-facing language — they make good on-screen working with no rewriting.
