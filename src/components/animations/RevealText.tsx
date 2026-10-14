'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const RevealText = ({ 
  text, 
  className = "", 
  delay = 0,
  as: Component = 'div' 
}: { 
  text: string, 
  className?: string, 
  delay?: number,
  as?: any
}) => {
  // Split words
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <Component className={className}>
      <motion.div
        style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "inherit" }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {words.map((word, index) => (
          <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
            {word}
          </motion.span>
        ))}
      </motion.div>
    </Component>
  );
};
