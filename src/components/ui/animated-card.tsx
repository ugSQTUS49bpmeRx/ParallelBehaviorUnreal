import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardHoverVariants } from "@/lib/animations";

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  interactive?: boolean;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  interactive = true,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial="initial"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      variants={cardHoverVariants}
      transition={{ delay }}
      className={className}
    >
      <Card {...props}>{children}</Card>
    </motion.div>
  );
};

export const AnimatedCardHeader = CardHeader;
export const AnimatedCardFooter = CardFooter;
export const AnimatedCardTitle = CardTitle;
export const AnimatedCardDescription = CardDescription;
export const AnimatedCardContent = CardContent;

export default AnimatedCard;
