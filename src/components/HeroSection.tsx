'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import AnimatedShapes from './AnimatedShapes';

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Kawasan Kampus Bebas Kekerasan';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center animated-mesh bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 light:from-primary light:via-blue-800 light:to-blue-900 text-white">
      <AnimatedShapes />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: 'url(/images/hero-campus.jpg)' }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 w-full">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex items-center gap-2 mb-4 text-blue-300 text-sm font-medium"
            >
              <Shield size={16} />
              <span>Satuan Tugas PPKPT</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 min-h-[1.2em]">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
                className="inline-block w-[3px] h-[0.8em] bg-blue-400 ml-1 align-middle"
              />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg text-slate-300 light:text-blue-100 mb-8 leading-relaxed max-w-lg"
            >
              Selamat datang di pusat informasi Satgas PPKPT. Bersama kita ciptakan lingkungan kampus yang aman, nyaman, dan kondusif bagi seluruh sivitas akademika.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 glass-card text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors light:text-primary"
              >
                Pelajari Lebih Lanjut
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/lapor"
                className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-accent-hover transition-colors shadow-lg"
              >
                Lapor Sekarang
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="glass-card rounded-2xl p-6 space-y-5">
              <div>
                <p className="text-3xl font-bold gradient-text bg-gradient-to-r from-blue-400 to-purple-400">100+</p>
                <p className="text-sm text-slate-400 light:text-slate-500">Laporan Ditangani</p>
              </div>
              <div className="h-px bg-white/10 light:bg-black/10" />
              <div>
                <p className="text-3xl font-bold gradient-text bg-gradient-to-r from-blue-400 to-purple-400">24/7</p>
                <p className="text-sm text-slate-400 light:text-slate-500">Hotline Siap Membantu</p>
              </div>
              <div className="h-px bg-white/10 light:bg-black/10" />
              <div>
                <p className="text-3xl font-bold gradient-text bg-gradient-to-r from-blue-400 to-purple-400">Terjamin</p>
                <p className="text-sm text-slate-400 light:text-slate-500">Kerahasiaan &amp; Perlindungan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
