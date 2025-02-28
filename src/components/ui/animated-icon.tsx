import React from "react";
import { motion } from "framer-motion";

interface AnimatedIconProps {
  icon: React.ReactNode;
  className?: string;
  animation?: "pulse" | "bounce" | "spin" | "shake" | "none";
  duration?: number;
  delay?: number;
  hover?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  className = "",
  animation = "none",
  duration = 2,
  delay = 0,
  hover = true,
  size = "md",
  color,
}) => {
  // Define animation variants
  const getAnimationVariants = () => {
    switch (animation) {
      case "pulse":
        return {
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "easeInOut",
              delay,
            },
          },
        };
      case "bounce":
        return {
          animate: {
            y: ["0%", "-20%", "0%"],
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "easeInOut",
              delay,
            },
          },
        };
      case "spin":
        return {
          animate: {
            rotate: 360,
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "linear",
              delay,
            },
          },
        };
      case "shake":
        return {
          animate: {
            x: [-2, 2, -2, 2, 0],
            transition: {
              duration: duration / 2,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "easeInOut",
              delay,
            },
          },
        };
      default:
        return {};
    }
  };

  // Define hover animation
  const hoverAnimation = hover
    ? {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 },
      }
    : {};

  // Define size classes
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      style={{ color }}
      {...(variants.animate ? { animate: "animate", variants } : {})}
      {...hoverAnimation}
    >
      {icon}
    </motion.div>
  );
};

export default AnimatedIcon;
