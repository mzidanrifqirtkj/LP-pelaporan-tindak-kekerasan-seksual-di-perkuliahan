'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Share2 } from 'lucide-react';
import content from '@/data/content.json';

export default function DocumentList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownload = (doc: any) => {
    if (doc.fileUrl) {
      const url = doc.fileUrl.startsWith('http') || doc.fileUrl.startsWith('/')
        ? doc.fileUrl
        : `/api/images/${doc.fileUrl}`;
      window.open(url, '_blank');
    } else {
      alert(`File belum tersedia: ${doc.name}`);
    }
  };

  const handleShare = (name: string) => {
    const text = `Dokumen PPKPT: ${name} - ${window.location.origin}/dokumen`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      {content.dokumen.map((doc, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.01 }}
          className="glass-card rounded-xl p-5 hover:bg-white/[0.08] transition-all light:hover:bg-white/90"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/30 rounded-lg flex items-center justify-center shrink-0 light:bg-primary/10">
              <FileText size={20} className="text-blue-300 light:text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white light:text-slate-800">{doc.name}</h3>
              <p className="text-sm text-slate-400 light:text-slate-600 mt-0.5">{doc.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleShare(doc.name)}
                className="p-2 rounded-lg text-slate-400 light:text-slate-600 hover:text-blue-300 hover:bg-white/10 transition-colors light:hover:text-primary light:hover:bg-primary/10"
                aria-label={`Bagikan ${doc.name} ke WhatsApp`}
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={() => handleDownload(doc)}
                className="flex items-center gap-1.5 bg-accent text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
              >
                <Download size={16} />
                Unduh
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
