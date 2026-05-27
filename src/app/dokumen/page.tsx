import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import DocumentList from "@/components/DocumentList";

export const metadata: Metadata = {
  title: "Dokumen Pendukung",
  description: "Akses dan unduh dokumen pedoman, SOP, formulir, dan dasar hukum PPKPT.",
};

export default function DokumenPage() {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: "Dokumen" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-3">
          Dokumen Pendukung
        </h1>
        <p className="text-slate-400 light:text-slate-500 mb-8 max-w-2xl">
          Unduh dokumen-dokumen resmi terkait PPKPT, termasuk buku pedoman, SOP, dan formulir pengaduan.
        </p>

        <DocumentList />
      </div>
    </div>
  );
}
