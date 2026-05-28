import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Alur Pelaporan",
  description: "Langkah-langkah dalam proses pelaporan dan penanganan kekerasan di perguruan tinggi.",
};

export default function AlurPage() {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: "Alur Pelaporan" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-3">
          Alur Pelaporan
        </h1>
        <p className="text-slate-400 light:text-slate-600 mb-10 max-w-2xl">
          Proses pelaporan dan penanganan kasus dilakukan secara profesional, cepat, dan menjaga kerahasiaan identitas pelapor.
        </p>

        <Timeline />
      </div>
    </div>
  );
}
