'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  folder: string;
  currentUrl: string;
  label: string;
  onUploaded: (url: string) => void;
}

export default function ImageUploader({ folder, currentUrl, label, onUploaded }: ImageUploaderProps) {
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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        const url = data.url;
        onUploaded(url);
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

  const isImage = /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(currentUrl);
  const displayUrl = currentUrl.startsWith('http') || currentUrl.startsWith('/')
    ? currentUrl
    : `/api/images/${currentUrl}`;

  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-400">{label}</label>

      {currentUrl && isImage && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white/5 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
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

      {message && (
        <p className={`text-xs ${message.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}

      <input
        type="text"
        value={currentUrl}
        onChange={(e) => onUploaded(e.target.value)}
        placeholder="URL gambar atau path"
        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
      />
    </div>
  );
}
