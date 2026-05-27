'use client';

import { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingHotline() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card rounded-2xl shadow-xl p-5 w-72"
          >
            <p className="text-sm font-semibold text-white light:text-slate-800 mb-2">
              Hotline PPKPT
            </p>
            <p className="text-xs text-slate-400 light:text-slate-500 mb-3">
              Hubungi kami kapan saja, laporan Anda dijamin kerahasiaannya.
            </p>
            <a
              href="tel:0821-XXXX-XXXX"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors w-full justify-center"
            >
              <Phone size={16} />
              0821-XXXX-XXXX
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="bg-accent text-white p-3.5 rounded-full shadow-lg hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Hotline darurat"
      >
        {open ? <X size={22} /> : <Phone size={22} />}
      </button>
    </div>
  );
}
