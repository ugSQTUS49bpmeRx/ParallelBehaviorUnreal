import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent as BaseDialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { modalVariants, backdropVariants } from "@/lib/animations";

interface AnimatedDialogContentProps
  extends React.ComponentProps<typeof BaseDialogContent> {
  children: React.ReactNode;
}

const AnimatedDialogContent = ({
  children,
  ...props
}: AnimatedDialogContentProps) => {
  return (
    <BaseDialogContent {...props}>
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={modalVariants}
      >
        {children}
      </motion.div>
    </BaseDialogContent>
  );
};

// Export both the original name and as DialogContent for compatibility
export {
  Dialog,
  AnimatedDialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};

// Also export as DialogContent for backward compatibility
export const DialogContent = AnimatedDialogContent;
