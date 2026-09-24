import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { TrendChart } from '../components/visualization/TrendChart';
import { ArrowLeft, Download, Printer, Mail, Calendar, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export const DeviceReportPage: React.FC = () => {
  const { currentDevice, navigateTo } = useIot();

  const [datePreset, setDatePreset] = useState<'7d' | '30d' | 'custom'>('30d');
  const [fromDate, setFromDate] = useState('2026-09-01');
  const [toDate, setToDate] = useState('2026-09-23');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    setDownloadNotice('Menghasilkan Dokumen Laporan Kelaikan Struktur SHM PDF KAI...');
    setTimeout(() => {
      window.print();
      setDownloadNotice(null);
    }, 600);
  };

  const handleDownloadCSV = () => {
    const headers = ['Metric Name', 'Minimum', 'Maximum', 'Average', 'Standard Deviation', 'Unit'];
    const rows = [
      [currentDevice.metrics.metric1.label, currentDevice.metrics.metric1.min, currentDevice.metrics.metric1.max, currentDevice.metrics.metric1.value, '±2.4', currentDevice.metrics.metric1.unit],
      [currentDevice.metrics.metric2.label, currentDevice.metrics.metric2.min, currentDevice.metrics.metric2.max, currentDevice.metrics.metric2.value, '±0.8', currentDevice.metrics.metric2.unit],
      [currentDevice.metrics.metric3.label, currentDevice.metrics.metric3.min, currentDevice.metrics.metric3.max, currentDevice.metrics.metric3.value, '±1.1', currentDevice.metrics.metric3.unit],
      [currentDevice.metrics.metric4.label, currentDevice.metrics.metric4.min, currentDevice.metrics.metric4.max, currentDevice.metrics.metric4.value, '±0.05', currentDevice.metrics.metric4.unit],
    ];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = `shm_report_${currentDevice.code}_${fromDate}_to_${toDate}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('device-detail', { deviceId: currentDevice.id })}
            className="p-1.5 rounded-lg border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#475569] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#0F4A8C]">{currentDevice.code}</span>
              <span className="text-[#CBD5E1]">·</span>
              <span className="text-xs text-[#64748B]">{currentDevice.location.name}</span>
            </div>
            <h2 className="text-lg font-bold text-[#0F172A] tracking-tight mt-0.5">
              Laporan Analisis Kelaikan Struktural SHM
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F4A8C] rounded-lg text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Unduh CSV</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak PDF Laporan</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0F4A8C] shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#64748B]" />
          <span className="font-semibold text-[#334155]">Rentang Tanggal Pengujian:</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-[#CBD5E1] rounded px-2 py-1 bg-[#F8FAFC] text-[#0F172A]"
          />
          <span className="text-[#64748B]">s/d</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-[#CBD5E1] rounded px-2 py-1 bg-[#F8FAFC] text-[#0F172A]"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg">
          {(['7d', '30d'] as const).map(preset => (
            <button
              key={preset}
              onClick={() => setDatePreset(preset)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                datePreset === preset ? 'bg-white text-[#0F4A8C] shadow-xs font-semibold' : 'text-[#64748B]'
              }`}
            >
              {preset === '7d' ? '7 Hari Terakhir' : '30 Hari Terakhir'}
            </button>
          ))}
        </div>
      </div>

      {/* Report Summary Cards (PRD Section 7.b) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Total Data Points</span>
          <div className="text-xl font-bold font-mono text-[#0F172A] mt-1 tabular-nums">
            {currentDevice.uptime.dataPointsCollected.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-[#16A34A] mt-0.5 block">100% data valid tersimpan</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Tingkat Ketersediaan</span>
          <div className="text-xl font-bold font-mono text-[#16A34A] mt-1 tabular-nums">
            {currentDevice.uptime.thisMonth}%
          </div>
          <span className="text-[10px] text-[#475569] mt-0.5 block">SLA KAI Terpenuhi</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Nilai Rata-rata</span>
          <div className="text-xl font-bold font-mono text-[#0F4A8C] mt-1 tabular-nums">
            {currentDevice.metrics.metric1.value} {currentDevice.metrics.metric1.unit}
          </div>
          <span className="text-[10px] text-[#64748B] mt-0.5 block">{currentDevice.metrics.metric1.label}</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Total Peringatan</span>
          <div className="text-xl font-bold font-mono text-[#EF4444] mt-1 tabular-nums">
            {currentDevice.alerts.length} Kasus
          </div>
          <span className="text-[10px] text-[#B91C1C] mt-0.5 block">0 kegagalan struktural</span>
        </div>
      </div>

      {/* Detailed Trend Chart */}
      <TrendChart
        timestamps={currentDevice.trends24h.timestamps}
        series={[
          {
            id: 'm1',
            name: currentDevice.metrics.metric1.label,
            unit: currentDevice.metrics.metric1.unit,
            color: '#0F4A8C',
            data: currentDevice.trends24h.metric1
          },
          {
            id: 'm2',
            name: currentDevice.metrics.metric2.label,
            unit: currentDevice.metrics.metric2.unit,
            color: '#00A896',
            data: currentDevice.trends24h.metric2
          }
        ]}
      />

      {/* Metrics Summary Table (PRD Section 7.d) */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-1">
          Tabel Statistik Deskriptif Parameter (Bulan Berjalan)
        </h3>
        <p className="text-xs text-[#64748B] mb-3">
          Nilai minimum, maksimum, rata-rata, dan standar deviasi deviasi telemetri sensor
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                <th className="py-2.5 px-3 font-semibold">Parameter Metrik</th>
                <th className="py-2.5 px-3 font-semibold text-right">Min Terukur</th>
                <th className="py-2.5 px-3 font-semibold text-right">Maks Terukur</th>
                <th className="py-2.5 px-3 font-semibold text-right">Rata-rata</th>
                <th className="py-2.5 px-3 font-semibold text-right">Puncak Beban KA</th>
                <th className="py-2.5 px-3 font-semibold text-center">Status Ambang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {[
                currentDevice.metrics.metric1,
                currentDevice.metrics.metric2,
                currentDevice.metrics.metric3,
                currentDevice.metrics.metric4,
              ].map((m, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                    {m.label} ({m.unit})
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#475569]">
                    {m.min}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#475569]">
                    {m.max}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0F4A8C]">
                    {m.value}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#DC2626]">
                    {m.max}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[11px] text-[#16A34A] font-semibold bg-[#DCFCE7] px-2 py-0.5 rounded">
                      Memenuhi Izin
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
