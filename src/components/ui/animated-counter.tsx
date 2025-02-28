import React from "react";
import { motion } from "framer-motion";
import useAnimatedCounter from "@/lib/hooks/useAnimatedCounter";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  formatter?: (value: number) => string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  delay = 0,
  className = "",
  formatter = (value: number) => value.toString(),
}) => {
  const displayValue = useAnimatedCounter({
    end: value,
    duration,
    delay,
    formatter,
  });

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
    >
      {displayValue}
    </motion.span>
  );
};

export default AnimatedCounter;
