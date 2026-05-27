'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'a';
  href?: string;
}

export default function GlowCard({ children, className = '', as = 'div', href }: GlowCardProps) {
  const Component = motion[as as 'div' | 'a'] as typeof motion.div;

  const props = as === 'a' && href ? { href } : {};

  return (
    <Component
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative group ${className}`}
      {...props}
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      <div className="relative glass-card rounded-2xl h-full">
        {children}
      </div>
    </Component>
  );
}
