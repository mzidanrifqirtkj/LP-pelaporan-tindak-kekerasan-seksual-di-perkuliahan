import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQItem from "@/components/FAQItem";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Pertanyaan umum seputar PPKPT, pelaporan, dan penanganan kekerasan di kampus.",
};

const faqs = [
  {
    question: "Apa yang dimaksud dengan PPKPT?",
    answer: "PPKPT adalah Pencegahan dan Penanganan Kekerasan di Perguruan Tinggi, yaitu upaya sistematis untuk mencegah dan menangani kekerasan di lingkungan kampus melalui Satuan Tugas yang dibentuk oleh perguruan tinggi.",
  },
  {
    question: "Apakah identitas pelapor akan dirahasiakan?",
    answer: "Ya, identitas pelapor dijamin kerahasiaannya dan dilindungi oleh peraturan perundang-undangan. Hanya petugas yang berwenang yang memiliki akses data pelapor. Pelapor juga dapat melapor secara anonim jika menghendaki.",
  },
  {
    question: "Siapa saja yang bisa melapor ke Satgas PPKPT?",
    answer: "Seluruh sivitas akademika dapat melapor, termasuk mahasiswa, dosen, tenaga kependidikan, dan masyarakat umum yang mengetahui atau mengalami kekerasan di lingkungan kampus.",
  },
  {
    question: "Apa yang terjadi setelah saya melapor?",
    answer: "Setelah laporan diterima, tim akan melakukan identifikasi dan asesmen awal, memberikan perlindungan dan pendampingan kepada korban, kemudian melakukan investigasi secara profesional sebelum memberikan rekomendasi sanksi atau pemulihan.",
  },
  {
    question: "Apakah ada konsekuensi jika saya melapor?",
    answer: "Tidak ada konsekuensi negatif bagi pelapor yang beritikad baik. Pelapor justru dilindungi dari segala bentuk intimidasi atau pembalasan. Peraturan melarang adanya tindakan retaliasi terhadap pelapor kekerasan.",
  },
  {
    question: "Bagaimana cara melapor secara anonim?",
    answer: "Anda dapat melapor melalui hotline atau WhatsApp tanpa menyebutkan identitas. Namun, perlu diketahui bahwa laporan anonim dapat membatasi kemampuan tim dalam melakukan investigasi dan pendampingan lanjutan.",
  },
  {
    question: "Berapa lama proses penanganan kasus?",
    answer: "Waktu penanganan tergantung pada kompleksitas kasus. Secara umum, proses investigasi dilakukan dalam waktu 14 hari kerja dan dapat diperpanjang sesuai kebutuhan. Korban akan mendapat update berkala mengenai perkembangan kasus.",
  },
  {
    question: "Apa saja bentuk kekerasan yang bisa dilaporkan?",
    answer: "Semua bentuk kekerasan dapat dilaporkan, termasuk kekerasan fisik, psikis, seksual, digital (online), diskriminasi, dan perundungan (bullying). Tim Satgas akan menindaklanjuti sesuai dengan kewenangan dan prosedur yang berlaku.",
  },
];

export default function FAQPage() {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-3">
          Pertanyaan Umum
        </h1>
        <p className="text-slate-400 light:text-slate-500 mb-8 max-w-2xl">
          Temukan jawaban atas pertanyaan yang sering diajukan tentang PPKPT, proses pelaporan, dan perlindungan bagi korban.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
