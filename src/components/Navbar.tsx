'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '@/data/content.json';

const g = content.global;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const pathname = usePathname();
  const isLapor = pathname === g.laporHref;

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
  };

  const escapeSite = () => {
    window.location.href = g.escapeUrl;
  };

  return (
    <>
      <button
        onClick={escapeSite}
        className="fixed top-2 right-2 z-50 bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1.5 hover:bg-slate-900 transition-colors"
        aria-label="Keluar dari situs dengan cepat"
      >
        <ExternalLink size={12} />
        {g.escapeLabel}
      </button>

      <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 light:bg-white/80 light:border-b light:border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo-ppkpt.svg"
                alt={g.siteTitle}
                width={120}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
              {g.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-primary/20 text-blue-300 light:bg-primary/10 light:text-primary'
                      : 'text-slate-300 light:text-slate-600 hover:bg-white/10 light:hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-300 light:text-slate-600 hover:bg-white/10 light:hover:bg-slate-100 transition-colors"
                aria-label={isLight ? 'Mode gelap' : 'Mode terang'}
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <Link
                href={g.laporHref}
                className={`bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm ${
                  isLapor ? 'ring-2 ring-accent ring-offset-2' : ''
                }`}
              >
                {g.laporLabel}
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-300 light:text-slate-600 hover:bg-white/10 light:hover:bg-slate-100 transition-colors"
                aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/10 light:border-slate-200"
              aria-label="Navigasi mobile"
            >
              <div className="px-4 py-3 space-y-1">
                {g.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-primary/20 text-blue-300 light:bg-primary/10 light:text-primary'
                        : 'text-slate-300 light:text-slate-600 hover:bg-white/10 light:hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
