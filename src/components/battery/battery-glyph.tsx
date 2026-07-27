/**
 * BatteryGlyph — the one flagship battery asset, per Creative Direction §14
 * (Master Product Strategy): every appearance of the battery across the page
 * — Hero, The Object, and eventually the exploded view, cooling/cell/BMS
 * macro shots, repair footage, and the closing CTA — must trace back to the
 * same object, not a fresh render per chapter. This SVG is that shared asset,
 * a Sprint-era stand-in built directly from the supplied engineering dossier
 * rather than invented artwork:
 *  - Frame proportions match the real envelope (1878 × 1320mm ≈ 1.42:1).
 *  - The diagonal serpentine pattern traces the liquid-cooling plate's channel
 *    layout from the exploded-assembly diagram.
 *  - The 22 edge dots match the spec exactly: 4 front / 12 side / 2 rear / 4 centre.
 *  - The centre seam matches the pack's real 1P116S split into two CIR halves.
 *
 * Replace the SVG body with the final 3D render/film frame in the sprint that
 * produces it — the surrounding component contract (props, sizing) can stay,
 * and every chapter importing it updates for free.
 */

function buildZigzag(
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

const FRAME = { x: 40, y: 40, width: 780, height: 524, rx: 22 };
const CHANNEL_ROWS_TOP = [140, 190, 240];
const CHANNEL_ROWS_BOTTOM = [364, 414, 464];

const edgeDots = (() => {
  const dots: Array<{ cx: number; cy: number }> = [];
  // 4 front (left edge)
  [140, 250, 350, 460].forEach((cy) => dots.push({ cx: FRAME.x, cy }));
  // 2 rear (right edge)
  [220, 380].forEach((cy) => dots.push({ cx: FRAME.x + FRAME.width, cy }));
  // 12 side (top/bottom edges)
  [140, 260, 380, 500, 620, 700].forEach((cx) => {
    dots.push({ cx, cy: FRAME.y });
    dots.push({ cx, cy: FRAME.y + FRAME.height });
  });
  // 4 centre
  [
    { cx: 350, cy: 260 },
    { cx: 470, cy: 260 },
    { cx: 350, cy: 344 },
    { cx: 470, cy: 344 },
  ].forEach((d) => dots.push(d));
  return dots;
})();

export function BatteryGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 860 604" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="frame-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--palette-ion-light)" />
          <stop offset="100%" stopColor="var(--palette-ion)" />
        </linearGradient>
        <linearGradient id="panel-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--palette-graphite-light)" />
          <stop offset="100%" stopColor="var(--palette-graphite)" />
        </linearGradient>
        <filter id="channel-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={FRAME.x}
        y={FRAME.y}
        width={FRAME.width}
        height={FRAME.height}
        rx={FRAME.rx}
        fill="url(#panel-fill)"
        stroke="url(#frame-stroke)"
        strokeWidth={2}
      />
      <rect
        x={FRAME.x + 10}
        y={FRAME.y + 10}
        width={FRAME.width - 20}
        height={FRAME.height - 20}
        rx={FRAME.rx - 8}
        fill="none"
        stroke="var(--palette-ion)"
        strokeOpacity={0.25}
        strokeWidth={1}
      />

      {/* Centre seam — the pack's real two-half CIR split */}
      <line
        x1={430}
        y1={FRAME.y + 10}
        x2={430}
        y2={FRAME.y + FRAME.height - 10}
        stroke="var(--palette-ion)"
        strokeOpacity={0.3}
        strokeWidth={1.5}
      />

      {/* Cooling-plate serpentine channels, traced from the exploded-view diagram */}
      <g
        fill="none"
        stroke="var(--palette-ion-light)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#channel-glow)"
        opacity={0.85}
      >
        {CHANNEL_ROWS_TOP.map((y) => (
          <path key={y} d={buildZigzag(FRAME.x + 40, 420, y, 22, 8)} />
        ))}
        {CHANNEL_ROWS_BOTTOM.map((y) => (
          <path key={y} d={buildZigzag(440, FRAME.x + FRAME.width - 40, y, 22, 8)} />
        ))}
      </g>

      {/* 22 mounting points — 4 front / 12 side / 2 rear / 4 centre, per spec */}
      <g fill="var(--palette-ion-light)" opacity={0.9}>
        {edgeDots.map((dot, index) => (
          <circle key={index} cx={dot.cx} cy={dot.cy} r={3.5} />
        ))}
      </g>
    </svg>
  );
}
