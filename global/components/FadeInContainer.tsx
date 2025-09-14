import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
};

export default function FadeInContainer({
  children,
  className = "",
  duration = 0.5,
}: Props) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <motion.div
      className={className}
      initial={!hasAnimated ? { opacity: 0, scale: 0.95 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
