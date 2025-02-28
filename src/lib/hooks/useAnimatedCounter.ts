import { useState, useEffect, useRef } from "react";

interface UseAnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  formatter?: (value: number) => string;
}

const useAnimatedCounter = ({
  end,
  start = 0,
  duration = 1000,
  delay = 0,
  formatter = (value: number) => value.toString(),
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset the counter when the end value changes
    countRef.current = start;
    setCount(start);
    startTimeRef.current = null;

    // Clear any existing animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    // Delay the start of the animation if needed
    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeOutExpo for a nice animation curve
        const easedProgress =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentCount = Math.floor(start + (end - start) * easedProgress);
        countRef.current = currentCount;
        setCount(currentCount);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, start, duration, delay]);

  return formatter(count);
};

export default useAnimatedCounter;
