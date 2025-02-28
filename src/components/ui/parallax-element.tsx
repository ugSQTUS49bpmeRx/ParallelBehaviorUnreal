import React from "react";
import useParallax from "@/lib/hooks/useParallax";

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  reverse?: boolean;
  className?: string;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.1,
  direction = "up",
  reverse = false,
  className = "",
}) => {
  const { ref, style } = useParallax({ speed, direction, reverse });

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default ParallaxElement;
