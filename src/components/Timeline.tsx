'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Search, Heart, SearchCheck, Scale } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: 'Penerimaan Laporan',
    desc: 'Korban atau saksi melaporkan kejadian melalui hotline, form online, atau datang langsung ke Satgas PPKPT. Laporan diterima oleh petugas yang terlatih dan empatik.',
  },
  {
    icon: Search,
    title: 'Identifikasi & Asesmen Awal',
    desc: 'Tim melakukan identifikasi awal kasus dan asesmen terhadap kebutuhan korban, termasuk tingkat risiko dan urgensi penanganan.',
  },
  {
    icon: Heart,
    title: 'Perlindungan & Pendampingan',
    desc: 'Korban diberikan perlindungan segera, termasuk pendampingan psikologis, hukum, dan medis sesuai kebutuhan. Kerahasiaan identitas dijamin penuh.',
  },
  {
    icon: SearchCheck,
    title: 'Investigasi & Pengumpulan Bukti',
    desc: 'Tim investigasi mengumpulkan bukti, memeriksa saksi, dan menyusun kronologi kejadian secara objektif dan profesional.',
  },
  {
    icon: Scale,
    title: 'Rekomendasi Sanksi / Pemulihan',
    desc: 'Berdasarkan hasil investigasi, rekomendasi diberikan untuk sanksi terhadap pelaku dan/atau langkah pemulihan bagi korban.',
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10 light:bg-blue-200 hidden sm:block overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-purple-500"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="space-y-8 sm:space-y-12">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 80, damping: 15 }}
              className="relative pl-0 sm:pl-16"
            >
              {/* Step number with pulse */}
              <motion.div
                className="hidden sm:flex absolute left-4 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full items-center justify-center font-bold text-sm shadow-lg z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                {i + 1}
              </motion.div>

              {/* Content card */}
              <motion.div
                whileHover={{ y: -3 }}
                className="glass-card rounded-xl p-5 sm:p-6 hover:bg-white/[0.08] transition-all light:hover:bg-white/90"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="sm:hidden w-8 h-8 bg-primary/30 rounded-lg flex items-center justify-center shrink-0 light:bg-primary/10">
                    <Icon size={18} className="text-blue-300 light:text-primary" />
                  </div>
                  <div className="hidden sm:flex">
                    <Icon size={20} className="text-blue-300 light:text-primary" />
                  </div>
                  <h3 className="font-semibold text-white light:text-slate-800">{step.title}</h3>
                </div>
                <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed ml-0 sm:ml-11">
                  {step.desc}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
