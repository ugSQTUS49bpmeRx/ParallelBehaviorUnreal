import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabContentVariants } from "@/lib/animations";

interface AnimatedTabsProps extends React.ComponentProps<typeof Tabs> {
  children: React.ReactNode;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ children, ...props }) => {
  return <Tabs {...props}>{children}</Tabs>;
};

interface AnimatedTabsContentProps
  extends React.ComponentProps<typeof TabsContent> {
  children: React.ReactNode;
}

const AnimatedTabsContent: React.FC<AnimatedTabsContentProps> = ({
  children,
  value,
  ...props
}) => {
  return (
    <TabsContent value={value} {...props}>
      <AnimatePresence mode="wait">
        <motion.div
          key={value as string}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={tabContentVariants}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TabsContent>
  );
};

export { AnimatedTabs, AnimatedTabsContent, TabsList, TabsTrigger };
