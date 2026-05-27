import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedShapes from "@/components/AnimatedShapes";
import AnimatedCounter from "./AnimatedCounter";
import { CheckCircle, Shield, Brain, Heart, Monitor, UserX } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang PPKPT",
  description: "Pengertian, tujuan, dan ruang lingkup kekerasan di perguruan tinggi.",
};

const aims = [
  "Menciptakan lingkungan kampus yang aman dan kondusif",
  "Mencegah terjadinya berbagai bentuk kekerasan",
  "Memberikan penanganan yang cepat dan komprehensif",
  "Meningkatkan kesadaran sivitas akademika",
  "Memberikan perlindungan kepada korban kekerasan",
];

const scopes = [
  {
    icon: Heart,
    title: "Kekerasan Seksual",
    desc: "Pelecehan seksual, eksploitasi, pemaksaan hubungan seksual, atau tindakan bermuatan seksual tanpa persetujuan.",
    wide: true,
  },
  {
    icon: Shield,
    title: "Kekerasan Fisik",
    desc: "Tindakan yang mengakibatkan cedera fisik, seperti memukul, mendorong, atau tindakan fisik lainnya.",
  },
  {
    icon: Brain,
    title: "Kekerasan Psikis",
    desc: "Intimidasi, ancaman, perundungan (bullying), penghinaan, dan pemaksaan yang berdampak pada psikologis.",
  },
  {
    icon: Monitor,
    title: "Kekerasan Digital",
    desc: "Teror atau pelecehan berbasis elektronik/online, termasuk penyebaran konten pribadi tanpa izin.",
  },
  {
    icon: UserX,
    title: "Diskriminasi",
    desc: "Perlakuan tidak adil berdasarkan suku, agama, gender, disabilitas, atau latar belakang lainnya.",
  },
  {
    icon: Shield,
    title: "Perundungan (Bullying)",
    desc: "Tindakan agresif berulang yang dilakukan oleh individu atau kelompok untuk menyakiti orang lain.",
    full: true,
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: "Tentang PPKPT" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Jenis Kekerasan", value: 6 },
            { label: "Divisi Satgas", value: 8 },
            { label: "Laporan Ditangani", value: 100, suffix: "+" },
            { label: "Jam Pelayanan", value: 24, suffix: "/7" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-bold gradient-text bg-gradient-to-r from-blue-400 to-purple-400">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-slate-400 light:text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Definition */}
        <section className="mb-12 relative overflow-hidden">
          <AnimatedShapes />
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-6">
              Tentang PPKPT
            </h1>
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-primary">
              <p className="text-slate-300 light:text-slate-700 leading-relaxed">
                <strong className="text-blue-300 light:text-primary">Pencegahan dan Penanganan Kekerasan di Perguruan Tinggi (PPKPT)</strong> adalah upaya sistematis dan terorganisir untuk mencegah terjadinya berbagai bentuk kekerasan di lingkungan perguruan tinggi serta memberikan penanganan yang tepat dan komprehensif apabila terjadi kasus kekerasan. PPKPT merupakan bagian integral dari sistem manajemen perguruan tinggi yang bertujuan menciptakan lingkungan kampus yang aman, nyaman, dan kondusif bagi seluruh sivitas akademika.
              </p>
            </div>
          </div>
        </section>

        {/* Aims */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white light:text-slate-800 mb-6">
            Tujuan PPKPT
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aims.map((aim, i) => (
              <div key={i} className="flex items-start gap-3 glass-card rounded-xl p-4">
                <CheckCircle size={20} className="text-blue-300 light:text-primary shrink-0 mt-0.5" />
                <span className="text-slate-300 light:text-slate-700">{aim}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Scope */}
        <section>
          <h2 className="text-2xl font-bold text-white light:text-slate-800 mb-6">
            Ruang Lingkup Kekerasan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scopes.map((item, i) => {
              const Icon = item.icon;
              const isWide = item.wide || item.full;
              return (
                <div
                  key={i}
                  className={`glass-card rounded-xl p-5 hover:bg-white/[0.08] transition-all light:hover:bg-white/90 ${
                    item.wide ? 'lg:col-span-2' : ''
                  } ${item.full ? 'lg:col-span-3' : ''}`}
                >
                  <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center mb-3 light:bg-red-50">
                    <Icon size={20} className="text-red-400 light:text-accent" />
                  </div>
                  <h3 className="font-semibold text-white light:text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400 light:text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
