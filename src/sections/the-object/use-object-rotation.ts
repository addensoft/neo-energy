"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { AMBIENT_ROTATION, DRAG_ROTATION } from "@/lib/motion-tokens";

/**
 * useObjectRotation — Chapter 1's entire interaction (Creative Direction §2, §10):
 * "the battery continues its slow ambient orbit; the user can now click-drag a
 * few degrees of free rotation before it springs back to ambient auto-rotate."
 *
 * Two nested layers so the two motions never fight over the same GSAP-animated
 * property:
 *  - `stageRef` — the continuous ambient yoyo rotation (always running).
 *  - `dragRef`  — a child layer that only moves in response to the pointer,
 *    and tweens back to zero on release. Nested CSS transforms compose the
 *    two visually without either tween overwriting the other.
 *
 * The release tween uses `power3.out`, not an elastic/bouncy ease — Creative
 * Direction §4 is explicit that motion here reads as precision, not playful bounce.
 */
export function useObjectRotation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startY: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const stageEl = stageRef.current;
    const dragEl = dragRef.current;
    if (!stageEl || !dragEl) return;

    gsap.set(stageEl, { transformPerspective: 1600, rotateY: -8, rotateX: 4 });
    gsap.set(dragEl, { rotateY: 0, rotateX: 0 });

    let ambientTween: gsap.core.Tween | null = null;
    if (!prefersReducedMotion) {
      ambientTween = gsap.to(stageEl, {
        rotateY: `+=${AMBIENT_ROTATION.range}`,
        duration: AMBIENT_ROTATION.duration,
        ease: AMBIENT_ROTATION.ease,
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      ambientTween?.kill();
    };
  }, [prefersReducedMotion]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragEl = dragRef.current;
    if (!dragEl) return;
    dragState.current = { active: true, startX: event.clientX, startY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    gsap.killTweensOf(dragEl);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const dragEl = dragRef.current;
    if (!dragEl) return;

    const dx = event.clientX - dragState.current.startX;
    const dy = event.clientY - dragState.current.startY;
    const rotateY = gsap.utils.clamp(
      -DRAG_ROTATION.maxY,
      DRAG_ROTATION.maxY,
      dx * DRAG_ROTATION.sensitivity,
    );
    const rotateX = gsap.utils.clamp(
      -DRAG_ROTATION.maxX,
      DRAG_ROTATION.maxX,
      -dy * DRAG_ROTATION.sensitivity * 0.6,
    );
    gsap.set(dragEl, { rotateY, rotateX });
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;

    const dragEl = dragRef.current;
    if (dragEl) {
      gsap.to(dragEl, {
        rotateY: 0,
        rotateX: 0,
        duration: prefersReducedMotion ? 0 : DRAG_ROTATION.releaseDuration,
        ease: DRAG_ROTATION.releaseEase,
      });
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    stageRef,
    dragRef,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
