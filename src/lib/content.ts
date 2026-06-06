import { promises as fs } from 'fs';
import path from 'path';
import rawContent from '../data/content.json';

export interface Content {
  global: GlobalContent;
  hero: HeroContent;
  quicklinks: QuicklinkItem[];
  about: AboutContent;
  team: TeamMember[];
  alur: AlurContent;
  dokumen: DocumentItem[];
  faq: FAQItem[];
  lapor: LaporContent;
  footer: FooterContent;
  floatingHotline: FloatingHotlineContent;
}

export interface GlobalContent {
  siteTitle: string;
  siteTagline: string;
  siteDescription: string;
  navLinks: { label: string; href: string }[];
  escapeUrl: string;
  escapeLabel: string;
  laporLabel: string;
  laporHref: string;
  hotlinePhone: string;
  whatsappUrl: string;
  email: string;
  address: string;
  workingHours: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  description: string;
  backgroundImage: string;
  stats: { value: string; label: string }[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface QuicklinkItem {
  title: string;
  desc: string;
  href: string;
  icon: string;
  image: string;
}

export interface AboutContent {
  definition: string;
  aims: string[];
  scopes: { title: string; desc: string; icon: string; wide?: boolean; full?: boolean }[];
  stats: { label: string; value: number; suffix?: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface AlurContent {
  steps: { icon: string; title: string; desc: string }[];
}

export interface DocumentItem {
  name: string;
  desc: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LaporContent {
  badge: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  heroImage: string;
  heroCaption: string;
  trustBadges: { icon: string; label: string }[];
  contactCards: { title: string; subtitle: string; type: string; value: string; color: string }[];
  steps: { num: number; title: string; desc: string }[];
  testimonials: { quote: string; role: string }[];
  confidentiality: { title: string; items: string[] };
  faq: { q: string; a: string }[];
  ctaSection: { title: string; body: string; phone: string; whatsappUrl: string };
}

export interface FooterContent {
  confidentialityBadge: string;
  aboutText: string;
  affiliates: string[];
  copyright: string;
}

export interface FloatingHotlineContent {
  title: string;
  description: string;
  phone: string;
}

// const contentFilePath = path.join(process.cwd(), 'src', 'data', 'content.json');

export function getContentPath(): string {
  // return contentFilePath;
  if (process.env.NODE_ENV === 'development') {
    return 'src/data/content.json';
  }
  return '';
}

export async function getContent(): Promise<Content> {
  // const raw = await fs.readFile(contentFilePath, 'utf-8');
  // return JSON.parse(raw) as Content;
  return rawContent as Content;
}

export async function saveContent(data: Content): Promise<void> {
  // await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2), 'utf-8');
  try {
    // Operasi penulisan file HANYA dieksekusi jika berjalan di laptopmu (Node.js environment)
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
      // Menggunakan dynamic import agar compiler Cloudflare tidak membaca modul Node.js ini
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const contentFilePath = path.join(process.cwd(), 'src', 'data', 'content.json');
      await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log('✅ Konten lokal berhasil diperbarui.');
    }
  } catch (error) {
    console.error('Gagal menyimpan konten:', error);
    throw new Error('Gagal menulis berkas konten');
  }
}
