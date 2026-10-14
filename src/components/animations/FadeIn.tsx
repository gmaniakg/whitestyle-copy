'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'center';

export const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = "",
  staggerChildren = 0,
  as = "div"
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
  staggerChildren?: number;
  as?: keyof typeof motion;
}) => {
  const Component = motion[as] as any;
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    center: { x: 0, y: 0, scale: 0.95 }
  };

  const hidden = {
    ...directions[direction],
    opacity: 0,
  };

  const visible = {
    y: 0,
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 50,
      duration: duration,
      delay: delay,
      ...(staggerChildren > 0 && {
        staggerChildren: staggerChildren
      })
    }
  };

  return (
    <Component
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </Component>
  );
};

export const FadeInStaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  delay = 0,
  as = "div"
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  as?: keyof typeof motion;
}) => {
  const Component = motion[as] as any;
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </Component>
  );
};

export const FadeInStaggerItem = ({
  children,
  className = "",
  direction = 'up',
  as = "div"
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  as?: keyof typeof motion;
}) => {
  const Component = motion[as] as any;
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    center: { x: 0, y: 0, scale: 0.9 }
  };

  const item = {
    hidden: { ...directions[direction], opacity: 0 },
    visible: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
      }
    }
  };

  return (
    <Component variants={item} className={className}>
      {children}
    </Component>
  );
};
