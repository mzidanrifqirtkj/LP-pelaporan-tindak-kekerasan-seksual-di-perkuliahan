'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft } from 'lucide-react';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_token');
    if (saved) setToken(saved);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoadingLogin(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('admin_token', data.token);
        setToken(data.token);
      } else {
        setError('Password salah');
      }
    } catch {
      setError('Gagal terhubung ke server');
    } finally {
      setLoadingLogin(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm glass-card rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-xl font-bold text-white">Admin PPKPT</h1>
            <p className="text-sm text-slate-400 mt-1">Masukkan password untuk melanjutkan</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-3"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loadingLogin}
            className="w-full bg-accent text-white py-2.5 rounded-xl font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {loadingLogin ? 'Memeriksa...' : 'Masuk'}
          </button>
        </form>
      </div>
    );
  }

  return <Dashboard token={token} />;
}

function Dashboard({ token: _token }: { token: string }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch {
      console.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const updateContent = (path: string, value: any) => {
    setContent((prev: any) => {
      const keys = path.split('.');
      const newContent = JSON.parse(JSON.stringify(prev));
      let obj = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMessage('✅ Konten berhasil disimpan!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch {
      setSaveMessage('❌ Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    setPublishMessage('');
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setPublishMessage('🚀 Sinyal dikirim! Menunggu rilis Cloudflare (~2 mnt).');
      } else {
        setPublishMessage('❌ Gagal memicu deploy otomatis.');
      }
    } catch {
      setPublishMessage('❌ Gangguan jaringan ke API internal.');
    } finally {
      setPublishing(false);
      setTimeout(() => setPublishMessage(''), 5000);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.reload();
  };

  const sections = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'hero', label: '🏠 Hero' },
    { id: 'about', label: '📖 About' },
    { id: 'team', label: '👥 Team' },
    { id: 'alur', label: '🔄 Alur' },
    { id: 'dokumen', label: '📄 Dokumen' },
    { id: 'faq', label: '❓ FAQ' },
    { id: 'lapor', label: '📞 Lapor' },
    { id: 'footer', label: '🔻 Footer & Global' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">Memuat konten...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar - drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 left-0 z-50 w-60 bg-slate-900 border-r border-white/10 flex flex-col md:hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white">PPKPT CMS</h2>
                <p className="text-xs text-slate-500">Content Management</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                aria-label="Tutup sidebar"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveSection(s.id); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === s.id
                      ? 'bg-primary/30 text-blue-300'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
            <div className="p-3 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                🚪 Keluar
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar - always visible */}
      <aside className={`hidden md:flex flex-col bg-slate-900 border-r border-white/10 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}>
        <div className={`p-4 border-b border-white/10 flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {sidebarCollapsed ? (
            <span className="text-lg font-bold text-white" title="PPKPT CMS">P</span>
          ) : (
            <div>
              <h2 className="font-bold text-white">PPKPT CMS</h2>
              <p className="text-xs text-slate-500">Content Management</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            aria-label={sidebarCollapsed ? 'Perluas sidebar' : 'Minimalkan sidebar'}
          >
            <ChevronLeft size={18} className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <nav className={`flex-1 p-3 space-y-1 overflow-y-auto ${sidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-3 w-full rounded-lg text-sm transition-colors ${
                sidebarCollapsed ? 'justify-center p-2' : 'px-3 py-2'
              } ${
                activeSection === s.id
                  ? 'bg-primary/30 text-blue-300'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
              title={sidebarCollapsed ? s.label : undefined}
            >
              <span className="shrink-0">{s.label.split(' ')[0]}</span>
              {!sidebarCollapsed && <span className="truncate">{s.label.slice(s.label.indexOf(' ') + 1)}</span>}
            </button>
          ))}
        </nav>
        <div className={`p-3 border-t border-white/10 ${sidebarCollapsed ? 'flex flex-col items-center gap-2' : ''}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors ${
              sidebarCollapsed ? 'justify-center p-2' : 'px-3 py-2 w-full text-left'
            }`}
            title={sidebarCollapsed ? 'Keluar' : undefined}
          >
            🚪
            {!sidebarCollapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Mobile header with hamburger */}
          <div className="sticky top-0 z-10 flex items-center gap-3 mb-2 md:hidden bg-slate-950/90 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 rounded-lg text-white bg-slate-800 hover:bg-slate-700 ring-1 ring-white/10 transition-colors"
              aria-label="Buka sidebar"
            >
              <Menu size={20} />
            </button>
            <h2 className="font-bold text-white text-sm">PPKPT CMS</h2>
          </div>

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {sections.find((s) => s.id === activeSection)?.label}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {/* Notifikasi Status */}
              {saveMessage && <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">{saveMessage}</span>}
              {publishMessage && <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">{publishMessage}</span>}
              
              {/* Tombol Simpan Konten JSON */}
              <button
                onClick={handleSave}
                disabled={saving || publishing}
                className="bg-slate-800 ring-1 ring-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {saving ? 'Menyimpan...' : '💾 Simpan Konten'}
              </button>

              {/* TOMBOL BARU: TRIGGER PUBLISH KE CLOUDFLARE */}
              <button
                onClick={handlePublish}
                disabled={saving || publishing}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
              >
                {publishing ? 'Mengirim...' : '🚀 Publish Website'}
              </button>
            </div>
          </div>

          {/* Content Sections */}
          {activeSection === 'dashboard' && content && (
            <DashboardView content={content} />
          )}
          {activeSection === 'hero' && content && (
            <HeroSectionForm content={content} updateContent={updateContent} />
          )}
          {activeSection === 'about' && content && (
            <AboutSectionForm content={content} updateContent={updateContent} />
          )}
          {activeSection === 'team' && content && (
            <TeamSectionForm content={content} updateContent={updateContent} />
          )}
          {activeSection === 'alur' && content && (
            <AlurSectionForm content={content} updateContent={updateContent} />
          )}
          {activeSection === 'dokumen' && content && (
            <DokumenSectionForm content={content} updateContent={updateContent} />
          )}
          {activeSection === 'faq' && content && (
            <FAQSectionForm content={content} updateContent={updateContent} />
          )}
          {activeSection === 'lapor' && content && (
            <LaporSectionForm content={content} updateContent={updateContent} />
          )}
          {activeSection === 'footer' && content && (
            <FooterSectionForm content={content} updateContent={updateContent} />
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardView({ content }: { content: any }) {
  const totalPages = 7;
  const totalTeam = content.team?.length || 0;
  const totalFAQ = content.faq?.length || 0;
  const totalDocs = content.dokumen?.length || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Halaman', value: totalPages, icon: '📄' },
          { label: 'Tim', value: totalTeam, icon: '👥' },
          { label: 'FAQ', value: totalFAQ, icon: '❓' },
          { label: 'Dokumen', value: totalDocs, icon: '📑' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
            <p className="text-2xl font-bold gradient-text bg-gradient-to-r from-blue-400 to-purple-400">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.icon} {stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-3">Quick Info</h3>
        <div className="space-y-2 text-sm text-slate-400">
          <p>Site: <span className="text-slate-300">{content.global?.siteTitle}</span></p>
          <p>Tagline: <span className="text-slate-300">{content.global?.siteTagline}</span></p>
          <p>Hotline: <span className="text-slate-300">{content.global?.hotlinePhone}</span></p>
          <p>Email: <span className="text-slate-300">{content.global?.email}</span></p>
          <p>Data file: <code className="text-blue-300">src/data/content.json</code></p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-3">Cara Memperbarui Website Publik</h3>
      <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-400">
        <li>Pilih menu form di *sidebar* dan sesuaikan konten yang ingin diubah.</li>
        <li>Klik tombol <strong className="text-slate-200">💾 Simpan Konten</strong> di pojok kanan atas untuk menyimpan draf ke database local (`content.json`).</li>
        <li>Jika seluruh data sudah dirasa pas, tekan tombol biru <strong className="text-blue-400">🚀 Publish Website</strong>.</li>
        <li>Sistem akan menyuruh robot GitHub Actions & Cloudflare merakit ulang halaman statis. Tunggu sekitar <span className="text-blue-300 font-medium">1-2 menit</span> sampai perubahan resmi tayang di internet.</li>
      </ol>
    </div>
    </div>
  );
}

function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        {desc && <p className="text-sm text-slate-400 mt-1">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', rows }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm resize-y"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
        />
      )}
    </div>
  );
}

function ArrayEditor({ items, onChange, fields }: {
  items: any[];
  onChange: (items: any[]) => void;
  fields: { key: string; label: string; type?: string; rows?: number }[];
}) {
  const updateItem = (index: number, key: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const addItem = () => {
    const newItem: any = {};
    fields.forEach((f) => { newItem[f.key] = ''; });
    onChange([...items, newItem]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">Item {i + 1}</span>
            <button
              onClick={() => removeItem(i)}
              className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded-lg hover:bg-red-900/20 transition-colors"
            >
              Hapus
            </button>
          </div>
          {fields.map((f) => (
            <Field
              key={f.key}
              label={f.label}
              value={item[f.key] || ''}
              onChange={(v) => updateItem(i, f.key, v)}
              type={f.type}
              rows={f.rows}
            />
          ))}
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-sm text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-1.5"
      >
        + Tambah Item
      </button>
    </div>
  );
}

function HeroSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Hero Section" desc="Konten utama halaman beranda">
        <Field label="Badge" value={content.hero.badge} onChange={(v) => updateContent('hero.badge', v)} />
        <Field label="Headline" value={content.hero.headline} onChange={(v) => updateContent('hero.headline', v)} />
        <Field label="Deskripsi" value={content.hero.description} onChange={(v) => updateContent('hero.description', v)} rows={4} />
        <Field label="Background Image Path" value={content.hero.backgroundImage} onChange={(v) => updateContent('hero.backgroundImage', v)} />
      </SectionCard>

      <SectionCard title="Stat Cards" desc="3 card statistik di hero">
        <ArrayEditor
          items={content.hero.stats}
          onChange={(v) => updateContent('hero.stats', v)}
          fields={[
            { key: 'value', label: 'Value (contoh: 100+)' },
            { key: 'label', label: 'Label' },
          ]}
        />
      </SectionCard>

      <SectionCard title="CTA Buttons">
        <Field label="Tombol 1 - Label" value={content.hero.ctaPrimary.label} onChange={(v) => updateContent('hero.ctaPrimary.label', v)} />
        <Field label="Tombol 1 - Link" value={content.hero.ctaPrimary.href} onChange={(v) => updateContent('hero.ctaPrimary.href', v)} />
        <Field label="Tombol 2 - Label" value={content.hero.ctaSecondary.label} onChange={(v) => updateContent('hero.ctaSecondary.label', v)} />
        <Field label="Tombol 2 - Link" value={content.hero.ctaSecondary.href} onChange={(v) => updateContent('hero.ctaSecondary.href', v)} />
      </SectionCard>
    </div>
  );
}

function AboutSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Definisi" desc="Paragraf utama halaman about">
        <Field label="Definisi PPKPT" value={content.about.definition} onChange={(v) => updateContent('about.definition', v)} rows={6} />
      </SectionCard>

      <SectionCard title="Tujuan" desc="5 tujuan PPKPT">
        <ArrayEditor
          items={content.about.aims.map((a: string) => ({ text: a }))}
          onChange={(v) => updateContent('about.aims', v.map((i: any) => i.text))}
          fields={[{ key: 'text', label: 'Tujuan' }]}
        />
      </SectionCard>

      <SectionCard title="Ruang Lingkup" desc="6 jenis kekerasan">
        <ArrayEditor
          items={content.about.scopes}
          onChange={(v) => updateContent('about.scopes', v)}
          fields={[
            { key: 'title', label: 'Judul' },
            { key: 'desc', label: 'Deskripsi', rows: 3 },
            { key: 'icon', label: 'Icon (Shield/Brain/Heart/Monitor/UserX)' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Statistik" desc="4 card angka">
        <ArrayEditor
          items={content.about.stats}
          onChange={(v) => updateContent('about.stats', v)}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'value', label: 'Angka', type: 'number' },
            { key: 'suffix', label: 'Suffix (contoh: +, /7)' },
          ]}
        />
      </SectionCard>
    </div>
  );
}

function TeamSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <SectionCard title="Tim PPKPT" desc={`${content.team.length} anggota`}>
      <ArrayEditor
        items={content.team}
        onChange={(v) => updateContent('team', v)}
        fields={[
          { key: 'name', label: 'Nama' },
          { key: 'role', label: 'Jabatan' },
        ]}
      />
    </SectionCard>
  );
}

function AlurSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <SectionCard title="Alur Pelaporan" desc="5 langkah timeline">
      <ArrayEditor
        items={content.alur.steps}
        onChange={(v) => updateContent('alur.steps', v)}
        fields={[
          { key: 'icon', label: 'Icon (Phone/Search/Heart/SearchCheck/Scale)' },
          { key: 'title', label: 'Judul' },
          { key: 'desc', label: 'Deskripsi', rows: 4 },
        ]}
      />
    </SectionCard>
  );
}

function DokumenSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <SectionCard title="Dokumen" desc={`${content.dokumen.length} dokumen`}>
      <ArrayEditor
        items={content.dokumen}
        onChange={(v) => updateContent('dokumen', v)}
        fields={[
          { key: 'name', label: 'Nama Dokumen' },
          { key: 'desc', label: 'Deskripsi', rows: 3 },
        ]}
      />
    </SectionCard>
  );
}

function FAQSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <SectionCard title="FAQ" desc={`${content.faq.length} pertanyaan`}>
      <ArrayEditor
        items={content.faq}
        onChange={(v) => updateContent('faq', v)}
        fields={[
          { key: 'question', label: 'Pertanyaan', rows: 2 },
          { key: 'answer', label: 'Jawaban', rows: 4 },
        ]}
      />
    </SectionCard>
  );
}

function LaporSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Hero Lapor" desc="Bagian atas halaman lapor">
        <Field label="Badge" value={content.lapor.badge} onChange={(v) => updateContent('lapor.badge', v)} />
        <Field label="Headline" value={content.lapor.headline} onChange={(v) => updateContent('lapor.headline', v)} />
        <Field label="Highlight Word" value={content.lapor.headlineHighlight} onChange={(v) => updateContent('lapor.headlineHighlight', v)} />
        <Field label="Deskripsi" value={content.lapor.description} onChange={(v) => updateContent('lapor.description', v)} rows={4} />
        <Field label="Hero Image Path" value={content.lapor.heroImage} onChange={(v) => updateContent('lapor.heroImage', v)} />
        <Field label="Hero Caption" value={content.lapor.heroCaption} onChange={(v) => updateContent('lapor.heroCaption', v)} />
      </SectionCard>

      <SectionCard title="Trust Badges" desc="4 badge kepercayaan">
        <ArrayEditor
          items={content.lapor.trustBadges}
          onChange={(v) => updateContent('lapor.trustBadges', v)}
          fields={[
            { key: 'icon', label: 'Icon (Lock/Shield/Clock/Users)' },
            { key: 'label', label: 'Label' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Kontak Cards" desc="3 card kontak">
        <ArrayEditor
          items={content.lapor.contactCards}
          onChange={(v) => updateContent('lapor.contactCards', v)}
          fields={[
            { key: 'title', label: 'Judul' },
            { key: 'subtitle', label: 'Subtitle' },
            { key: 'type', label: 'Tipe (phone/whatsapp/info)' },
            { key: 'value', label: 'Value (nomor/URL)' },
            { key: 'color', label: 'Warna (red/green/blue)' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Steps Lapor" desc="4 langkah">
        <ArrayEditor
          items={content.lapor.steps}
          onChange={(v) => updateContent('lapor.steps', v)}
          fields={[
            { key: 'title', label: 'Judul' },
            { key: 'desc', label: 'Deskripsi', rows: 3 },
          ]}
        />
      </SectionCard>

      <SectionCard title="Testimonial" desc="3 testimonial">
        <ArrayEditor
          items={content.lapor.testimonials}
          onChange={(v) => updateContent('lapor.testimonials', v)}
          fields={[
            { key: 'quote', label: 'Kutipan', rows: 3 },
            { key: 'role', label: 'Peran (Mahasiswa/Saksi/dll)' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Jaminan Kerahasiaan">
        <Field label="Judul" value={content.lapor.confidentiality.title} onChange={(v) => updateContent('lapor.confidentiality.title', v)} />
        <ArrayEditor
          items={content.lapor.confidentiality.items.map((i: string) => ({ text: i }))}
          onChange={(v) => updateContent('lapor.confidentiality.items', v.map((i: any) => i.text))}
          fields={[{ key: 'text', label: 'Poin', rows: 2 }]}
        />
      </SectionCard>

      <SectionCard title="FAQ Lapor" desc="4 FAQ di halaman lapor">
        <ArrayEditor
          items={content.lapor.faq}
          onChange={(v) => updateContent('lapor.faq', v)}
          fields={[
            { key: 'q', label: 'Pertanyaan', rows: 2 },
            { key: 'a', label: 'Jawaban', rows: 4 },
          ]}
        />
      </SectionCard>

      <SectionCard title="CTA Section">
        <Field label="Judul" value={content.lapor.ctaSection.title} onChange={(v) => updateContent('lapor.ctaSection.title', v)} />
        <Field label="Body" value={content.lapor.ctaSection.body} onChange={(v) => updateContent('lapor.ctaSection.body', v)} rows={3} />
        <Field label="Phone" value={content.lapor.ctaSection.phone} onChange={(v) => updateContent('lapor.ctaSection.phone', v)} />
        <Field label="WhatsApp URL" value={content.lapor.ctaSection.whatsappUrl} onChange={(v) => updateContent('lapor.ctaSection.whatsappUrl', v)} />
      </SectionCard>
    </div>
  );
}

function FooterSectionForm({ content, updateContent }: { content: any; updateContent: (path: string, v: any) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Global Settings" desc="Informasi situs secara global">
        <Field label="Site Title" value={content.global.siteTitle} onChange={(v) => updateContent('global.siteTitle', v)} />
        <Field label="Site Tagline" value={content.global.siteTagline} onChange={(v) => updateContent('global.siteTagline', v)} />
        <Field label="Site Description" value={content.global.siteDescription} onChange={(v) => updateContent('global.siteDescription', v)} rows={3} />
        <Field label="Hotline Phone" value={content.global.hotlinePhone} onChange={(v) => updateContent('global.hotlinePhone', v)} />
        <Field label="WhatsApp URL" value={content.global.whatsappUrl} onChange={(v) => updateContent('global.whatsappUrl', v)} />
        <Field label="Email" value={content.global.email} onChange={(v) => updateContent('global.email', v)} />
        <Field label="Alamat" value={content.global.address} onChange={(v) => updateContent('global.address', v)} />
        <Field label="Jam Kerja" value={content.global.workingHours} onChange={(v) => updateContent('global.workingHours', v)} />
      </SectionCard>

      <SectionCard title="Navigation Links" desc="6 link di navbar">
        <ArrayEditor
          items={content.global.navLinks}
          onChange={(v) => updateContent('global.navLinks', v)}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'href', label: 'URL Path' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Footer">
        <Field label="Confidentiality Badge" value={content.footer.confidentialityBadge} onChange={(v) => updateContent('footer.confidentialityBadge', v)} rows={2} />
        <Field label="About Text" value={content.footer.aboutText} onChange={(v) => updateContent('footer.aboutText', v)} rows={3} />
        <ArrayEditor
          items={content.footer.affiliates.map((a: string) => ({ text: a }))}
          onChange={(v) => updateContent('footer.affiliates', v.map((i: any) => i.text))}
          fields={[{ key: 'text', label: 'Nama Afiliasi' }]}
        />
        <Field label="Copyright" value={content.footer.copyright} onChange={(v) => updateContent('footer.copyright', v)} />
      </SectionCard>

      <SectionCard title="Floating Hotline">
        <Field label="Title" value={content.floatingHotline.title} onChange={(v) => updateContent('floatingHotline.title', v)} />
        <Field label="Deskripsi" value={content.floatingHotline.description} onChange={(v) => updateContent('floatingHotline.description', v)} rows={2} />
        <Field label="Phone" value={content.floatingHotline.phone} onChange={(v) => updateContent('floatingHotline.phone', v)} />
      </SectionCard>
    </div>
  );
}
