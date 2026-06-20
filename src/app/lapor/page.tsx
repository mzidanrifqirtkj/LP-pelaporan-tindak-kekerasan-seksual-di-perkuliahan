import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Shield, Lock, ChevronRight, ArrowLeft, Heart } from "lucide-react";
import AnimatedShapes from "@/components/AnimatedShapes";
import TrustBadge from "@/components/TrustBadge";
import TestimonialCard from "@/components/TestimonialCard";
import content from "@/data/content.json";
import type { LaporContent } from "@/lib/content";

const l: LaporContent = content.lapor;
const g = content.global;

export const metadata: Metadata = {
  title: "Lapor Kekerasan",
  description: "Laporkan kekerasan dengan aman dan rahasia. Tim Satgas PPKPT siap membantu Anda 24 jam.",
};

export default function LaporPage() {
  return (
    <div className="pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 light:from-blue-50 light:via-white light:to-blue-100">
        <AnimatedShapes />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200 transition-colors mb-6 font-medium light:text-primary light:hover:text-blue-700">
            <ArrowLeft size={14} />
            Kembali ke Beranda
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/30 text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full mb-4 light:bg-primary/10 light:text-primary">
                <Shield size={14} />
                {l.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white light:text-slate-800 mb-4 leading-tight">
                Kami Siap{" "}
                <span className="text-blue-300 light:text-primary">{l.headlineHighlight}</span>
                <br />& Membantu Anda
              </h1>
              <p className="text-base sm:text-lg text-slate-400 light:text-slate-600 leading-relaxed mb-6 max-w-lg">
                {l.description}
              </p>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {l.trustBadges.map((item, i) => (
                  <TrustBadge key={i} icon={item.icon} label={item.label} index={i} />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-blue-300/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={l.heroImage}
                  alt="Konseling"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <Heart size={14} className="text-red-300" />
                    {l.heroCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {l.contactCards.map((card, i) => {
            const isPhone = card.type === 'phone';
            const isWA = card.type === 'whatsapp';
            const isRed = card.color === 'red';
            const isGreen = card.color === 'green';
            return (
              <div key={i} className="glass-card rounded-2xl p-6 hover:bg-white/[0.08] transition-all light:hover:bg-white/90">
                <div className={`w-12 h-12 ${isRed ? 'bg-red-900/30 light:bg-red-50' : isGreen ? 'bg-green-900/30 light:bg-green-50' : 'bg-primary/30 light:bg-primary/10'} rounded-xl flex items-center justify-center mb-4 relative`}>
                  {isPhone && <div className="absolute inset-0 rounded-xl bg-red-400/20 animate-ping" />}
                  {isPhone && <Phone size={24} className="text-accent relative" />}
                  {isWA && <MessageCircle size={24} className="text-green-400 light:text-green-600" />}
                  {!isPhone && !isWA && <Shield size={24} className="text-blue-300 light:text-primary" />}
                </div>
                <h3 className="font-bold text-white light:text-slate-800 mb-1">{card.title}</h3>
                <p className="text-sm text-slate-400 light:text-slate-600 mb-3">{card.subtitle}</p>
                {isPhone && (
                  <a href={`tel:${card.value}`} className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors w-full justify-center">
                    <Phone size={16} />
                    {card.value}
                  </a>
                )}
                {isWA && (
                  <a href={card.value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors w-full justify-center">
                    <MessageCircle size={16} />
                    {g.hotlinePhone}
                  </a>
                )}
                {!isPhone && !isWA && (
                  <p className="text-xs text-slate-500 light:text-slate-500">{card.value}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* STEPS */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white light:text-slate-800 mb-2 text-center">
            Apa yang Terjadi Setelah Saya Melapor?
          </h2>
          <p className="text-slate-400 light:text-slate-600 text-center mb-10 max-w-xl mx-auto">
            Kami ingin Anda tahu persis apa yang akan terjadi. Tidak ada yang ditutup-tutupi.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {l.steps.map((step) => (
              <div key={step.num} className="relative glass-card rounded-xl p-5 hover:bg-white/[0.08] transition-all light:hover:bg-white/90 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  {step.num < 4 && (
                    <ChevronRight size={16} className="text-slate-500 light:text-slate-400 hidden sm:block" />
                  )}
                </div>
                <h3 className="font-semibold text-white light:text-slate-800 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white light:text-slate-800 mb-2 text-center">
            Mereka yang Telah Melapor
          </h2>
          <p className="text-slate-400 light:text-slate-600 text-center mb-10 max-w-xl mx-auto">
            Cerita nyata dari sivitas akademika yang telah dibantu oleh Satgas PPKPT.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {l.testimonials.map((t, i) => (
              <TestimonialCard key={i} quote={t.quote} role={t.role} index={i} />
            ))}
          </div>
        </section>

        {/* JAMINAN & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/30 rounded-xl flex items-center justify-center shrink-0 light:bg-primary/10">
                <Lock size={22} className="text-blue-300 light:text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white light:text-slate-800 mb-3">{l.confidentiality.title}</h3>
                <ul className="space-y-2.5 text-sm text-slate-400 light:text-slate-600">
                  {l.confidentiality.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-primary/30 rounded-full flex items-center justify-center shrink-0 mt-0.5 light:bg-primary/10">
                        <ChevronRight size={12} className="text-blue-300 light:text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white light:text-slate-800 mb-4">Pertanyaan yang Sering Diajukan</h3>
            <div className="space-y-2.5">
              {l.faq.map((faq, i) => (
                <details key={i} className="group glass-card rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-slate-300 light:text-slate-700 hover:bg-white/[0.05] transition-colors light:hover:bg-slate-50">
                    {faq.q}
                    <ChevronRight size={14} className="text-slate-400 light:text-slate-600 group-open:rotate-90 transition-transform shrink-0" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-slate-400 light:text-slate-600 border-t border-white/10 light:border-slate-200 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary to-blue-800 rounded-3xl p-8 sm:p-12 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {l.ctaSection.title}
          </h2>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            {l.ctaSection.body}
          </p>
          <a
            href={`tel:${l.ctaSection.phone}`}
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl text-base font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Phone size={18} />
            Hubungi {l.ctaSection.phone}
          </a>
          <p className="text-blue-300 text-sm mt-4">
            atau{' '}
            <a href={l.ctaSection.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
              hubungi via WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
