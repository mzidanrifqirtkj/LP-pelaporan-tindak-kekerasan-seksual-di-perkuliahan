import { Shield, Lock } from 'lucide-react';
import content from '@/data/content.json';

const f = content.footer;
const g = content.global;

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="bg-blue-800/50 py-2.5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-sm text-blue-200">
          <Lock size={14} />
          <span>{f.confidentialityBadge}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={20} />
              <span className="font-bold text-lg">{g.siteTitle}</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">{f.aboutText}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-blue-300">Afiliasi</h4>
            <div className="flex flex-wrap gap-3">
              {f.affiliates.map((name) => (
                <span key={name} className="bg-white/10 text-xs px-3 py-1.5 rounded-full text-blue-200">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-blue-300">Kontak</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>Hotline: {g.hotlinePhone}</li>
              <li>Email: {g.email}</li>
              <li>Alamat: {g.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-xs text-blue-300">
          {f.copyright}
        </div>
      </div>
    </footer>
  );
}
