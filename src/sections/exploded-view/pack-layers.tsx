import { buildZigzag, FRAME, MOUNTING_DOTS, VIEWBOX } from "./pack-geometry";

/**
 * pack-layers — the six real assembly layers of the flagship pack, drawn
 * schematically (same visual language as `BatteryGlyph`: ion-blue linework,
 * graphite fills, the real cooling-channel and mounting-point geometry) so
 * they can be exploded and reassembled independently under scroll control.
 *
 * Order here is bottom-to-top of the real assembly (tray first, top cover
 * last) — Chapter 2 renders them in this order so DOM stacking matches the
 * physical stacking when compressed.
 */

const glowFilter = (id: string) => (
  <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="3" result="blur" />
    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

function FrameOutline({ opacity = 1 }: { opacity?: number }) {
  return (
    <rect
      x={FRAME.x}
      y={FRAME.y}
      width={FRAME.width}
      height={FRAME.height}
      rx={FRAME.rx}
      fill="none"
      stroke="var(--palette-ion)"
      strokeOpacity={opacity}
      strokeWidth={1.5}
    />
  );
}

type LayerProps = { className?: string };

/** 1 — Extruded aluminium tray: outer frame + the real 22 mounting points. */
export function TrayLayer({ className }: LayerProps) {
  return (
    <svg viewBox={VIEWBOX} className={className} aria-hidden="true">
      <rect
        x={FRAME.x}
        y={FRAME.y}
        width={FRAME.width}
        height={FRAME.height}
        rx={FRAME.rx}
        fill="var(--palette-graphite)"
        stroke="var(--palette-ion)"
        strokeOpacity={0.5}
        strokeWidth={2}
      />
      <g fill="var(--palette-ion-light)" opacity={0.9}>
        {MOUNTING_DOTS.map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r={3.5} />
        ))}
      </g>
    </svg>
  );
}

/** 2 — Liquid cooling plate: dense full-width serpentine channel pattern. */
export function CoolingPlateLayer({ className }: LayerProps) {
  const rows = [110, 160, 210, 260, 310, 360, 410, 460, 510];
  return (
    <svg viewBox={VIEWBOX} className={className} aria-hidden="true">
      <defs>{glowFilter("cooling-glow")}</defs>
      <rect
        x={FRAME.x + 16}
        y={FRAME.y + 16}
        width={FRAME.width - 32}
        height={FRAME.height - 32}
        rx={FRAME.rx - 6}
        fill="var(--palette-graphite-light)"
        opacity={0.5}
      />
      <g
        fill="none"
        stroke="var(--palette-ion-light)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cooling-glow)"
        opacity={0.8}
      >
        {rows.map((y, i) => (
          <path
            key={y}
            d={buildZigzag(
              FRAME.x + 30,
              FRAME.x + FRAME.width - 30,
              y,
              14,
              i % 2 === 0 ? 16 : 14,
            )}
          />
        ))}
      </g>
    </svg>
  );
}

/** 3 — BDU + BMS-L1.1 assembly: front-mounted module, one master / one slave. */
export function BduBmsLayer({ className }: LayerProps) {
  const boxX = FRAME.x + 40;
  const boxY = FRAME.y + FRAME.height / 2 - 50;
  return (
    <svg viewBox={VIEWBOX} className={className} aria-hidden="true">
      <rect
        x={boxX}
        y={boxY}
        width={220}
        height={100}
        rx={10}
        fill="var(--palette-graphite)"
        stroke="var(--palette-ion)"
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={boxX + 14 + i * 50}
          y={boxY + 20}
          width={36}
          height={60}
          rx={4}
          fill="var(--palette-graphite-light)"
          stroke="var(--palette-ion-light)"
          strokeOpacity={0.5}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}

/** 4 — Four CIR cell blocks, direct cell-to-pack (no module), 1P116S total. */
export function CellBlocksLayer({ className }: LayerProps) {
  const blockWidth = (FRAME.width - 60) / 4;
  const blockY = FRAME.y + 20;
  const blockHeight = FRAME.height - 40;
  const cellsPerRow = 3;
  const cellRows = 10;

  return (
    <svg viewBox={VIEWBOX} className={className} aria-hidden="true">
      {[0, 1, 2, 3].map((block) => {
        const bx = FRAME.x + 20 + block * (blockWidth + 6);
        return (
          <g key={block}>
            <rect
              x={bx}
              y={blockY}
              width={blockWidth}
              height={blockHeight}
              rx={8}
              fill="var(--palette-graphite)"
              stroke="var(--palette-ion)"
              strokeOpacity={0.45}
              strokeWidth={1.5}
            />
            {Array.from({ length: cellRows }).map((_, row) =>
              Array.from({ length: cellsPerRow }).map((_, col) => {
                const pad = 8;
                const cw = (blockWidth - pad * 2) / cellsPerRow;
                const ch = (blockHeight - pad * 2) / cellRows;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={bx + pad + col * cw + 1.5}
                    y={blockY + pad + row * ch + 1.5}
                    width={cw - 3}
                    height={ch - 3}
                    rx={1.5}
                    fill="var(--palette-navy)"
                    stroke="var(--palette-ion-light)"
                    strokeOpacity={0.35}
                    strokeWidth={0.75}
                  />
                );
              }),
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** 5 — CCS + busbars: AL1060 connectors, laser-welded, series-linking the four blocks. */
export function BusbarsLayer({ className }: LayerProps) {
  const y = FRAME.y + FRAME.height / 2;
  const blockWidth = (FRAME.width - 60) / 4;

  return (
    <svg viewBox={VIEWBOX} className={className} aria-hidden="true">
      <defs>{glowFilter("busbar-glow")}</defs>
      <line
        x1={FRAME.x + 20}
        y1={y}
        x2={FRAME.x + FRAME.width - 20}
        y2={y}
        stroke="var(--palette-copper)"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.85}
        filter="url(#busbar-glow)"
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const cx = FRAME.x + 20 + i * blockWidth;
        return (
          <circle
            key={i}
            cx={cx}
            cy={y}
            r={7}
            fill="var(--palette-copper)"
            stroke="var(--palette-ion-light)"
            strokeWidth={1}
          />
        );
      })}
    </svg>
  );
}

/** 6 — Top cover: DC06 steel, electrophoretic coating, cooling-channel ribbing. */
export function TopCoverLayer({ className }: LayerProps) {
  return (
    <svg viewBox={VIEWBOX} className={className} aria-hidden="true">
      <defs>{glowFilter("topcover-glow")}</defs>
      <rect
        x={FRAME.x}
        y={FRAME.y}
        width={FRAME.width}
        height={FRAME.height}
        rx={FRAME.rx}
        fill="var(--palette-graphite-light)"
        stroke="var(--palette-ion-light)"
        strokeWidth={2}
      />
      <FrameOutline opacity={0.25} />
      <line
        x1={430}
        y1={FRAME.y + 10}
        x2={430}
        y2={FRAME.y + FRAME.height - 10}
        stroke="var(--palette-ion)"
        strokeOpacity={0.3}
        strokeWidth={1.5}
      />
      <g
        fill="none"
        stroke="var(--palette-ion-light)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#topcover-glow)"
        opacity={0.85}
      >
        {[140, 190, 240].map((y) => (
          <path key={y} d={buildZigzag(FRAME.x + 40, 420, y, 22, 8)} />
        ))}
        {[364, 414, 464].map((y) => (
          <path key={y} d={buildZigzag(440, FRAME.x + FRAME.width - 40, y, 22, 8)} />
        ))}
      </g>
    </svg>
  );
}
