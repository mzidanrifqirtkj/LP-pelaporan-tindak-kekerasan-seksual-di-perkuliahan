'use client';

import { useState, useRef } from 'react';
import { compressImage } from '@/lib/compress';

const MAX_SIZE = 1 * 1024 * 1024;

interface FileUploaderProps {
  folder: string;
  currentUrl: string;
  label: string;
  accept?: string;
  onUploaded: (url: string) => void;
}

export default function FileUploader({ folder, currentUrl, label, accept, onUploaded }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setMessage('Pilih file terlebih dahulu');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      let fileToUpload = file;
      if (file.type.startsWith('image/')) {
        fileToUpload = await compressImage(file);
      }

      if (fileToUpload.size > MAX_SIZE) {
        const sizeMB = (fileToUpload.size / 1024 / 1024).toFixed(2);
        setMessage(`Ukuran masih ${sizeMB} MB (maksimal 1 MB)`);
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json() as { success?: boolean; url?: string; error?: string };

      if (data.success && data.url) {
        onUploaded(data.url);
        setMessage('✓ Berhasil upload');
        if (inputRef.current) inputRef.current.value = '';
      } else {
        setMessage('✗ Gagal: ' + (data.error || 'unknown'));
      }
    } catch {
      setMessage('✗ Gagal menghubungi server');
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const displayUrl = currentUrl.startsWith('http') || currentUrl.startsWith('/')
    ? currentUrl
    : `/api/images/${currentUrl}`;

  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-400">{label}</label>

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="block w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-slate-300 hover:file:bg-white/20 cursor-pointer"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="shrink-0 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50"
        >
          {uploading ? '...' : 'Upload'}
        </button>
      </div>

      {currentUrl && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 truncate max-w-[200px]">
            {displayUrl}
          </span>
          {currentUrl.startsWith('http') || currentUrl.startsWith('/') ? (
            <a
              href={displayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 shrink-0"
            >
              Lihat
            </a>
          ) : null}
        </div>
      )}

      {message && (
        <p className={`text-xs ${message.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}

      <input
        type="text"
        value={currentUrl}
        onChange={(e) => onUploaded(e.target.value)}
        placeholder="URL file"
        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
      />
    </div>
  );
}
