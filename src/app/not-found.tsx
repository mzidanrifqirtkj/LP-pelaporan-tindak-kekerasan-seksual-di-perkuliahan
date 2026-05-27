import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={32} className="text-blue-300 light:text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-white light:text-slate-800 mb-3">
          <span className="gradient-text bg-gradient-to-r from-blue-400 to-purple-400">404</span>
        </h1>
        <p className="text-slate-400 light:text-slate-500 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak ditemukan. Mungkin halaman telah dipindahkan atau tidak tersedia.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
