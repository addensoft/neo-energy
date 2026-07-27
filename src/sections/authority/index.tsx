"use client";

import { BatteryFull, Building2, Globe, Handshake, Timer } from "lucide-react";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Container } from "@/components/ui";

import { StatItem } from "./stat-item";
import { useAuthorityReveal } from "./use-authority-reveal";

const STATS = [
  { icon: BatteryFull, value: "77.9 kWh", label: "High Performance Battery System" },
  { icon: Timer, value: "15 min", label: "30–80% SOC Fast Charge" },
  { icon: Handshake, value: "2 of Top 3", label: "Global Battery Technology Partners" },
  { icon: Building2, value: "100+", label: "Corporate & Fleet Clients" },
  { icon: Globe, value: "Global", label: "Service & Support Network" },
] as const;

/**
 * Authority — the full-width statistics bar, sitting immediately below Why
 * Choose NEO ENERGY (this is the "Trust & Key Statistics" chapter reserved
 * in the site-config registry since Sprint 1). A slim bar, not a
 * full-viewport chapter — same `min-h-0` override the Trust & Technology
 * Bar uses.
 */
export function Authority() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useAuthorityReveal(sectionRef, statsRef);

  return (
    <Section
      id="authority"
      ref={sectionRef}
      className="border-border bg-void relative min-h-0 justify-center border-t py-2"
    >
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute inset-x-0 bottom-0 h-32 blur-[80px]"
      />

      <Container className="divide-border relative z-10 flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0">
        {STATS.map((stat, index) => (
          <StatItem
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            innerRef={(el) => {
              if (el) statsRef.current[index] = el;
            }}
          />
        ))}
      </Container>
    </Section>
  );
}
