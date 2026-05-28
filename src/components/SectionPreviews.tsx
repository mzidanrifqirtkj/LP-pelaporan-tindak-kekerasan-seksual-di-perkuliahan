'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Info, Route, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import content from '@/data/content.json';

const previews = [
  {
    id: 'tentang',
    icon: Info,
    title: 'Tentang PPKPT',
    href: '/about',
    image: '/images/ql-tentang.jpg',
  },
  {
    id: 'alur',
    icon: Route,
    title: 'Alur Pelaporan',
    href: '/alur',
    image: '/images/ql-alur.jpg',
  },
  {
    id: 'faq',
    icon: HelpCircle,
    title: 'Pertanyaan Umum',
    href: '/faq',
    image: '/images/students.jpg',
  },
  {
    id: 'lapor',
    icon: Phone,
    title: 'Lapor Kekerasan',
    href: '/lapor',
    image: '/images/counseling.jpg',
  },
];

function renderPreview(id: string) {
  switch (id) {
    case 'tentang': {
      const text = content.about.definition;
      return (
        <p className="text-base text-slate-300 light:text-slate-700 leading-relaxed">
          {text.length > 200 ? text.slice(0, 200) + '...' : text}
        </p>
      );
    }
    case 'alur':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {content.alur.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-base text-slate-300 light:text-slate-700">
              <span className="w-6 h-6 rounded-full bg-primary/30 light:bg-primary/10 text-blue-300 light:text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step.title}
            </div>
          ))}
        </div>
      );
    case 'faq':
      return (
        <ul className="space-y-3">
          {content.faq.slice(0, 3).map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-slate-300 light:text-slate-700">
              <span className="w-2 h-2 rounded-full bg-blue-400 light:bg-primary shrink-0 mt-2.5" />
              {item.question}
            </li>
          ))}
        </ul>
      );
    case 'lapor':
      return (
        <div className="space-y-3 text-base text-slate-300 light:text-slate-700">
          <p>
            <span className="text-blue-300 light:text-primary font-semibold">Hotline:</span>{' '}
            {content.global.hotlinePhone}
          </p>
          <p>
            <span className="text-blue-300 light:text-primary font-semibold">WhatsApp:</span>{' '}
            {content.global.whatsappUrl.replace('https://wa.me/', '')}
          </p>
          <p className="text-slate-400 light:text-slate-500 text-sm mt-2">24 jam, kerahasiaan terjamin</p>
        </div>
      );
    default:
      return null;
  }
}

export default function SectionPreviews() {
  return (
    <section className="py-20 bg-slate-800/20 light:bg-slate-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold gradient-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-12"
        >
          Jelajahi PPKPT
        </motion.h2>
        <div className="space-y-8">
          {previews.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group block glass-card rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all light:hover:bg-white/90"
              >
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="sm:w-2/5 h-56 sm:h-auto bg-cover bg-center shrink-0 relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent sm:hidden" />
                  </div>
                  <div className="sm:w-3/5 p-8 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/30 light:bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <item.icon size={20} className="text-blue-300 light:text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-800 group-hover:text-blue-200 light:group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <div>{renderPreview(item.id)}</div>
                    <div className="inline-flex items-center gap-1.5 text-base text-blue-300 light:text-primary font-medium mt-5 group-hover:underline">
                      Baca selengkapnya
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
