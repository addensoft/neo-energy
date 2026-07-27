/**
 * pack-geometry — shared schematic geometry for Chapter 2's exploded layers.
 *
 * Deliberately an independent copy of the constants in
 * `components/battery/battery-glyph.tsx` (same viewBox, same FRAME box, same
 * zigzag/dot helpers) rather than an import from it — Chapter 1's approved,
 * frozen code must not be touched. Both trace back to the same real pack
 * envelope (1878 × 1320mm ≈ 1.42:1) and the same 22-mounting-point spec, so
 * every layer here stays geometrically consistent with the flagship battery
 * established in Hero and Chapter 1, without depending on their files.
 */

export const VIEWBOX = "0 0 860 604";

export const FRAME = { x: 40, y: 40, width: 780, height: 524, rx: 22 };

export function buildZigzag(
  startX: number,
  endX: number,
  y: number,
  amplitude: number,
  teeth: number,
) {
  const step = (endX - startX) / teeth;
  let d = `M ${startX} ${y}`;
  for (let i = 1; i <= teeth; i++) {
    const x = startX + step * i;
    const yOffset = i % 2 === 0 ? 0 : amplitude;
    d += ` L ${x} ${y - yOffset}`;
  }
  return d;
}

/** The pack's real 22 mounting points: 4 front / 12 side / 2 rear / 4 centre. */
export const MOUNTING_DOTS = (() => {
  const dots: Array<{ cx: number; cy: number }> = [];
  [140, 250, 350, 460].forEach((cy) => dots.push({ cx: FRAME.x, cy }));
  [220, 380].forEach((cy) => dots.push({ cx: FRAME.x + FRAME.width, cy }));
  [140, 260, 380, 500, 620, 700].forEach((cx) => {
    dots.push({ cx, cy: FRAME.y });
    dots.push({ cx, cy: FRAME.y + FRAME.height });
  });
  [
    { cx: 350, cy: 260 },
    { cx: 470, cy: 260 },
    { cx: 350, cy: 344 },
    { cx: 470, cy: 344 },
  ].forEach((d) => dots.push(d));
  return dots;
})();
