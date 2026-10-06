# Maths Journey UK — live-action ad, production pack

Everything needed to shoot or generate the 45-second ad with a real child in
it, except the footage of the child itself.

The animated cut already rendered (`out/ad/maths-journey-45s-9x16.mp4`) is not
a replacement for that footage — treat it as the animatic. It fixes the timing,
the captions and the end card, so the live-action edit has something exact to
cut against.

## What is in the box

| Asset | Where | What it is |
|---|---|---|
| Animatic, 45s and 15s | `out/ad/*.mp4` | timing reference, and a social cut usable as-is |
| App screen overlays | `out/ad/screens/*.webm` | VP9 with alpha — the real app, to composite onto the tablet in shot |
| Overlay frames | `out/ad/screens/<scene>/` | the same clips as PNG sequences, for editors who prefer frames |
| Timing sheet | `out/ad/timing-sheet-45s.md` | voiceover lines and music cue points |
| Mascot and avatars | `public/brand/` | SVG and PNG, for the end card |

Regenerate any of it with:

```bash
npx tsx --tsconfig scripts/tsconfig.json scripts/build-ad-video.ts --screens
```

## Shot list

Durations are from the animatic, so a cut assembled to these numbers will match
it frame for frame.

| # | Time | Age | Setting | Action | Overlay to composite |
|---|---|---|---|---|---|
| 1 | 0:00–0:08 | 5 | bright table, morning light | small hands stacking wooden blocks; a parent's finger points along as the child counts; tablet leaning against a cup; the child grins at the right answer | `age5-y1l1.webm` |
| 2 | 0:08–0:18 | 8 | living room, afternoon sun | child races a times-tables challenge, pencil tapping; jumps up and high-fives a sibling | `age8-y4l3.webm` |
| 3 | 0:18–0:28 | 11 | kitchen table, homework out | child frowns at fractions, taps for a hint, then the penny drops; a parent leans in and smiles | `age11-y6l3.webm` |
| 4 | 0:28–0:38 | 15 | bedroom desk, revision timetable on the wall | teenager works steadily beside a GCSE past paper; slow push-in on a calm face | `age15-y10l10.webm` |
| 5 | 0:38–0:45 | — | — | quick cuts of the same child at 5, 8, 11, 15, each with a hand on the tablet; then the climb and the end card | use the animatic's closing 7 seconds directly |

The last shot's progress path and end card are already finished in the
animatic. There is no reason to recreate them — cut straight to that footage.

## The questions on screen are real

Each overlay shows a question generated from the live question bank at a
recorded seed, so any frame can be regenerated and checked against the app.

| Age | On screen | Answer | Template · seed |
|---|---|---|---|
| 5 | "There are 9 stars. One more arrives. How many stars now?" | 10 | `y1l1.oneMoreThan` · 77 |
| 8 | "How much is 8 lots of 9?" | 72 | `y4l3.timesTableFact` · 61 |
| 11 | "A tray holds 42 chocolate bars. 2/6 of them are used. How many are used?" | 14 | `y6l3.fractionOfQuantity` · 0 |
| 15 | "A car park is a rectangle 5 m by 12 m. How far is it diagonally from one corner to the opposite corner, in m?" | 13 | `y10l10.pythagorasMixed` · 0 |

The product's claim is that its questions are validated. An advert using
invented ones would be the one place that claim was untrue.

## Compositing the overlays

The clips are 1200 × 1600 (3:4, a tablet held in portrait) on a transparent
background.

1. Shoot or generate the tablet **switched off**, or showing a flat neutral
   screen. A real screen in shot will flicker against the camera's shutter and
   fight whatever you lay over it.
2. Corner-pin the overlay to the four corners of the tablet's screen in the
   footage (After Effects: Corner Pin; DaVinci: Corner Pin; Premiere: Corner
   Pin). Track it if the camera moves.
3. Add a touch of screen glare and a slight blur to match the lens, then bring
   the overlay down to about 90% so it sits in the scene rather than on top
   of it.
4. The overlay's timing already matches the animatic, so line its first frame
   up with the shot's first frame and the beats land where they should.

VP9 alpha is reported oddly by some tools — `ffprobe` shows `pix_fmt=yuv420p`
because the alpha rides in a side channel. The tag that matters is
`alpha_mode=1`, and every clip has it. If an editor refuses the WebM, use the
PNG sequence in the matching folder instead; it carries the same alpha.

## Prompts for an AI video generator

One per shot. Keep the character description **identical** across all four so
the same child reads through the ages, and keep the bracelet — a repeated
detail is what sells four actors as one person.

> **Shot 1 — age 5.** Cinematic advert footage, warm natural morning light,
> shallow depth of field, gentle handheld movement. A five-year-old girl with
> shoulder-length dark curly hair and a thin yellow friendship bracelet on her
> left wrist sits at a bright wooden table, stacking small wooden blocks. An
> adult's hand enters frame and points along the row as she counts. A tablet
> leans against a mug beside her, screen neutral and unlit. She looks up and
> grins. No text, no logos, no on-screen graphics.

> **Shot 2 — age 8.** Cinematic advert footage, warm afternoon sunlight
> through a living-room window, shallow depth of field, gentle handheld. The
> same girl, now eight, same dark curly hair and yellow bracelet on her left
> wrist, sits cross-legged on a sofa with a tablet on her lap, tapping a pencil
> against her knee in concentration. She suddenly jumps up and high-fives an
> older sibling off to one side. Tablet screen neutral and unlit. No text, no
> logos, no on-screen graphics.

> **Shot 3 — age 11.** Cinematic advert footage, soft late-afternoon kitchen
> light, shallow depth of field, slow handheld drift. The same girl, now
> eleven, same dark curly hair and yellow bracelet, sits at a kitchen table
> with homework spread out and a tablet propped in front of her. She frowns,
> reaches out and taps the screen once, pauses, then her face clears into
> understanding. A parent leans into frame behind her and smiles. Tablet screen
> neutral and unlit. No text, no logos, no on-screen graphics.

> **Shot 4 — age 15.** Cinematic advert footage, cool evening light from a
> desk lamp, shallow depth of field, very slow push-in. The same girl, now
> fifteen, same dark curly hair and yellow bracelet, works at a tidy bedroom
> desk with a revision timetable pinned to the wall behind her and a past exam
> paper beside a tablet. She writes steadily, calm and focused, and glances up.
> Tablet screen neutral and unlit. No text, no logos, no on-screen graphics.

> **Shot 5 — the montage.** Four very short clips, each a head-and-shoulders
> framing of the same girl at five, eight, eleven and fifteen, each with one
> hand resting on a tablet, each looking directly at the camera and smiling
> slightly. Identical warm key light and neutral background across all four.
> No text, no logos.

Add to every prompt, if the tool takes a negative prompt: *no text, no
watermarks, no logos, no on-screen interface, no distorted hands, no extra
fingers.*

**Expect refusals.** Several video generators decline to produce realistic
children, or restrict it behind a verified-business account. Check your tool's
policy before planning the shoot around it — this is the most likely reason
this route stalls, and it is better to find out now than after the brief is
signed off.

## Before anyone films a real child

Not legal advice, but these are the things that catch adverts out, and two of
them have to be sorted before the shoot rather than after.

- **Child performance licence.** In England, a child taking part in a paid
  advertisement normally needs a licence from the council for the area the
  child lives in, applied for by the production, with its own lead time. A
  registered chaperone is usually required too, and there are limits on hours
  and breaks by age. Apply early; councils are not quick.
- **Consent and release.** Written parental consent and an image release
  covering the shoot and the advert, in every territory and medium you intend
  to run it, including paid social. Get it signed on the day.
- **Claims.** The UK advertising code expects claims about educational
  outcomes to be evidenced. "All the way to GCSE" is supportable — the app has
  100 levels ending in GCSE-style Foundation and Higher content. "Leads to a
  successful life" is not, which is why the animatic's voiceover ends at GCSE
  and lets the end card carry the feeling.
- **Advertising to children.** Rules are tighter where an ad is directed at
  under-16s. This one is aimed at parents, with children in it. Keep the
  call to action pointed at the adult.

## Voiceover and music

Both are in `out/ad/timing-sheet-45s.md`. The video renders silent on purpose:
the on-screen captions carry the whole message, because most of this will be
watched with the sound off, and library music needs a licence covering paid
social that has to be bought rather than rendered.
