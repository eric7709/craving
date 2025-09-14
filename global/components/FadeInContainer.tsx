import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements; // allows <section>, <main>, etc.
};

export default function FadeInContainer({
  children,
  className = "",
  duration = 0.5,
  as: Component = "div",
}: Props) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, ease: "easeInOut" }}
    >
      {children}
    </MotionComponent>
  );
}
