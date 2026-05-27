import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProfileCard from "@/components/ProfileCard";

export const metadata: Metadata = {
  title: "Struktur Keanggotaan",
  description: "Daftar anggota Satuan Tugas PPKPT dan divisi-divisi pendukung.",
};

const members = [
  { name: "Prof. Dr. Ahmad Syarif", role: "Ketua Satgas PPKPT" },
  { name: "Dr. Siti Rahmawati", role: "Wakil Ketua Satgas" },
  { name: "Rina Puspita, M.Psi.", role: "Divisi Pendampingan Psikologis" },
  { name: "Dr. Hendra Gunawan, S.H.", role: "Divisi Hukum & Advokasi" },
  { name: "Fajar Nugroho, S.Sos.", role: "Divisi Sosialisasi & Edukasi" },
  { name: "Dr. Nining Triani", role: "Divisi Pendampingan Medis" },
  { name: "Ahmad Fauzi, S.Kom.", role: "Divisi Teknologi & Digital" },
  { name: "Rini Hartati, S.Pd.", role: "Divisi Administrasi & Data" },
];

export default function StrukturPage() {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: "Struktur Keanggotaan" }]} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-3">
          Struktur Keanggotaan
        </h1>
        <p className="text-slate-400 light:text-slate-500 mb-8 max-w-2xl">
          Satuan Tugas PPKPT terdiri dari berbagai divisi yang bekerja sama untuk memberikan penanganan terbaik bagi seluruh sivitas akademika.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((member, i) => (
            <ProfileCard
              key={i}
              name={member.name}
              role={member.role}
              imageUrl={`/images/team/member-${i + 1}.jpg`}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
