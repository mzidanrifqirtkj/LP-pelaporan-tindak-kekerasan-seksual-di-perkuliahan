'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  name: string;
  role: string;
  imageUrl: string;
  index: number;
}

export default function ProfileCard({ name, role, imageUrl, index }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.03 }}
      className="glass-card rounded-xl p-6 text-center hover:bg-white/[0.08] transition-all light:hover:bg-white/90"
    >
      <div className="relative inline-block">
        <Image
          src={imageUrl}
          alt={name}
          width={96}
          height={96}
          className="rounded-full mx-auto mb-4 object-cover border-4 border-primary/30"
        />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
      </div>
      <h3 className="font-semibold text-white light:text-slate-800">{name}</h3>
      <p className="text-sm text-slate-400 light:text-slate-500 mt-1">{role}</p>
    </motion.div>
  );
}
