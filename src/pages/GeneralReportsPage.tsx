import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { BentoCard } from '../components/common/BentoCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  BarChart3, 
  Download, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  FileSpreadsheet,
  Printer
} from 'lucide-react';

export const GeneralReportsPage: React.FC = () => {
  const { systemStats, devices, allAlerts, navigateTo } = useIot();
  const [reportType, setReportType] = useState<'health' | 'performance' | 'compliance'>('health');

  const topActiveDevices = [
    { name: 'Jembatan Cikubang (SHM-G14)', code: 'DEV-001', transmissions: 86400, dataVol: '48.2 MB', uptime: 99.95 },
    { name: 'Terowongan Sasaksaat (SHM-TC01)', code: 'DEV-002', transmissions: 86400, dataVol: '44.8 MB', uptime: 99.82 },
    { name: 'MRT Shield Ring 450 (MRT-CV01)', code: 'DEV-003', transmissions: 86400, dataVol: '51.3 MB', uptime: 99.98 },
    { name: 'Jembatan Cirahong (CRH-ST01)', code: 'DEV-004', transmissions: 86400, dataVol: '39.7 MB', uptime: 99.78 },
    { name: 'LRT Longspan Kuningan (LRT-ACC01)', code: 'DEV-005', transmissions: 86400, dataVol: '62.4 MB', uptime: 99.91 },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#0F4A8C] uppercase tracking-wider">
              Laporan Umum Platform SHM
            </span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-xs text-[#64748B]">KAI Daop 2 Bandung & MRT Jakarta</span>
          </div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight mt-0.5">
            Evaluasi Keandalan Prasarana Rel & Rekapitulasi Telemetri
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setReportType('health')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              reportType === 'health' ? 'bg-white text-[#0F4A8C] shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Kesehatan Sistem
          </button>
          <button
            onClick={() => setReportType('performance')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              reportType === 'performance' ? 'bg-white text-[#0F4A8C] shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Performa Sensor
          </button>
          <button
            onClick={() => setReportType('compliance')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              reportType === 'compliance' ? 'bg-white text-[#0F4A8C] shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Kepatuhan & Audit
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Total Sensor Terpantau</span>
          <div className="text-2xl font-bold font-mono text-[#0F172A] mt-1 tabular-nums">
            {systemStats.totalDevices.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-[#00A896] mt-0.5 block font-medium">100% terkoneksi gateway</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Sensor Online Aktif</span>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1 tabular-nums">
            {systemStats.onlineDevices.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-[#16A34A] mt-0.5 block font-medium">97.4% rasio online</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Rata-rata Uptime Bulanan</span>
          <div className="text-2xl font-bold font-mono text-[#0F4A8C] mt-1 tabular-nums">
            {systemStats.uptimePercent}%
          </div>
          <span className="text-[11px] text-[#475569] mt-0.5 block">Standar KAI: &gt;99.5%</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Total Kasus Peringatan</span>
          <div className="text-2xl font-bold font-mono text-[#EF4444] mt-1 tabular-nums">
            145
          </div>
          <span className="text-[11px] text-[#DC2626] mt-0.5 block">12 kritis ditangani teknisi</span>
        </div>
      </div>

      {/* Tab 1: System Health Report */}
      {reportType === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-1">
              Konsistensi Ketersediaan Jaringan Telemetri (30 Hari)
            </h3>
            <p className="text-xs text-[#64748B] mb-3">
              Fluktuasi uptime gateway LoRa/MQTT di koridor Daop 2 Bandung
            </p>

            <div className="h-44 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3 flex items-end justify-between gap-1">
              {Array.from({ length: 30 }).map((_, i) => {
                const heightPercent = 88 + (Math.sin(i * 0.5) * 6) + (i % 3 === 0 ? 4 : 0);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className="w-full bg-[#0F4A8C] hover:bg-[#00A896] rounded-t transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-black text-white text-[9px] px-1 rounded pointer-events-none whitespace-nowrap z-10">
                      Hari {i + 1}: {heightPercent.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-[#64748B] mt-2 font-mono">
              <span>01 Sep 2026</span>
              <span>15 Sep 2026</span>
              <span>23 Sep 2026</span>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-1">
              Distribusi Kategori Peringatan Struktural
            </h3>
            <p className="text-xs text-[#64748B] mb-3">
              Klasifikasi anomali telemetri yang tercatat selama Q3 2026
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#334155] font-medium">Beban Dinamik KA Lebih Cepat (Over-strain)</span>
                  <span className="font-mono font-bold text-[#0F172A]">54 kasus (37.2%)</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0F4A8C] h-full rounded-full" style={{ width: '37.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#334155] font-medium">Fluktuasi Suhu Ekstrem Rel / Jembatan</span>
                  <span className="font-mono font-bold text-[#0F172A]">45 kasus (31.0%)</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00A896] h-full rounded-full" style={{ width: '31%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#334155] font-medium">Konvergensi / Deformasi Terowongan</span>
                  <span className="font-mono font-bold text-[#0F172A]">34 kasus (23.4%)</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '23.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#334155] font-medium">Emisi Akustik Retak Mikro (Crack Propagation)</span>
                  <span className="font-mono font-bold text-[#DC2626]">12 kasus (8.4%)</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#EF4444] h-full rounded-full" style={{ width: '8.4%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Device Performance Report */}
      {reportType === 'performance' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <h3 className="text-sm font-semibold text-[#0F172A] mb-1">
            Top 5 Sensor Paling Aktif (Volume Data Terbesar)
          </h3>
          <p className="text-xs text-[#64748B] mb-3">
            Perangkat dengan frekuensi transmisi 100Hz tanpa jeda paket hilang
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                  <th className="py-2.5 px-3 font-semibold">Nama Sensor & Kode</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Jumlah Transmisi (24 Jam)</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Volume Data Ditransfer</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Uptime Bulan Ini</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Integritas Paket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {topActiveDevices.map(item => (
                  <tr key={item.code} className="hover:bg-[#F8FAFC]">
                    <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                      {item.name} <span className="font-mono text-[#0F4A8C]">({item.code})</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                      {item.transmissions.toLocaleString('id-ID')} paket
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-[#0F4A8C]">
                      {item.dataVol}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#16A34A] font-bold">
                      {item.uptime}%
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[11px] text-[#16A34A] font-medium bg-[#DCFCE7] px-2 py-0.5 rounded">
                        100% Tanpa Loss
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Compliance & Audit */}
      {reportType === 'compliance' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Audit Kepatuhan Standardisasi Kemenhub & KAI
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Verifikasi kelayakan operasional jembatan warisan (heritage) dan terowongan tua
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#0F172A]">PM 60 Tahun 2012 tentang Persyaratan Teknis Jalur KA</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Inspeksi periodik lendutan sambungan gelagar jembatan Cikubang & Cirahong</div>
              </div>
              <span className="text-[#16A34A] font-semibold bg-[#DCFCE7] px-2.5 py-1 rounded">
                PATUH (100%)
              </span>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#0F172A]">Instruksi Direksi KAI No. 12/PRAS/2024 (Pemantauan Terowongan Tua)</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Pemasangan laser konvergensi dinding terowongan Sasaksaat 1902</div>
              </div>
              <span className="text-[#16A34A] font-semibold bg-[#DCFCE7] px-2.5 py-1 rounded">
                TERVERIFIKASI
              </span>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#0F172A]">Audit Kalibrasi Sensor Regangan & Akselerometer</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Kalibrasi laboratorium berkala sensor Strulytic dengan sertifikat KAN</div>
              </div>
              <span className="text-[#0F4A8C] font-semibold bg-[#EFF6FF] px-2.5 py-1 rounded">
                Berlaku hingga Des 2026
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
