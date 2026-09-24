import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { InteractiveMap } from '../components/visualization/InteractiveMap';
import { MiniSparkline } from '../components/visualization/MiniSparkline';
import { 
  Building2, 
  MapPin, 
  Cpu, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  Calendar, 
  Download, 
  ArrowLeft,
  List,
  LayoutGrid,
  Map as MapIcon,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const DeviceGroupPage: React.FC = () => {
  const { 
    currentGroup, 
    devices, 
    navigateTo, 
    allAlerts,
    acknowledgeAlert 
  } = useIot();

  const [deviceTab, setDeviceTab] = useState<'list' | 'card' | 'map'>('list');

  // Filter devices belonging to this group
  const groupDevices = devices.filter(d => d.groupId === currentGroup.id);
  const groupAlerts = allAlerts.filter(a => a.groupId === currentGroup.id);

  const exportGroupCSV = () => {
    const headers = ['Kode Sensor', 'Nama Sensor', 'Tipe', 'KM Pos', 'Status', 'Metrik Utama', 'Uptime %'];
    const rows = groupDevices.map(d => [
      d.code,
      `"${d.name}"`,
      d.typeLabel,
      d.location.kilometerPost,
      d.status,
      `${d.metrics.metric1.value} ${d.metrics.metric1.unit}`,
      d.uptime.thisMonth
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = `strulytic_group_${currentGroup.code}_report.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Group Header & Meta */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigateTo('dashboard')}
              className="p-1.5 rounded-lg border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#475569] transition-colors mt-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0F4A8C]">{currentGroup.code}</span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="text-xs text-[#64748B]">{currentGroup.division}</span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="text-xs text-[#00A896] font-medium">Tahun {currentGroup.yearBuilt} ({currentGroup.structureHeritageGrade})</span>
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight mt-0.5">
                {currentGroup.name}
              </h2>
              <p className="text-xs text-[#475569] mt-1 max-w-3xl leading-relaxed">
                {currentGroup.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={exportGroupCSV}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F4A8C] rounded-lg text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Laporan Koridor</span>
            </button>
            <StatusBadge status={currentGroup.status} />
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#F1F5F9] text-xs">
          <div className="flex items-center gap-2 text-[#475569]">
            <Cpu className="w-4 h-4 text-[#0F4A8C]" />
            <span>Total Sensor: <strong className="text-[#0F172A] font-mono">{currentGroup.deviceCount} unit</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#475569]">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span>Online: <strong className="text-[#16A34A] font-mono">{currentGroup.onlineCount} unit</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#475569]">
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            <span>Peringatan: <strong className="text-[#EF4444] font-mono">{currentGroup.activeAlerts} terdeteksi</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#475569]">
            <Calendar className="w-4 h-4 text-[#64748B]" />
            <span>Pembaruan: <strong className="text-[#0F172A]">{currentGroup.lastUpdated}</strong></span>
          </div>
        </div>
      </div>

      {/* Aggregated Metrics Cards (PRD Section 4.5.b) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Suhu Rata-rata Struktur</span>
          <div className="text-2xl font-bold font-mono text-[#0F172A] mt-1 tabular-nums">
            {currentGroup.aggregatedMetrics.avgTemperature} <span className="text-xs font-normal text-[#64748B]">°C</span>
          </div>
          <div className="mt-2 text-[11px] text-[#475569]">
            Rentang: {currentGroup.aggregatedMetrics.minTemperature ?? (currentGroup.aggregatedMetrics.avgTemperature - 3.2).toFixed(1)}°C – {currentGroup.aggregatedMetrics.maxTemperature ?? (currentGroup.aggregatedMetrics.avgTemperature + 4.8).toFixed(1)}°C
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Regangan / Tekanan Dinamis Rata-rata</span>
          <div className="text-2xl font-bold font-mono text-[#0F4A8C] mt-1 tabular-nums">
            {currentGroup.aggregatedMetrics.avgStressMPa ?? currentGroup.aggregatedMetrics.avgStrainMicrostrain} <span className="text-xs font-normal text-[#64748B]">µε / MPa</span>
          </div>
          <div className="mt-2 text-[11px] text-[#16A34A] font-medium">
            Tegangan kerja di bawah batas izin yield
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Rasio Ketersediaan Sensor (Online Rate)</span>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1 tabular-nums">
            {(currentGroup.aggregatedMetrics.onlineRate * 100).toFixed(1)}%
          </div>
          <div className="mt-2 text-[11px] text-[#64748B]">
            {currentGroup.onlineCount} dari {currentGroup.deviceCount} sensor aktif transmisi
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Ringkasan Peringatan Koridor</span>
          <div className="text-2xl font-bold font-mono text-[#EF4444] mt-1 tabular-nums">
            {currentGroup.activeAlerts} <span className="text-xs font-normal text-[#64748B]">kasus</span>
          </div>
          <div className="mt-2 text-[11px] text-[#DC2626]">
            {currentGroup.criticalAlerts} tingkat bahaya kritikal
          </div>
        </div>
      </div>

      {/* Interactive Group Map */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0F4A8C]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Peta Lokasi & Penempatan Sensor ({currentGroup.name})
            </h3>
          </div>
          <span className="text-xs font-mono text-[#64748B]">
            Koordinat: {currentGroup.coordinates[0]}, {currentGroup.coordinates[1]}
          </span>
        </div>
        <InteractiveMap
          devices={groupDevices}
          center={currentGroup.coordinates}
          zoom={14}
          height="320px"
        />
      </div>

      {/* Devices in this group (Tabbed: List / Card / Map) */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Daftar Sensor Terpasang pada Koridor Ini ({groupDevices.length} Unit)
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Klik sensor untuk membuka visualisasi 3D dan telemetri detail
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg">
            <button
              onClick={() => setDeviceTab('list')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                deviceTab === 'list' ? 'bg-white text-[#0F4A8C] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Tabel
            </button>
            <button
              onClick={() => setDeviceTab('card')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                deviceTab === 'card' ? 'bg-white text-[#0F4A8C] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Kartu
            </button>
          </div>
        </div>

        {/* Tab 1: List View */}
        {deviceTab === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                  <th className="py-2.5 px-3 font-semibold">Nama & Kode Sensor</th>
                  <th className="py-2.5 px-3 font-semibold">Tipe Instrumen</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold">Metrik Terukur</th>
                  <th className="py-2.5 px-3 font-semibold">Peringatan</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Uptime</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {groupDevices.map(dev => (
                  <tr key={dev.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#0F172A] font-mono">{dev.code}</div>
                      <div className="text-[11px] text-[#64748B]">{dev.name}</div>
                    </td>
                    <td className="py-2.5 px-3 text-[#334155]">{dev.typeLabel}</td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={dev.status} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-[#0F172A]">
                      {dev.metrics.metric1.value} {dev.metrics.metric1.unit}
                    </td>
                    <td className="py-2.5 px-3">
                      {dev.alerts.length > 0 ? (
                        <span className="text-[10px] font-bold text-[#EF4444] bg-[#FEF2F2] px-2 py-0.5 rounded">
                          {dev.alerts.length} Aktif
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#94A3B8]">Normal</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-[#16A34A]">
                      {dev.uptime.thisMonth}%
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => navigateTo('device-detail', { deviceId: dev.id })}
                        className="px-2.5 py-1 text-xs font-semibold text-[#0F4A8C] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded transition-colors"
                      >
                        Detail 3D
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Card View */}
        {deviceTab === 'card' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {groupDevices.map(dev => (
              <div
                key={dev.id}
                onClick={() => navigateTo('device-detail', { deviceId: dev.id })}
                className="cursor-pointer p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F4A8C] rounded-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#0F4A8C]">{dev.code}</span>
                  <StatusBadge status={dev.status} size="sm" />
                </div>
                <h4 className="text-xs font-bold text-[#0F172A] mt-1 truncate">{dev.name}</h4>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">{dev.metrics.metric1.label}:</span>
                  <span className="font-mono font-semibold text-[#0F172A]">
                    {dev.metrics.metric1.value} {dev.metrics.metric1.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Group-Level Alerts Roll-up */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Daftar Seluruh Peringatan Koridor Ini ({groupAlerts.length})
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Urutan berdasarkan tingkat urgensi keselamatan konstruksi
            </p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {groupAlerts.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#64748B]">
              Tidak ada peringatan aktif di koridor jembatan/terowongan ini.
            </div>
          ) : (
            groupAlerts.map(alert => (
              <div
                key={alert.id}
                className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={alert.severity} size="sm" />
                    <span className="font-semibold text-[#0F172A]">{alert.deviceName}:</span>
                    <span className="text-[#475569]">{alert.message}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('device-detail', { deviceId: alert.deviceId })}
                  className="px-2.5 py-1 text-xs font-semibold text-[#0F4A8C] bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] rounded shrink-0"
                >
                  Inspeksi →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
