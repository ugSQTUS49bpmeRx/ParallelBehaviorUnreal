import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/animations";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  interactive?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  interactive = true,
  ...props
}) => {
  return (
    <motion.div
      initial="initial"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      variants={buttonVariants}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
