import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "@/lib/animations";

interface AnimatedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
