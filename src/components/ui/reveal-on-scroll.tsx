import React from "react";
import { motion } from "framer-motion";
import useIntersectionObserver from "@/lib/hooks/useIntersectionObserver";

interface RevealOnScrollProps {
  children: React.ReactNode;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  threshold = 0.1,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    freezeOnceVisible: once,
  });

  // Define animation variants based on direction
  const getVariants = () => {
    const distance = 50;

    switch (direction) {
      case "up":
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "left":
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "none":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      <motion.div
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={variants}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealOnScroll;
