"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface SparklesProps {
  density?: number;
  direction?: "top" | "bottom" | "left" | "right";
  speed?: number;
  color?: string;
  className?: string;
}

export function Sparkles({
  density = 1000,
  direction = "bottom",
  speed = 1,
  color = "#ffffff",
  className,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newSparkles: Sparkle[] = [];

    for (let i = 0; i < density; i++) {
      newSparkles.push({
        id: `sparkle-${i}`,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 3 + 1,
        color,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      });
    }

    setSparkles(newSparkles);
  }, [density, color]);

  const getDirectionVariants = () => {
    switch (direction) {
      case "top":
        return {
          initial: { y: 100, opacity: 0 },
          animate: { y: -100, opacity: 1 },
        };
      case "bottom":
        return {
          initial: { y: -100, opacity: 0 },
          animate: { y: 100, opacity: 1 },
        };
      case "left":
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: -100, opacity: 1 },
        };
      case "right":
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 100, opacity: 1 },
        };
      default:
        return {
          initial: { y: -100, opacity: 0 },
          animate: { y: 100, opacity: 1 },
        };
    }
  };

  const directionVariants = getDirectionVariants();

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
          }}
          initial={directionVariants.initial}
          animate={directionVariants.animate}
          transition={{
            duration: sparkle.duration * speed,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}