"use client";

import { motion, useInView } from "framer-motion";
import { forwardRef, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children: ReactNode;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement>;
  customVariants?: any;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(
  ({ children, animationNum = 0, timelineRef, customVariants, className, as: Component = "div", ...props }, ref) => {
    const elementRef = useRef<HTMLElement>(null);
    const isInView = useInView(elementRef, {
      once: true,
      margin: "-100px",
    });

    const defaultVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    const variants = customVariants || defaultVariants;

    return (
      <motion.div
        ref={elementRef as any}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

TimelineContent.displayName = "TimelineContent";