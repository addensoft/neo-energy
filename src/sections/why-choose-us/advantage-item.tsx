"use client";

import { CheckCircle2 } from "lucide-react";

type AdvantageItemProps = {
  text: string;
  innerRef: (el: HTMLLIElement | null) => void;
};

export function AdvantageItem({ text, innerRef }: AdvantageItemProps) {
  return (
    <li ref={innerRef} className="flex items-start gap-3">
      <CheckCircle2 className="text-ion mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
      <span className="font-body text-foreground text-base leading-[1.8]">{text}</span>
    </li>
  );
}
