import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQItem from "@/components/FAQItem";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Pertanyaan umum seputar PPKPT, pelaporan, dan penanganan kekerasan di kampus.",
};

export default function FAQPage() {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-3">
          Pertanyaan Umum
        </h1>
        <p className="text-slate-400 light:text-slate-600 mb-8 max-w-2xl">
          Temukan jawaban atas pertanyaan yang sering diajukan tentang PPKPT, proses pelaporan, dan perlindungan bagi korban.
        </p>

        <div className="space-y-3">
          {content.faq.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
