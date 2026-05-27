import { Shield, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      {/* Confidentiality Badge */}
      <div className="bg-blue-800/50 py-2.5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-sm text-blue-200">
          <Lock size={14} />
          <span>Setiap laporan dijamin kerahasiaannya. Identitas pelapor dilindungi sepenuhnya.</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={20} />
              <span className="font-bold text-lg">PPKPT</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Satuan Tugas Pencegahan dan Penanganan Kekerasan di Perguruan Tinggi. Bersama wujudkan kampus yang aman dan kondusif.
            </p>
          </div>

          {/* Partner Logos */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-blue-300">Afiliasi</h4>
            <div className="flex flex-wrap gap-3">
              {['Kemdikbud', 'Ditjen Dikti', 'Kampus'].map((name) => (
                <span
                  key={name}
                  className="bg-white/10 text-xs px-3 py-1.5 rounded-full text-blue-200"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-blue-300">Kontak</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>Hotline: 0821-XXXX-XXXX</li>
              <li>Email: satgas@ppkpt.ac.id</li>
              <li>Alamat: Kampus Universitas</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-xs text-blue-300">
          Terakhir diperbarui: Mei 2026 &copy; Satuan Tugas PPKPT
        </div>
      </div>
    </footer>
  );
}
