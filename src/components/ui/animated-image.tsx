import React from "react";
import { motion } from "framer-motion";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  animation?: "fadeIn" | "zoomIn" | "slideIn" | "none";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  hover?: boolean;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  animation = "fadeIn",
  direction = "up",
  duration = 0.6,
  delay = 0,
  hover = true,
}) => {
  // Define animation variants
  const getAnimationVariants = () => {
    const distance = 50;

    switch (animation) {
      case "fadeIn":
        return {
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };
      case "zoomIn":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };
      case "slideIn":
        const slideProps = {
          up: { y: distance },
          down: { y: -distance },
          left: { x: distance },
          right: { x: -distance },
        };

        return {
          initial: { opacity: 0, ...slideProps[direction] },
          animate: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
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
        whileHover: { scale: 1.05, transition: { duration: 0.3 } },
        whileTap: { scale: 0.98 },
      }
    : {};

  const variants = getAnimationVariants();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      initial={variants.initial}
      animate={variants.animate}
      {...hoverAnimation}
    />
  );
};

export default AnimatedImage;
