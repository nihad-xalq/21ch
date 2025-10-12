import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface UseParallaxProps {
  offset?: number;
  direction?: "up" | "down";
}

export const useParallax = ({
  offset = 50,
  direction = "up",
}: UseParallaxProps = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [offset, -offset] : [-offset, offset]
  );

  return { ref, y };
};

export const useParallaxImage = (scale: number = 1.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [scale, 1]);

  return { ref, y, scale: scaleProgress };
};
