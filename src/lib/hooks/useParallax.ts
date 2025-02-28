import { useEffect, useState, useRef } from "react";

interface UseParallaxProps {
  speed?: number; // Speed factor (0-1), where 0 is no parallax and 1 is full parallax
  direction?: "up" | "down" | "left" | "right"; // Direction of parallax effect
  reverse?: boolean; // Whether to reverse the direction
}

const useParallax = ({
  speed = 0.1,
  direction = "up",
  reverse = false,
}: UseParallaxProps = {}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      // Cancel any existing animation frame
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      // Use requestAnimationFrame for smooth animation
      frameRef.current = requestAnimationFrame(() => {
        const element = elementRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        // Calculate how far the element is from the center of the viewport
        const centerY = rect.top + rect.height / 2 - windowHeight / 2;
        const centerX = rect.left + rect.width / 2 - windowWidth / 2;

        // Calculate the parallax offset based on direction
        let xOffset = 0;
        let yOffset = 0;

        const factor = reverse ? -speed : speed;

        switch (direction) {
          case "up":
            yOffset = centerY * factor;
            break;
          case "down":
            yOffset = -centerY * factor;
            break;
          case "left":
            xOffset = centerX * factor;
            break;
          case "right":
            xOffset = -centerX * factor;
            break;
        }

        setOffset({ x: xOffset, y: yOffset });
      });
    };

    // Initial calculation
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [speed, direction, reverse]);

  return {
    ref: elementRef,
    style: { transform: `translate(${offset.x}px, ${offset.y}px)` },
  };
};

export default useParallax;
