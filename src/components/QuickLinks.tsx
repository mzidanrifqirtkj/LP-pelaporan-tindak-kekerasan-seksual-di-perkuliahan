'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Info, Users, Route, FileText } from 'lucide-react';

const cards = [
  {
    href: '/about',
    icon: Info,
    title: 'Tentang PPKPT',
    desc: 'Pengertian, tujuan, dan ruang lingkup kekerasan di kampus.',
    image: '/images/ql-tentang.jpg',
  },
  {
    href: '/struktur',
    icon: Users,
    title: 'Struktur Keanggotaan',
    desc: 'Kenali satuan tugas dan divisi yang siap membantu Anda.',
    image: '/images/ql-struktur.jpg',
  },
  {
    href: '/alur',
    icon: Route,
    title: 'Alur Pelaporan',
    desc: 'Langkah-langkah jelas dalam proses pelaporan kekerasan.',
    image: '/images/ql-alur.jpg',
  },
  {
    href: '/dokumen',
    icon: FileText,
    title: 'Dokumen Pendukung',
    desc: 'Akses buku pedoman, SOP, dan formulir pengaduan.',
    image: '/images/ql-dokumen.jpg',
  },
];

export default function QuickLinks() {
  return (
    <section className="py-16 bg-slate-800/30 light:bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-white light:text-slate-800 text-center mb-10"
        >
          Layanan Informasi PPKPT
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={card.href}
                  className="relative block rounded-2xl overflow-hidden group h-full"
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/40 transition-opacity duration-300 group-hover:opacity-90" />
                  {/* Hover glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col justify-end min-h-[220px]">
                    <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
