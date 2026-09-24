import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { MiniSparkline } from '../components/visualization/MiniSparkline';
import { ThreeDeviceViewer } from '../components/visualization/ThreeDeviceViewer';
import { TrendChart } from '../components/visualization/TrendChart';
import { 
  ArrowLeft, 
  Settings, 
  FileText, 
  TestTube2, 
  Building2, 
  Wifi, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  RotateCw,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const DeviceDetailPage: React.FC = () => {
  const { 
    currentDevice, 
    navigateTo, 
    acknowledgeAlert 
  } = useIot();

  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState<'all' | 'ALERT' | 'STATUS' | 'METRIC' | 'CONFIG'>('all');

  const runConnectivityTest = () => {
    setTestStatus('Mengirim paket PING telemetri MQTT...');
    setTimeout(() => {
      setTestStatus(`Koneksi Sukses! Latensi: 24ms · RSSI: -64 dBm · Kualitas Sinyal: 98% (KAI LoRa-WAN GW01)`);
      setTimeout(() => {
        setTestStatus(null);
      }, 5000);
    }, 800);
  };

  const metricEntries = [
    { key: 'metric1', data: currentDevice.metrics.metric1 },
    { key: 'metric2', data: currentDevice.metrics.metric2 },
    { key: 'metric3', data: currentDevice.metrics.metric3 },
    { key: 'metric4', data: currentDevice.metrics.metric4 },
  ];

  const filteredEvents = currentDevice.eventLog.filter(e => 
    eventFilter === 'all' || e.type === eventFilter
  );

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('devices')}
            className="p-1.5 rounded-lg border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#475569] transition-colors"
            title="Kembali ke Daftar Sensor"
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
              {currentDevice.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={currentDevice.status} />
          <span className="text-xs text-[#64748B] font-mono hidden sm:inline">
            Sinkron: {currentDevice.connection.lastSync}
          </span>
        </div>
      </div>

      {/* Connectivity Test Banner */}
      {testStatus && (
        <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-xs text-[#1E40AF] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#0F4A8C] shrink-0" />
            <span>{testStatus}</span>
          </div>
          <button
            onClick={() => setTestStatus(null)}
            className="text-xs font-semibold text-[#1E40AF] hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* 3-COLUMN SPLIT VIEW LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Device Meta & Specs (Fixed 3 cols on large) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Metadata Instrumen
              </span>
              <div className="mt-2 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Tipe Sensor:</span>
                  <span className="font-medium text-[#0F172A]">{currentDevice.typeLabel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Koridor Aset:</span>
                  <span className="font-medium text-[#0F172A] truncate max-w-36 text-right">
                    {currentDevice.groupName}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Posisi Titik (KM):</span>
                  <span className="font-mono font-medium text-[#0F172A]">
                    {currentDevice.location.kilometerPost}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Protokol / IP:</span>
                  <span className="font-mono text-[#0F172A]">
                    {currentDevice.connection.protocol} ({currentDevice.connection.ipAddress})
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#64748B]">Kualitas Sinyal:</span>
                  <span className="font-mono text-[#16A34A] font-semibold">
                    {currentDevice.connection.quality}%
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="pt-2 border-t border-[#E2E8F0]">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">
                Keandalan & SLA
              </span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Uptime Bulan Ini</span>
                  <span className="text-sm font-bold font-mono text-[#16A34A] mt-0.5 block">
                    {currentDevice.uptime.thisMonth}%
                  </span>
                </div>
                <div className="p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">MTBF</span>
                  <span className="text-sm font-bold font-mono text-[#0F172A] mt-0.5 block">
                    {currentDevice.uptime.mtbfHours} jam
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Tindakan Operasional
              </span>
              <button
                onClick={() => navigateTo('device-config', { deviceId: currentDevice.id })}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#0F4A8C] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5" /> Konfigurasi Ambang Batas
                </span>
                <span>→</span>
              </button>
              <button
                onClick={() => navigateTo('device-reports', { deviceId: currentDevice.id })}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#0F4A8C] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Riwayat & Laporan SHM
                </span>
                <span>→</span>
              </button>
              <button
                onClick={runConnectivityTest}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#00A896] bg-[#F0FDF4] hover:bg-[#DCFCE7] rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2">
                  <TestTube2 className="w-3.5 h-3.5" /> Uji Koneksi Transmisi
                </span>
                <span>Uji</span>
              </button>
              <button
                onClick={() => navigateTo('device-group', { groupId: currentDevice.groupId })}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#475569] bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" /> Dasbor Koridor ({currentDevice.groupName.slice(0, 15)}...)
                </span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: 3D Visualization Hero (6 cols on large) */}
        <div className="lg:col-span-6 flex flex-col">
          <ThreeDeviceViewer
            device={currentDevice}
            className="flex-1 min-h-[420px]"
          />
        </div>

        {/* RIGHT COLUMN: Real-time Metric Cards (Scrollable 3 cols on large) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider flex items-center justify-between px-1">
            <span>Telemetri Real-time</span>
            <span className="flex items-center gap-1 text-[10px] text-[#22C55E]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" /> Live 100Hz
            </span>
          </div>

          <div className="space-y-3">
            {metricEntries.map(({ key, data }) => {
              const borderLeftColor = 
                data.status === 'critical' ? 'border-l-[#EF4444]' :
                data.status === 'warning' ? 'border-l-[#F59E0B]' : 'border-l-[#22C55E]';

              return (
                <div
                  key={key}
                  className={`bg-white border border-[#E2E8F0] border-l-4 ${borderLeftColor} rounded-[12px] p-3.5 shadow-xs`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#475569]">{data.label}</span>
                    <span className="text-xs font-bold text-[#0F4A8C]">{data.trend}</span>
                  </div>

                  <div className="mt-1 flex items-baseline justify-between">
                    <div className="text-2xl font-bold font-mono text-[#0F172A] tabular-nums">
                      {data.value} <span className="text-xs font-normal text-[#64748B]">{data.unit}</span>
                    </div>
                    <MiniSparkline
                      data={data.sparkline}
                      status={data.status}
                      width={80}
                      height={24}
                    />
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>Rentang: {data.min} - {data.max} {data.unit}</span>
                    <span className="text-[#0F4A8C]">Ambang: {data.threshold.warning} / {data.threshold.critical}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FULL WIDTH SECTION: 24-Hour Trend Chart */}
      <TrendChart
        timestamps={currentDevice.trends24h.timestamps}
        series={[
          {
            id: 'metric1',
            name: currentDevice.metrics.metric1.label,
            unit: currentDevice.metrics.metric1.unit,
            color: '#0F4A8C',
            data: currentDevice.trends24h.metric1
          },
          {
            id: 'metric2',
            name: currentDevice.metrics.metric2.label,
            unit: currentDevice.metrics.metric2.unit,
            color: '#00A896',
            data: currentDevice.trends24h.metric2
          },
          {
            id: 'metric3',
            name: currentDevice.metrics.metric3.label,
            unit: currentDevice.metrics.metric3.unit,
            color: '#F59E0B',
            data: currentDevice.trends24h.metric3
          }
        ]}
      />

      {/* BOTTOM SECTION: Event Log & Active Alerts Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Event Log Feed */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A]">Log Peristiwa Sensor (Event Log)</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Riwayat kronologis peringatan dan sinkronisasi</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-md text-[11px]">
              {(['all', 'ALERT', 'STATUS', 'METRIC'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setEventFilter(type)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    eventFilter === type ? 'bg-white text-[#0F4A8C] font-semibold shadow-xs' : 'text-[#64748B]'
                  }`}
                >
                  {type === 'all' ? 'Semua' : type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      event.type === 'ALERT' ? 'bg-[#FEE2E2] text-[#B91C1C]' :
                      event.type === 'CONFIG' ? 'bg-[#E0E7FF] text-[#3730A3]' :
                      'bg-[#F1F5F9] text-[#334155]'
                    }`}>
                      {event.type}
                    </span>
                    <span className="font-semibold text-[#0F172A]">{event.message}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#64748B] shrink-0">
                  {event.timestamp.slice(11, 16)} WIB
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts for this Device */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A]">Peringatan Terdaftar</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Status ambang batas keselamatan terlampaui</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#EF4444]">
              {currentDevice.alerts.length} Kasus
            </span>
          </div>

          <div className="mt-3 space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
            {currentDevice.alerts.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#64748B]">
                Tidak ada peringatan aktif untuk sensor ini. Seluruh parameter normal.
              </div>
            ) : (
              currentDevice.alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border text-xs ${
                    alert.severity === 'critical'
                      ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                      : 'bg-[#FFFBEB] border-[#FDE68A]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <StatusBadge status={alert.severity} size="sm" />
                    <span className="text-[10px] text-[#64748B] font-mono">
                      {alert.timestamp.slice(11, 16)} WIB
                    </span>
                  </div>
                  <p className="font-semibold text-[#0F172A] mt-1.5">{alert.message}</p>
                  
                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-black/5">
                    <span className="text-[10px] text-[#64748B]">
                      {alert.acknowledged ? 'Sudah Dikonfirmasi' : 'Menunggu Tindakan'}
                    </span>
                    {!alert.acknowledged && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="px-2.5 py-1 bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] rounded text-[11px] font-semibold text-[#0F172A] transition-colors"
                      >
                        Konfirmasi Peringatan
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
