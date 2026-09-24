import React, { useState, useMemo } from 'react';
import { useIot } from '../context/IotContext';
import { DeviceItem, DeviceStatus } from '../types/iot';
import { StatusBadge } from '../components/common/StatusBadge';
import { MiniSparkline } from '../components/visualization/MiniSparkline';
import { InteractiveMap } from '../components/visualization/InteractiveMap';
import { 
  Search, 
  Filter, 
  Download, 
  SlidersHorizontal, 
  List, 
  LayoutGrid, 
  Map as MapIcon, 
  ExternalLink,
  ChevronRight,
  Sliders,
  CheckSquare,
  Square
} from 'lucide-react';

export const DeviceListPage: React.FC = () => {
  const { devices, navigateTo } = useIot();

  const [activeView, setActiveView] = useState<'list' | 'card' | 'map'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'uptime' | 'lastUpdate'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<string[]>([]);

  // Filtering & Sorting
  const filteredDevices = useMemo(() => {
    return devices.filter(dev => {
      const matchQuery = 
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.groupName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = selectedType === 'all' || dev.type === selectedType;
      const matchStatus = selectedStatus === 'all' || dev.status === selectedStatus;

      return matchQuery && matchType && matchStatus;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortBy === 'uptime') {
        comparison = a.uptime.thisMonth - b.uptime.thisMonth;
      } else if (sortBy === 'lastUpdate') {
        comparison = a.lastUpdate.localeCompare(b.lastUpdate);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [devices, searchTerm, selectedType, selectedStatus, sortBy, sortOrder]);

  const toggleSelectAll = () => {
    if (selectedDeviceIds.length === filteredDevices.length) {
      setSelectedDeviceIds([]);
    } else {
      setSelectedDeviceIds(filteredDevices.map(d => d.id));
    }
  };

  const toggleSelectDevice = (id: string) => {
    setSelectedDeviceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const exportSelected = () => {
    const listToExport = filteredDevices.filter(d => 
      selectedDeviceIds.length === 0 || selectedDeviceIds.includes(d.id)
    );
    const headers = ['Device Code', 'Name', 'Type', 'Location', 'KM Post', 'Status', 'Uptime %', 'Last Sync'];
    const rows = listToExport.map(d => [
      d.code,
      `"${d.name}"`,
      d.type,
      `"${d.location.name}"`,
      d.location.kilometerPost,
      d.status,
      d.uptime.thisMonth,
      d.connection.lastSync
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = `strulytic_device_inventory_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Inventaris Sensor & Perangkat SHM
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            Daftar seluruh sensor strain gauge, akselerometer, dan konvergensi rel KAI & MRT
          </p>
        </div>

        {/* View Switcher Tabs (3 Views) */}
        <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveView('list')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeView === 'list'
                ? 'bg-white text-[#0F4A8C] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Tabel</span>
          </button>
          <button
            onClick={() => setActiveView('card')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeView === 'card'
                ? 'bg-white text-[#0F4A8C] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Kartu</span>
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeView === 'map'
                ? 'bg-white text-[#0F4A8C] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Peta</span>
          </button>
        </div>
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-3.5 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari kode sensor (e.g. SHM-G14), nama, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#0F4A8C] focus:ring-1 focus:ring-[#0F4A8C]"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Type Dropdown */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#334155] focus:outline-none focus:border-[#0F4A8C]"
            >
              <option value="all">Semua Tipe Sensor</option>
              <option value="strain_gauge">Strain Gauge (Regangan)</option>
              <option value="triaxial_accelerometer">Akselerometer 3-Axis</option>
              <option value="tunnel_convergence">Laser Konvergensi Terowongan</option>
              <option value="crack_acoustic">Emisi Akustik Retakan</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#334155] focus:outline-none focus:border-[#0F4A8C]"
            >
              <option value="all">Semua Status</option>
              <option value="online">Online / Normal</option>
              <option value="warning">Warning / Waspada</option>
              <option value="critical">Critical / Bahaya</option>
              <option value="offline">Offline</option>
            </select>

            {/* Sort order toggle */}
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-2.5 py-1.5 border border-[#CBD5E1] rounded-lg text-xs font-medium text-[#475569] hover:bg-[#F1F5F9]"
              title="Balik Urutan Sortir"
            >
              {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
            </button>

            {/* Export CSV button */}
            <button
              onClick={exportSelected}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F4A8C] text-white hover:bg-[#0C3B70] rounded-lg text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV ({selectedDeviceIds.length > 0 ? selectedDeviceIds.length : 'Semua'})</span>
            </button>
          </div>
        </div>

        {/* Selected count info */}
        {selectedDeviceIds.length > 0 && (
          <div className="flex items-center justify-between text-xs px-2 py-1 bg-[#EFF6FF] text-[#0F4A8C] rounded border border-[#BFDBFE]">
            <span>{selectedDeviceIds.length} sensor dipilih untuk tindakan massal</span>
            <button
              onClick={() => setSelectedDeviceIds([])}
              className="text-xs font-semibold hover:underline"
            >
              Batalkan Pilihan
            </button>
          </div>
        )}
      </div>

      {/* VIEW A: LIST VIEW (TABLE) */}
      {activeView === 'list' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                  <th className="py-3 px-3 w-8">
                    <button onClick={toggleSelectAll} className="flex items-center text-[#475569]">
                      {selectedDeviceIds.length === filteredDevices.length && filteredDevices.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#0F4A8C]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#94A3B8]" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-3 font-semibold">Sensor & Kode</th>
                  <th className="py-3 px-3 font-semibold">Tipe Instrumen</th>
                  <th className="py-3 px-3 font-semibold">Infrastruktur & KM</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-3 font-semibold">Nilai Telemetri Utama</th>
                  <th className="py-3 px-3 font-semibold text-right">Uptime</th>
                  <th className="py-3 px-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredDevices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-xs text-[#64748B]">
                      Tidak ada sensor yang sesuai dengan filter atau kata kunci.
                    </td>
                  </tr>
                ) : (
                  filteredDevices.map(device => {
                    const isSelected = selectedDeviceIds.includes(device.id);
                    return (
                      <tr 
                        key={device.id} 
                        className={`hover:bg-[#F8FAFC] transition-colors ${isSelected ? 'bg-[#F0F7FF]' : ''}`}
                      >
                        <td className="py-3 px-3">
                          <button onClick={() => toggleSelectDevice(device.id)}>
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#0F4A8C]" />
                            ) : (
                              <Square className="w-4 h-4 text-[#CBD5E1]" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                            <span className="font-mono text-[#0F4A8C]">{device.code}</span>
                          </div>
                          <div className="text-[11px] text-[#64748B] truncate max-w-56">{device.name}</div>
                        </td>
                        <td className="py-3 px-3 text-[#334155]">
                          {device.typeLabel}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-[#0F172A]">{device.location.name}</div>
                          <div className="text-[11px] text-[#64748B] font-mono">{device.location.kilometerPost}</div>
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={device.status} />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-[#0F172A] tabular-nums">
                              {device.metrics.metric1.value} {device.metrics.metric1.unit}
                            </span>
                            <MiniSparkline
                              data={device.metrics.metric1.sparkline}
                              status={device.metrics.metric1.status}
                              width={60}
                              height={20}
                            />
                          </div>
                          <span className="text-[10px] text-[#64748B]">{device.metrics.metric1.label}</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-[#16A34A] tabular-nums">
                          {device.uptime.thisMonth}%
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => navigateTo('device-detail', { deviceId: device.id })}
                              className="px-2.5 py-1 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F4A8C] font-semibold rounded text-xs transition-colors"
                            >
                              Detail
                            </button>
                            <button
                              onClick={() => navigateTo('device-config', { deviceId: device.id })}
                              className="px-2 py-1 text-[#64748B] hover:text-[#0F172A] text-xs"
                              title="Konfigurasi Sensor"
                            >
                              Set
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-[#E2E8F0] bg-[#FAFCFF] flex items-center justify-between text-xs text-[#64748B]">
            <span>Menampilkan {filteredDevices.length} dari {devices.length} sensor SHM</span>
            <span>Halaman 1 dari 1 (Pagination: 20 per halaman)</span>
          </div>
        </div>
      )}

      {/* VIEW B: CARD VIEW */}
      {activeView === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map(device => (
            <div
              key={device.id}
              className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#0F4A8C]">{device.code}</span>
                    <h3 className="text-sm font-bold text-[#0F172A] mt-0.5 truncate max-w-56">
                      {device.name}
                    </h3>
                  </div>
                  <StatusBadge status={device.status} />
                </div>

                <div className="mt-2 text-xs text-[#64748B]">
                  <span>{device.location.name}</span>
                  <span className="text-[#CBD5E1] mx-1.5">·</span>
                  <span className="font-mono">{device.location.kilometerPost}</span>
                </div>

                {/* Primary Metric Box */}
                <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#475569]">{device.metrics.metric1.label}</span>
                    <MiniSparkline
                      data={device.metrics.metric1.sparkline}
                      status={device.metrics.metric1.status}
                      width={70}
                      height={22}
                    />
                  </div>
                  <div className="text-xl font-bold font-mono text-[#0F172A] mt-1 tabular-nums">
                    {device.metrics.metric1.value} <span className="text-xs font-normal text-[#64748B]">{device.metrics.metric1.unit}</span>
                  </div>
                </div>

                {/* Secondary metric */}
                <div className="mt-2 flex items-center justify-between text-xs text-[#475569] px-1">
                  <span>{device.metrics.metric2.label}:</span>
                  <span className="font-mono font-semibold text-[#0F172A]">
                    {device.metrics.metric2.value} {device.metrics.metric2.unit}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-mono">Uptime: {device.uptime.thisMonth}%</span>
                <button
                  onClick={() => navigateTo('device-detail', { deviceId: device.id })}
                  className="text-xs font-semibold text-[#0F4A8C] hover:underline flex items-center gap-1"
                >
                  Lihat Detail 3D →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW C: MAP VIEW */}
      {activeView === 'map' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-3 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-[#475569] px-1">
            <span>Klik pin marker untuk membuka ringkasan sensor dan inspeksi telemetri</span>
            <span className="font-semibold text-[#0F4A8C]">{filteredDevices.length} Titik Terplot</span>
          </div>
          <InteractiveMap
            devices={filteredDevices}
            height="550px"
          />
        </div>
      )}
    </div>
  );
};
