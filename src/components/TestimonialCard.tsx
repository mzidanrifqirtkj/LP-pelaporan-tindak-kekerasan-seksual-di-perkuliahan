'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  role: string;
  index: number;
}

export default function TestimonialCard({ quote, role, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="glass-card rounded-2xl p-6"
    >
      <Quote size={24} className="text-blue-400/30 light:text-primary/30 mb-3" />
      <p className="text-slate-300 light:text-slate-600 leading-relaxed mb-4 italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
          {role.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-white light:text-slate-800">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
