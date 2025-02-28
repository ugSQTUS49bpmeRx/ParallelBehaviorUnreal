import React from "react";
import { motion } from "framer-motion";
import useIntersectionObserver from "@/lib/hooks/useIntersectionObserver";

interface TextRevealProps {
  text: string;
  className?: string;
  threshold?: number;
  staggerChildren?: number;
  delay?: number;
  once?: boolean;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  threshold = 0.1,
  staggerChildren = 0.03,
  delay = 0,
  once = true,
  element = "p",
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    freezeOnceVisible: once,
  });

  // Split text into words
  const words = text.split(" ");

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Create the component based on the element prop
  const Component = motion[element as keyof typeof motion];

  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={wordVariants}
          style={{ marginRight: "0.25em", marginBottom: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

export default TextReveal;
