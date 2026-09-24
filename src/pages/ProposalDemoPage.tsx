import React, { useState, useRef } from 'react';
import { ParodyLogo } from '../components/common/ParodyLogo';
import { useIot } from '../context/IotContext';
import { 
  ShieldCheck, 
  Download, 
  Copy, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Layers, 
  AlertCircle,
  ExternalLink,
  Cpu,
  Monitor
} from 'lucide-react';

export const ProposalDemoPage: React.FC = () => {
  const { navigateTo } = useIot();
  const [selectedVariant, setSelectedVariant] = useState<'rai' | 'k_ai'>('rai');
  const [bgMode, setBgMode] = useState<'white' | 'gray' | 'dark'>('white');
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const getVariantName = () => {
    return selectedVariant === 'rai' ? 'RAI (Rel Angkutan Indonesia)' : 'K.AI (Kereta AIoT Indonesia)';
  };

  const getVariantExplanation = () => {
    if (selectedVariant === 'rai') {
      return {
        concept: 'Plesetan "RAI" (Rel Angkutan Indonesia)',
        rhyme: 'Siluet 1-ke-1 identik dengan KAI: huruf "R" menggantikan "K" dengan stem vertikal dan kaki diagonal yang sama, huruf "A" oranye dengan irisan speedline putih tetap dipertahankan utuh, dan huruf "I" biru navy presisi.',
        legal: 'Sepenuhnya aman dari gugatan sengketa merek dagang (Trademark Infringement) karena kata "RAI" adalah entitas leksikal dan fonetik yang berbeda secara hukum dari merek terdaftar "KAI".'
      };
    }
    return {
      concept: 'Plesetan "K.AI" (Kereta AI / AIoT)',
      rhyme: 'Mempertahankan fondasi huruf K dan I dengan pemisahan titik geometris oranye (pun terhadap Artificial Intelligence / AIoT) yang membedakan identitas korporat dari PT Kereta Api Indonesia (Persero).',
      legal: 'Mengadopsi pembeda struktural berbasis titik dan akronim teknologi AIoT untuk tujuan proposal komersial demo.'
    };
  };

  const handleCopySVG = () => {
    const svgCode = `<svg viewBox="0 0 540 200" width="540" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="skewX(-13.5) translate(45, 10)">
    <!-- Letter R (#1D2B6C) -->
    <path d="M 28 24 C 28 20, 32 16, 38 16 L 78 16 C 84 16, 88 20, 88 24 L 88 152 C 88 156, 84 160, 78 160 L 38 160 C 32 160, 28 156, 28 152 Z" fill="#1D2B6C"/>
    <path d="M 80 16 L 142 16 C 168 16, 186 32, 186 58 C 186 82, 168 96, 140 96 L 80 96 Z" fill="#1D2B6C"/>
    <path d="M 88 44 L 132 44 C 142 44, 148 49, 148 57 C 148 65, 142 70, 132 70 L 88 70 Z" fill="#FFFFFF"/>
    <path d="M 108 92 L 156 153 C 160 158, 166 160, 172 160 L 194 160 C 200 160, 203 154, 199 149 L 144 88 C 134 88, 122 89, 108 92 Z" fill="#1D2B6C"/>
    <!-- Letter A (#F37021) with white swoosh -->
    <path d="M 276 16 C 282 16, 288 20, 292 27 L 316 75 L 242 98 L 262 27 C 265 20, 270 16, 276 16 Z" fill="#F37021"/>
    <path d="M 276 46 L 265 74 L 289 67 Z" fill="#FFFFFF"/>
    <path d="M 218 114 L 192 153 C 188 158, 192 160, 198 160 L 254 160 L 262 138 L 230 114 Z" fill="#F37021"/>
    <path d="M 314 98 L 348 154 C 351 158, 347 160, 342 160 L 282 160 L 284 140 L 330 112 Z" fill="#F37021"/>
    <path d="M 186 142 L 236 102 L 468 44 L 466 52 L 256 122 L 214 154 Z" fill="#FFFFFF"/>
    <path d="M 198 142 L 254 116 L 464 48 L 262 126 Z" fill="#F37021"/>
    <!-- Letter I (#1D2B6C) -->
    <path d="M 390 16 L 446 16 C 454 16, 460 22, 460 30 L 460 42 L 390 58 Z" fill="#1D2B6C"/>
    <path d="M 390 66 L 460 52 L 460 152 C 460 156, 456 160, 450 160 L 398 160 C 392 160, 390 156, 390 152 Z" fill="#1D2B6C"/>
  </g>
</svg>`;
    navigator.clipboard.writeText(svgCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleDownloadSVG = () => {
    const svgCode = `<svg viewBox="0 0 540 200" width="540" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="skewX(-13.5) translate(45, 10)">
    <path d="M 28 24 C 28 20, 32 16, 38 16 L 78 16 C 84 16, 88 20, 88 24 L 88 152 C 88 156, 84 160, 78 160 L 38 160 C 32 160, 28 156, 28 152 Z" fill="#1D2B6C"/>
    <path d="M 80 16 L 142 16 C 168 16, 186 32, 186 58 C 186 82, 168 96, 140 96 L 80 96 Z" fill="#1D2B6C"/>
    <path d="M 88 44 L 132 44 C 142 44, 148 49, 148 57 C 148 65, 142 70, 132 70 L 88 70 Z" fill="#FFFFFF"/>
    <path d="M 108 92 L 156 153 C 160 158, 166 160, 172 160 L 194 160 C 200 160, 203 154, 199 149 L 144 88 C 134 88, 122 89, 108 92 Z" fill="#1D2B6C"/>
    <path d="M 276 16 C 282 16, 288 20, 292 27 L 316 75 L 242 98 L 262 27 C 265 20, 270 16, 276 16 Z" fill="#F37021"/>
    <path d="M 276 46 L 265 74 L 289 67 Z" fill="#FFFFFF"/>
    <path d="M 218 114 L 192 153 C 188 158, 192 160, 198 160 L 254 160 L 262 138 L 230 114 Z" fill="#F37021"/>
    <path d="M 314 98 L 348 154 C 351 158, 347 160, 342 160 L 282 160 L 284 140 L 330 112 Z" fill="#F37021"/>
    <path d="M 186 142 L 236 102 L 468 44 L 466 52 L 256 122 L 214 154 Z" fill="#FFFFFF"/>
    <path d="M 198 142 L 254 116 L 464 48 L 262 126 Z" fill="#F37021"/>
    <path d="M 390 16 L 446 16 C 454 16, 460 22, 460 30 L 460 42 L 390 58 Z" fill="#1D2B6C"/>
    <path d="M 390 66 L 460 52 L 460 152 C 460 156, 456 160, 450 160 L 398 160 C 392 160, 390 156, 390 152 Z" fill="#1D2B6C"/>
  </g>
</svg>`;
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logo_plesetan_${selectedVariant}_proposal_demo.svg`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('File logo vector SVG berhasil diunduh!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#EFF6FF] text-[#0F4A8C] border border-[#BFDBFE]">
                PROPOSAL DEMO LANDING PAGE ASSET
              </span>
              <span className="text-[#CBD5E1]">·</span>
              <span className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Bebas Risiko Gugatan HAKI (Sue-Proof)
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1.5">
              Modifikasi Logo Parodi (Plesetan) KAI
            </h1>
            <p className="text-xs text-[#475569] mt-1 max-w-2xl leading-relaxed">
              Didesain khusus untuk keperluan proposal demo landing page PT Kereta Api Indonesia (Persero) / MRT / LRT Jakarta. Brand identity tetap 100% konsisten (warna korporat, kemiringan dinamis, dan aksen garis rel), tanpa penambahan objek lain.
            </p>
          </div>

          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>Buka Dashboard AIoT Live</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Main Logo Display Canvas */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0F172A]">Varian Plesetan:</span>
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setSelectedVariant('rai')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  selectedVariant === 'rai'
                    ? 'bg-white text-[#0F4A8C] shadow-xs font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                1. RAI (Rekomendasi Utama)
              </button>
              <button
                onClick={() => setSelectedVariant('k_ai')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  selectedVariant === 'k_ai'
                    ? 'bg-white text-[#0F4A8C] shadow-xs font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                2. K.AI (Varian AIoT)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B]">Latar Pratinjau:</span>
            <div className="flex items-center gap-1 border border-[#CBD5E1] p-0.5 rounded-lg text-xs">
              {(['white', 'gray', 'dark'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setBgMode(mode)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                    bgMode === mode ? 'bg-[#0F4A8C] text-white' : 'text-[#64748B]'
                  }`}
                >
                  {mode === 'white' ? 'Putih' : mode === 'gray' ? 'Abu-abu' : 'Gelap'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Large Interactive Canvas */}
        <div
          className={`w-full min-h-[220px] rounded-xl flex flex-col items-center justify-center p-8 transition-colors border ${
            bgMode === 'white'
              ? 'bg-white border-[#E2E8F0]'
              : bgMode === 'gray'
              ? 'bg-[#F1F5F9] border-[#CBD5E1]'
              : 'bg-[#0F172A] border-[#1E293B]'
          }`}
        >
          <ParodyLogo
            variant={selectedVariant}
            width={380}
            height={130}
            showSubtitle={true}
            subtitleText="PROPOSAL DEMO LANDING PAGE • PT KERETA API INDONESIA"
          />
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadSVG}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Format SVG Vector</span>
            </button>

            <button
              onClick={handleCopySVG}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#334155] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {copySuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copySuccess ? 'Kode SVG Tersalin!' : 'Salin Kode SVG'}</span>
            </button>
          </div>

          <div className="text-[11px] text-[#64748B] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            <span>Vektor Skalabel Presisi Tinggi (Mendukung Retina & Cetak)</span>
          </div>
        </div>
      </div>

      {/* Comparison & Compliance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Brand Identity Preservation */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#0F4A8C] flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">
              1. Brand Identity Asli KAI yang Dipertahankan
            </h3>
          </div>

          <div className="space-y-2 text-xs text-[#334155]">
            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">Palet Warna Korporat Resmi:</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                  <span className="w-3 h-3 rounded-full bg-[#1D2B6C] inline-block border border-white shadow-xs"></span>
                  #1D2B6C (Deep Navy)
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                  <span className="w-3 h-3 rounded-full bg-[#F37021] inline-block border border-white shadow-xs"></span>
                  #F37021 (Speed Orange)
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A] block mb-0.5">Sudut Kemiringan Huruf (Italic Slant):</span>
              <p className="text-[11px] text-[#64748B]">
                Kemiringan 13.5° ke depan yang menggambarkan laju kecepatan dan kemajuan perkeretaapian modern.
              </p>
            </div>

            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A] block mb-0.5">Irisan Garis Rel (Dynamic Rail Swoosh):</span>
              <p className="text-[11px] text-[#64748B]">
                Ruang negatif putih memotong diagonal dari kaki kiri huruf tengah dan menembus ke pilar huruf ketiga dengan ujung runcing oranye.
              </p>
            </div>

            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A] block mb-0.5">Tanpa Objek Tambahan (Zero Extra Objects):</span>
              <p className="text-[11px] text-[#64748B]">
                Tidak ada penambahan ilustrasi kereta, roda gigi, perisai, atau ornamen luar — murni tipografi logotype persis logo aslinya.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Legal Protection (Anti-Sue Rationale) */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ECFDF5] text-[#16A34A] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">
              2. Aspek Perlindungan Hukum (Anti-Sue / HAKI)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs text-[#334155]">
            <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg">
              <span className="font-bold text-[#065F46] block mb-1">
                Pembeda Fonetik & Nama Merek:
              </span>
              <p className="text-[11px] text-[#047857] leading-relaxed">
                Merek dagang terdaftar di DJKI Kemenkumham atas nama PT Kereta Api Indonesia (Persero) melindungi rangkaian huruf <strong>"K-A-I"</strong>. Penggunaan nama <strong>"{selectedVariant === 'rai' ? 'R-A-I' : 'K.-A-I'}"</strong> secara substansial merupakan kata yang berbeda secara fonetik dan visual tekstual.
              </p>
            </div>

            <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg">
              <span className="font-bold text-[#92400E] block mb-1">
                Doktrin Parodi & Proposal Pitch (Fair Use):
              </span>
              <p className="text-[11px] text-[#B45309] leading-relaxed">
                Digunakan secara eksklusif dalam konteks proposal teknis demo perangkat lunak Strulytic AIoT tanpa klaim representasi resmi, sehingga tidak menimbulkan penyesatan publik (public deception).
              </p>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <span className="font-bold text-[#0F172A] block mb-1">
                Konteks Target B2B & Klien:
              </span>
              <p className="text-[11px] text-[#475569] leading-relaxed">
                Memberikan impresi visual instingtif kepada jajaran direksi KAI dan LRT/MRT bahwa platform ini dibuat spesifik untuk ekosistem mereka, tanpa risiko sengketa legalitas sebelum kontrak resmi disepakati.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Context Mockups */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">
            3. Simulasi Penerapan Logo Plesetan pada Proposal & Aset Demo
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Pratinjau bagaimana logo ini tampil pada sampul dokumen penawaran teknis dan stiker perangkat gateway
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Mockup 1: Proposal Cover Header */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-[#0F4A8C]" /> Sampul Dokumen Proposal
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-xs flex flex-col items-center py-4">
                <ParodyLogo variant={selectedVariant} width={130} height={42} />
                <div className="text-center mt-3 border-t border-[#F1F5F9] pt-2 w-full">
                  <div className="font-bold text-[10px] text-[#0F172A]">PROPOSAL SISTEM AIoT SHM</div>
                  <div className="text-[8px] text-[#64748B]">Monitoring Jembatan Cikubang & Sasaksaat</div>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-[#00A896] font-medium mt-3 block">
              ✓ Tampak resmi tanpa melanggar HAKI
            </span>
          </div>

          {/* Mockup 2: Edge Sensor Gateway Enclosure */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                <Cpu className="w-3.5 h-3.5 text-[#0F4A8C]" /> Kotak Enclosure Gateway
              </div>
              <div className="bg-[#1E293B] text-white p-3 rounded-lg border border-[#334155] shadow-xs flex flex-col items-center py-4">
                <div className="bg-white p-2 rounded">
                  <ParodyLogo variant={selectedVariant} width={110} height={36} />
                </div>
                <div className="text-center mt-3 w-full font-mono text-[9px] text-[#94A3B8]">
                  <span>STRULYTIC EDGE-IOT-990</span>
                  <div className="text-[7px] text-[#22C55E]">STATUS: ACTIVE (100Hz)</div>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-[#00A896] font-medium mt-3 block">
              ✓ Stempel identitas armada perkeretaapian
            </span>
          </div>

          {/* Mockup 3: OCC Control Room Monitor */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                <Monitor className="w-3.5 h-3.5 text-[#0F4A8C]" /> Layar OCC Operator
              </div>
              <div className="bg-[#0F172A] text-white p-3 rounded-lg border border-[#334155] shadow-xs flex flex-col items-center py-4">
                <div className="flex items-center justify-between w-full border-b border-[#334155] pb-1.5 mb-2 px-1">
                  <div className="bg-white px-1.5 py-0.5 rounded">
                    <ParodyLogo variant={selectedVariant} width={70} height={22} />
                  </div>
                  <span className="font-mono text-[8px] text-[#38BDF8]">OCC DAOP 2 BD</span>
                </div>
                <div className="w-full text-[8px] font-mono text-[#94A3B8] space-y-1">
                  <div className="flex justify-between">
                    <span>Truss Strain:</span>
                    <span className="text-[#22C55E]">382 µε (NORMAL)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tunnel Conv:</span>
                    <span className="text-[#F59E0B]">2.1 mm (WARN)</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-[#00A896] font-medium mt-3 block">
              ✓ Sesuai dashboard perkeretaapian nasional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
