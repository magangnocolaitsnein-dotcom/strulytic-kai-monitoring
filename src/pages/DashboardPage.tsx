import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { BentoCard } from '../components/common/BentoCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { InteractiveMap } from '../components/visualization/InteractiveMap';
import { ThreeDeviceViewer } from '../components/visualization/ThreeDeviceViewer';
import { 
  Activity, 
  Cpu, 
  AlertTriangle, 
  Clock, 
  Server, 
  Gauge, 
  MapPin, 
  Boxes, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp,
  Radio,
  Building,
  ExternalLink
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    systemStats, 
    devices, 
    deviceGroups, 
    allAlerts, 
    navigateTo, 
    currentDevice,
    acknowledgeAlert 
  } = useIot();

  const [mapOr3dMode, setMapOr3dMode] = useState<'map' | '3d'>('map');

  // Distribution by device type
  const deviceTypeCounts = [
    { type: 'Regangan (Strain Gauge)', count: 480, percentage: 38.5, color: '#0F4A8C' },
    { type: 'Akselerometer 3-Axis', count: 320, percentage: 25.6, color: '#00A896' },
    { type: 'Konvergensi Terowongan', count: 215, percentage: 17.2, color: '#F59E0B' },
    { type: 'Emisi Akustik (Crack)', count: 140, percentage: 11.2, color: '#EF4444' },
    { type: 'Gateway LoRa / MQTT', count: 93, percentage: 7.5, color: '#64748B' }
  ];

  return (
    <div className="space-y-4">
      {/* Editorial Header (Anti-slop title case) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#0F4A8C] uppercase tracking-wider">
              Pusat Kendali Prasarana SHM
            </span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-xs text-[#64748B]">Wilayah Daop 2 Bandung & MRT Jakarta</span>
          </div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight mt-0.5">
            Monitoring Rel, Jembatan Baja Tua & Terowongan Bawah Tanah
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('predictive')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0F4A8C] hover:bg-[#0C3B70] rounded-lg transition-colors shadow-xs"
          >
            <span>Analisis AI Prediktif</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bento Box Grid (4 Columns Layout, 16px Gap) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* a) Quick Stats Card (2x1) */}
        <BentoCard
          className="md:col-span-2"
          title="Statistik Utama Infrastruktur SHM"
          subtitle="Telemetri perangkat sensor terpasang pada lintasan kereta api"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] font-medium text-[#64748B] block">Total Sensor</span>
              <div className="text-xl font-bold text-[#0F172A] font-mono mt-1 tabular-nums">
                {systemStats.totalDevices.toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-[#00A896] font-medium mt-0.5 block">
                +14 unit baru 2026
              </span>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] font-medium text-[#64748B] block">Sensor Online</span>
              <div className="text-xl font-bold text-[#16A34A] font-mono mt-1 tabular-nums">
                {systemStats.onlineDevices.toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-[#16A34A] font-medium mt-0.5 block">
                97.4% aktif normal
              </span>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] font-medium text-[#64748B] block">Peringatan Aktif</span>
              <div className="text-xl font-bold text-[#EF4444] font-mono mt-1 tabular-nums">
                {systemStats.alertsTotal}
              </div>
              <span className="text-[10px] text-[#DC2626] font-medium mt-0.5 block">
                {systemStats.criticalAlerts} kasus kritikal
              </span>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] font-medium text-[#64748B] block">Ketersediaan (SLA)</span>
              <div className="text-xl font-bold text-[#0F4A8C] font-mono mt-1 tabular-nums">
                {systemStats.uptimePercent}%
              </div>
              <span className="text-[10px] text-[#475569] font-medium mt-0.5 block">
                Target KAI: 99.5%
              </span>
            </div>
          </div>
        </BentoCard>

        {/* b) System Status Card (2x1) */}
        <BentoCard
          className="md:col-span-2"
          title="Status Komputasi & Gateway Server"
          subtitle="Pemrosesan telemetri tepi (edge AI) dan sinkronisasi MQTT/TLS"
          action={
            <StatusBadge status="online" customLabel="Server Normal" />
          }
        >
          <div className="grid grid-cols-3 gap-4 pt-1">
            <div>
              <div className="flex items-center justify-between text-xs text-[#475569] mb-1">
                <span>CPU Edge AI</span>
                <span className="font-mono font-semibold tabular-nums text-[#0F172A]">
                  {systemStats.cpuUsage}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0F4A8C] h-full rounded-full transition-all duration-500"
                  style={{ width: `${systemStats.cpuUsage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-[#475569] mb-1">
                <span>Memori RAM</span>
                <span className="font-mono font-semibold tabular-nums text-[#0F172A]">
                  {systemStats.memoryUsage}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#00A896] h-full rounded-full transition-all duration-500"
                  style={{ width: `${systemStats.memoryUsage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-[#475569] mb-1">
                <span>Bandwidth LoRa</span>
                <span className="font-mono font-semibold tabular-nums text-[#0F172A]">
                  {systemStats.bandwidthUsage}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#F59E0B] h-full rounded-full transition-all duration-500"
                  style={{ width: `${systemStats.bandwidthUsage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>Sinkronisasi Terakhir: {systemStats.lastSyncTime}</span>
            <span className="font-mono text-[#0F4A8C]">Throughput: {systemStats.mqttThroughputEventsSec} ev/s</span>
          </div>
        </BentoCard>

        {/* c) Real-time Device Map / 3D Facility View (2x2) */}
        <BentoCard
          className="md:col-span-2 xl:row-span-2"
          noPadding
          title="Peta Koridor & Model 3D Jembatan/Terowongan"
          subtitle="Distribusi spasial sensor rel, jembatan baja 1906, dan terowongan tua 1902"
          action={
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-md text-xs font-medium">
              <button
                onClick={() => setMapOr3dMode('map')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  mapOr3dMode === 'map' ? 'bg-white text-[#0F4A8C] shadow-xs font-semibold' : 'text-[#64748B]'
                }`}
              >
                Peta Koridor
              </button>
              <button
                onClick={() => setMapOr3dMode('3d')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  mapOr3dMode === '3d' ? 'bg-white text-[#0F4A8C] shadow-xs font-semibold' : 'text-[#64748B]'
                }`}
              >
                Model 3D Strulytic
              </button>
            </div>
          }
        >
          <div className="p-3">
            {mapOr3dMode === 'map' ? (
              <InteractiveMap
                devices={devices}
                groups={deviceGroups}
                height="340px"
              />
            ) : (
              <ThreeDeviceViewer
                device={currentDevice}
                className="h-[340px]"
              />
            )}
            
            <div className="mt-2.5 flex items-center justify-between text-xs text-[#475569]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Daop 2 Bandung
                <span className="w-2 h-2 rounded-full bg-[#0F4A8C] ml-2" /> MRT Jakarta Underground
              </span>
              <button
                onClick={() => navigateTo('devices')}
                className="text-[#0F4A8C] font-semibold hover:underline flex items-center gap-1"
              >
                Buka Tabulasi Sensor →
              </button>
            </div>
          </div>
        </BentoCard>

        {/* d) Device Distribution Chart (1x2) */}
        <BentoCard
          className="md:col-span-1 xl:row-span-2"
          title="Distribusi Tipe Sensor SHM"
          subtitle="Komposisi instrumentasi sensor"
        >
          <div className="space-y-3 pt-1">
            {deviceTypeCounts.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#334155] truncate max-w-36 font-medium">
                    {item.type}
                  </span>
                  <span className="font-mono text-[#0F172A] tabular-nums font-semibold">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 pt-3 border-t border-[#E2E8F0] bg-[#F8FAFC] p-2.5 rounded-lg text-xs text-[#475569]">
              <div className="font-semibold text-[#0F172A] mb-1">Standardisasi Instrumentasi:</div>
              <p className="text-[11px] leading-relaxed">
                Sensor teregistrasi pada Ditjen Perkeretaapian Kemenhub RI & PT Kereta Api Indonesia (Persero).
              </p>
            </div>
          </div>
        </BentoCard>

        {/* e) Active Alerts Panel (1x2 on large screens) */}
        <BentoCard
          className="md:col-span-1 xl:row-span-2"
          title="Peringatan Terkini (Alerts)"
          subtitle={`${allAlerts.length} peringatan terdeteksi`}
          action={
            <button
              onClick={() => navigateTo('reports')}
              className="text-xs text-[#0F4A8C] font-semibold hover:underline"
            >
              Lihat Semua
            </button>
          }
        >
          <div className="space-y-2.5 overflow-y-auto max-h-[350px] pr-1">
            {allAlerts.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#64748B]">
                Tidak ada peringatan aktif saat ini.
              </div>
            ) : (
              allAlerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-2.5 rounded-lg border text-xs transition-all ${
                    alert.severity === 'critical'
                      ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                      : alert.severity === 'warning'
                      ? 'bg-[#FFFBEB] border-[#FDE68A]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <StatusBadge
                      status={alert.severity}
                      size="sm"
                      customLabel={alert.severity === 'critical' ? 'Kritikal' : 'Waspada'}
                    />
                    <span className="text-[10px] text-[#64748B] font-mono shrink-0">
                      {alert.timestamp.slice(11, 16)} WIB
                    </span>
                  </div>
                  <p className="font-semibold text-[#0F172A] text-xs leading-snug">
                    {alert.deviceName}
                  </p>
                  <p className="text-[11px] text-[#475569] mt-1 leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-1.5">
                    <button
                      onClick={() => navigateTo('device-detail', { deviceId: alert.deviceId })}
                      className="text-[11px] text-[#0F4A8C] font-semibold hover:underline"
                    >
                      Inspeksi Sensor →
                    </button>
                    {!alert.acknowledged && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="text-[10px] px-2 py-0.5 bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] rounded text-[#334155] font-medium"
                      >
                        Konfirmasi
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </BentoCard>

        {/* f) Temperature & Strain Trends (2x1) */}
        <BentoCard
          className="md:col-span-2"
          title="Tren 24 Jam Regangan & Suhu Jembatan/Terowongan"
          subtitle="Pemantauan hubungan suhu lingkungan terhadap ekspansi sambungan paku keling"
        >
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-[#64748B]">Sampel: Jembatan Cikubang & Terowongan Sasaksaat</span>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-[#0F4A8C] font-semibold">Regangan Rata-rata: 382.4 µε</span>
                <span className="text-[#00A896] font-semibold">Suhu Rata-rata: 28.5°C</span>
              </div>
            </div>

            {/* Visual SVG Mini Trend Comparison */}
            <div className="h-28 w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 flex items-center">
              <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible">
                {/* Strain line (blue) */}
                <path
                  d="M 10,70 Q 120,65 200,30 T 350,25 T 490,60"
                  fill="none"
                  stroke="#0F4A8C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Temp line (teal) */}
                <path
                  d="M 10,80 Q 150,75 250,45 T 400,40 T 490,75"
                  fill="none"
                  stroke="#00A896"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                {/* Peak marker */}
                <circle cx="200" cy="30" r="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="200" y="20" fontSize="10" fill="#EF4444" textAnchor="middle" fontWeight="bold">
                  Beban KA Argo Parahyangan (520 µε)
                </text>
              </svg>
            </div>
          </div>
        </BentoCard>

        {/* g) Device Performance Table (2x1) */}
        <BentoCard
          className="md:col-span-2"
          title="Performa Sensor Teratas (Top SHM Nodes)"
          subtitle="Tingkat ketersediaan transmisi telemetri dan jumlah titik data teruji"
        >
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                  <th className="py-2 px-2 font-semibold">Nama Sensor</th>
                  <th className="py-2 px-2 font-semibold">Lokasi Objek</th>
                  <th className="py-2 px-2 font-semibold text-right">Uptime</th>
                  <th className="py-2 px-2 font-semibold text-right">Data Point</th>
                  <th className="py-2 px-2 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {devices.slice(0, 4).map(dev => (
                  <tr key={dev.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-2 px-2">
                      <div className="font-semibold text-[#0F172A]">{dev.code}</div>
                      <div className="text-[10px] text-[#64748B] truncate max-w-40">{dev.name}</div>
                    </td>
                    <td className="py-2 px-2 text-[#475569]">{dev.location.name}</td>
                    <td className="py-2 px-2 text-right font-mono font-semibold text-[#16A34A] tabular-nums">
                      {dev.uptime.thisMonth}%
                    </td>
                    <td className="py-2 px-2 text-right font-mono text-[#0F172A] tabular-nums">
                      {dev.uptime.dataPointsCollected.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        onClick={() => navigateTo('device-detail', { deviceId: dev.id })}
                        className="text-xs text-[#0F4A8C] font-semibold hover:underline"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoCard>

        {/* h) System Health (2x1) */}
        <BentoCard
          className="md:col-span-2 xl:col-span-4"
          title="Kesehatan Struktural Keseluruhan (Overall SHM Health Index)"
          subtitle="Indeks keselamatan prasarana jalan rel, jembatan bentang panjang, dan terowongan Daop 2 / MRT"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center pt-1">
            <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full border-4 border-[#22C55E] flex items-center justify-center font-bold text-sm text-[#0F172A] font-mono tabular-nums">
                98.4%
              </div>
              <div>
                <span className="text-xs font-semibold text-[#0F172A]">Indeks Kesehatan Jalur</span>
                <p className="text-[11px] text-[#16A34A] font-medium">Status Operasional Layak KA</p>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#64748B]">Jembatan Cikubang (BH 513)</span>
              <div className="text-sm font-bold text-[#16A34A] mt-0.5">Kondisi Stabil (99.2%)</div>
              <p className="text-[10px] text-[#64748B] mt-0.5">Tegangan lentur pilar paku keling normal</p>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#64748B]">Terowongan Sasaksaat (BH 503)</span>
              <div className="text-sm font-bold text-[#F59E0B] mt-0.5">Perhatian Khusus (84.1%)</div>
              <p className="text-[10px] text-[#B45309] mt-0.5">Konvergensi dinding & rembasan air terdeteksi</p>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#64748B]">MRT Underground Ring 450</span>
              <div className="text-sm font-bold text-[#16A34A] mt-0.5">Kondisi Prima (99.8%)</div>
              <p className="text-[10px] text-[#64748B] mt-0.5">Ovalisasi & tekanan pori air normal</p>
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  );
};
