import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { ArrowLeft, Save, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DeviceConfigPage: React.FC = () => {
  const { currentDevice, navigateTo, updateDeviceConfig } = useIot();

  const cfg = currentDevice.config || {
    general: {
      name: currentDevice.name,
      type: currentDevice.type,
      location: currentDevice.location.name,
      description: "Pemantauan regangan dan deformasi struktural prasarana vital KAI"
    },
    monitoring: {
      sampleInterval: 5,
      dataRetentionDays: 30,
      enabledMetrics: ['metric1', 'metric2', 'metric3', 'metric4']
    },
    thresholds: {
      metric1Warning: currentDevice.metrics.metric1.threshold.warning,
      metric1Critical: currentDevice.metrics.metric1.threshold.critical,
      metric2Warning: currentDevice.metrics.metric2.threshold.warning,
      metric2Critical: currentDevice.metrics.metric2.threshold.critical
    },
    communication: {
      protocol: currentDevice.connection.protocol || 'MQTT/TLS',
      endpoint: 'mqtts://telemetry.kai.id:8883/shm/v1',
      retryPolicy: 'Exponential backoff'
    }
  };

  const [name, setName] = useState(currentDevice.name);
  const [locationName, setLocationName] = useState(currentDevice.location.name);
  const [description, setDescription] = useState(cfg.general.description);
  const [sampleInterval, setSampleInterval] = useState(cfg.monitoring.sampleInterval);
  const [dataRetentionDays, setDataRetentionDays] = useState(cfg.monitoring.dataRetentionDays);
  const [enabledMetrics, setEnabledMetrics] = useState<string[]>(cfg.monitoring.enabledMetrics);
  const [protocol, setProtocol] = useState(cfg.communication.protocol);
  const [endpoint, setEndpoint] = useState(cfg.communication.endpoint);

  // Thresholds
  const [t1Warning, setT1Warning] = useState(cfg.thresholds.metric1Warning);
  const [t1Critical, setT1Critical] = useState(cfg.thresholds.metric1Critical);
  const [t2Warning, setT2Warning] = useState(cfg.thresholds.metric2Warning);
  const [t2Critical, setT2Critical] = useState(cfg.thresholds.metric2Critical);

  const [saveToast, setSaveToast] = useState(false);

  const handleMetricToggle = (metricKey: string) => {
    setEnabledMetrics(prev => 
      prev.includes(metricKey) ? prev.filter(m => m !== metricKey) : [...prev, metricKey]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateDeviceConfig(currentDevice.id, {
      general: {
        name,
        type: currentDevice.type,
        location: locationName,
        description
      },
      monitoring: {
        sampleInterval: Number(sampleInterval),
        dataRetentionDays: Number(dataRetentionDays),
        enabledMetrics
      },
      thresholds: {
        metric1Warning: Number(t1Warning),
        metric1Critical: Number(t1Critical),
        metric2Warning: Number(t2Warning),
        metric2Critical: Number(t2Critical)
      },
      communication: {
        protocol,
        endpoint,
        retryPolicy: cfg.communication.retryPolicy
      }
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  const handleReset = () => {
    setName(currentDevice.name);
    setLocationName(currentDevice.location.name);
    setDescription(cfg.general.description);
    setSampleInterval(cfg.monitoring.sampleInterval);
    setT1Warning(cfg.thresholds.metric1Warning);
    setT1Critical(cfg.thresholds.metric1Critical);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
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
              Konfigurasi Parameter & Ambang Batas Sensor
            </h2>
          </div>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>Konfigurasi instrumen berhasil disimpan dan disinkronkan ke gateway LoRa/MQTT lapangan!</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSave} className="space-y-4">
        {/* Section 1: General Settings */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-3">
          <h3 className="text-sm font-semibold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">
            1. Informasi Umum Perangkat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">Nama Perangkat</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0F4A8C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">Lokasi Titik Pemasangan</label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0F4A8C]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-[#334155] mb-1">Deskripsi Teknis Rekayasa</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0F4A8C]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Monitoring Settings */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-3">
          <h3 className="text-sm font-semibold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">
            2. Parameter Pemantauan & Frekuensi Sampling
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                Interval Sampling Telemetri (Detik)
              </label>
              <input
                type="number"
                min={1}
                max={3600}
                value={sampleInterval}
                onChange={(e) => setSampleInterval(Number(e.target.value))}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#0F4A8C]"
              />
              <span className="text-[10px] text-[#64748B] mt-1 block">Default: 5 detik untuk transmisi stabil</span>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                Masa Retensi Data Telemetri Lokal (Hari)
              </label>
              <input
                type="number"
                min={7}
                max={365}
                value={dataRetentionDays}
                onChange={(e) => setDataRetentionDays(Number(e.target.value))}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#0F4A8C]"
              />
              <span className="text-[10px] text-[#64748B] mt-1 block">Data tersimpan di edge sensor sebelum cloud sync</span>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-[#334155] mb-2">Kanal Metrik Aktif</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'metric1', label: currentDevice.metrics.metric1.label },
                  { key: 'metric2', label: currentDevice.metrics.metric2.label },
                  { key: 'metric3', label: currentDevice.metrics.metric3.label },
                  { key: 'metric4', label: currentDevice.metrics.metric4.label },
                ].map(item => (
                  <label key={item.key} className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#F1F5F9]">
                    <input
                      type="checkbox"
                      checked={enabledMetrics.includes(item.key)}
                      onChange={() => handleMetricToggle(item.key)}
                      className="rounded text-[#0F4A8C]"
                    />
                    <span className="text-xs text-[#334155] font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Alert Thresholds */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-3">
          <h3 className="text-sm font-semibold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">
            3. Nilai Batas Peringatan Keselamatan (Alert Thresholds)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg space-y-2">
              <span className="font-semibold text-[#92400E] block">
                {currentDevice.metrics.metric1.label} ({currentDevice.metrics.metric1.unit})
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#92400E]">Batas Waspada (Warning)</label>
                  <input
                    type="number"
                    value={t1Warning}
                    onChange={(e) => setT1Warning(Number(e.target.value))}
                    className="w-full bg-white border border-[#FDE68A] rounded px-2 py-1 font-mono font-bold text-[#B45309]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#92400E]">Batas Bahaya (Critical)</label>
                  <input
                    type="number"
                    value={t1Critical}
                    onChange={(e) => setT1Critical(Number(e.target.value))}
                    className="w-full bg-white border border-[#FDE68A] rounded px-2 py-1 font-mono font-bold text-[#DC2626]"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-2">
              <span className="font-semibold text-[#334155] block">
                {currentDevice.metrics.metric2.label} ({currentDevice.metrics.metric2.unit})
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#64748B]">Batas Waspada (Warning)</label>
                  <input
                    type="number"
                    value={t2Warning}
                    onChange={(e) => setT2Warning(Number(e.target.value))}
                    className="w-full bg-white border border-[#CBD5E1] rounded px-2 py-1 font-mono font-bold text-[#B45309]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#64748B]">Batas Bahaya (Critical)</label>
                  <input
                    type="number"
                    value={t2Critical}
                    onChange={(e) => setT2Critical(Number(e.target.value))}
                    className="w-full bg-white border border-[#CBD5E1] rounded px-2 py-1 font-mono font-bold text-[#DC2626]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Communication Settings */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-3">
          <h3 className="text-sm font-semibold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">
            4. Protokol & Endpoint Komunikasi Industri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">Protokol Jaringan</label>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#334155]"
              >
                <option value="MQTT">MQTT / TLS v1.3 (Port 8883)</option>
                <option value="CoAP">CoAP over DTLS</option>
                <option value="HTTP">HTTPS REST API Edge</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">Endpoint Broker KAI</label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Setelan Awal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateTo('device-detail', { deviceId: currentDevice.id })}
              className="px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
