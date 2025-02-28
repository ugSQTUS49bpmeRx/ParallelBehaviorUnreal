import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, itemVariants } from "@/lib/animations";

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
}) => {
  const containerVariants = {
    ...staggerContainer,
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedList;
