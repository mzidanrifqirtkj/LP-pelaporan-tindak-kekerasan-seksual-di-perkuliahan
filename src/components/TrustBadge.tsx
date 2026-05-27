'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Clock, Users, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = { Shield, Lock, Clock, Users };

interface TrustBadgeProps {
  icon: string;
  label: string;
  index: number;
}

export default function TrustBadge({ icon, label, index }: TrustBadgeProps) {
  const Icon = icons[icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-2.5 glass-card px-4 py-2.5 rounded-xl shadow-sm"
    >
      <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0 light:bg-blue-50">
        <Icon size={16} className="text-blue-300 light:text-primary" />
      </div>
      <span className="text-sm font-medium text-slate-300 light:text-slate-700">{label}</span>
    </motion.div>
  );
}
