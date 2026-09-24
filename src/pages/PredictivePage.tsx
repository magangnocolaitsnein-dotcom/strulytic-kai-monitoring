import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { 
  BrainCircuit, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  ShieldAlert, 
  Layers, 
  Wrench, 
  Calendar,
  CheckSquare,
  Square,
  ArrowRight
} from 'lucide-react';

export const PredictivePage: React.FC = () => {
  const { predictiveRisks, navigateTo } = useIot();

  const [selectedScope, setSelectedScope] = useState('all');
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisCompletedMsg, setAnalysisCompletedMsg] = useState<string | null>(null);

  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const toggleAction = (id: string) => {
    setCompletedActions(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRunAnalysis = () => {
    setIsRunningAnalysis(true);
    setAnalysisCompletedMsg(null);
    setTimeout(() => {
      setIsRunningAnalysis(false);
      setAnalysisCompletedMsg('Model AI Strulytic V2.4 berhasil memperbarui inferensi prediktif 1,248 sensor!');
      setTimeout(() => setAnalysisCompletedMsg(null), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#00A896] uppercase tracking-wider flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5" /> Edge AI & Deep Learning SHM
            </span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-xs text-[#64748B]">Deteksi Kelelahan Logam & Penurunan Terowongan</span>
          </div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight mt-0.5">
            Analisis Prediktif Kerusakan Struktur KAI & MRT
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={selectedScope}
            onChange={(e) => setSelectedScope(e.target.value)}
            className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#334155] focus:outline-none"
          >
            <option value="all">Semua Koridor KAI & MRT</option>
            <option value="bridges">Hanya Jembatan Baja Tua</option>
            <option value="tunnels">Hanya Terowongan Kereta Api</option>
          </select>

          <button
            onClick={handleRunAnalysis}
            disabled={isRunningAnalysis}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-3 h-3 ${isRunningAnalysis ? 'animate-spin' : ''}`} />
            <span>{isRunningAnalysis ? 'Menjalankan Inferensi...' : 'Jalankan Analisis AI'}</span>
          </button>
        </div>
      </div>

      {analysisCompletedMsg && (
        <div className="p-3 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{analysisCompletedMsg}</span>
        </div>
      )}

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Sensor Berisiko (30 Hari)</span>
          <div className="text-2xl font-bold font-mono text-[#EF4444] mt-1 tabular-nums">
            3 Unit
          </div>
          <span className="text-[10px] text-[#DC2626] font-medium mt-0.5 block">
            Perlu intervensi pemeliharaan
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Anomali Terdeteksi</span>
          <div className="text-2xl font-bold font-mono text-[#F59E0B] mt-1 tabular-nums">
            5 Pola
          </div>
          <span className="text-[10px] text-[#D97706] font-medium mt-0.5 block">
            Mikro-retak & rembasan air
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Akurasi Model Machine Learning</span>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1 tabular-nums">
            94.2%
          </div>
          <span className="text-[10px] text-[#16A34A] font-medium mt-0.5 block">
            Precision: 91.5% · Recall: 88.7%
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Versi Arsitektur AI</span>
          <div className="text-2xl font-bold font-mono text-[#0F4A8C] mt-1 tabular-nums">
            V2.4 LSTM
          </div>
          <span className="text-[10px] text-[#475569] font-medium mt-0.5 block">
            Dilatih pada 1.2M siklus beban KA
          </span>
        </div>
      </div>

      {/* Risk Assessment Matrix (PRD Section 9.b) */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-1">
          Matriks Penilaian Risiko Kegagalan Struktur (Risk Assessment Matrix)
        </h3>
        <p className="text-xs text-[#64748B] mb-3">
          Prioritas penanganan berdasarkan probabilitas dan estimasi dampak terhadap operasional perjalanan kereta api
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                <th className="py-2.5 px-3 font-semibold">Nama Sensor & Aset</th>
                <th className="py-2.5 px-3 font-semibold text-center">Skor Risiko</th>
                <th className="py-2.5 px-3 font-semibold">Prediksi Isu Rekayasa</th>
                <th className="py-2.5 px-3 font-semibold text-right">Probabilitas</th>
                <th className="py-2.5 px-3 font-semibold">Tenggat Waktu</th>
                <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {predictiveRisks.map(risk => (
                <tr key={risk.deviceId} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-[#0F172A]">{risk.deviceName}</div>
                    <div className="text-[11px] text-[#64748B] font-mono">{risk.deviceId}</div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      risk.riskLevel === 'critical' || risk.riskLevel === 'high' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                      risk.riskLevel === 'medium' ? 'bg-[#FEF3C7] text-[#D97706]' :
                      'bg-[#DCFCE7] text-[#16A34A]'
                    }`}>
                      {risk.riskScore} / 10
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-[#0F172A]">{risk.predictedIssue}</div>
                    <div className="text-[11px] text-[#475569]">{risk.recommendedAction}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#0F4A8C] tabular-nums">
                    {risk.failureProbabilityPercent}%
                  </td>
                  <td className="py-3 px-3 font-medium text-[#334155]">
                    {risk.estimatedTimeToThreshold}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => navigateTo('device-detail', { deviceId: risk.deviceId })}
                      className="text-xs font-semibold text-[#0F4A8C] hover:underline"
                    >
                      Inspeksi 3D →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distribution Chart & Recommended Actions Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Failure Probability Breakdown */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Distribusi Probabilitas Kegagalan (30 Hari ke Depan)
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Klasifikasi keamanan seluruh populasi sensor terpasang
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#DC2626] font-semibold">Risiko Tinggi (&gt;75%)</span>
                <span className="font-mono text-[#0F172A]">2 Perangkat</span>
              </div>
              <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#EF4444] h-full rounded-full" style={{ width: '0.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#D97706] font-semibold">Risiko Sedang (50% - 75%)</span>
                <span className="font-mono text-[#0F172A]">4 Perangkat</span>
              </div>
              <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '0.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#16A34A] font-semibold">Risiko Rendah / Aman (&lt;50%)</span>
                <span className="font-mono text-[#0F172A]">1,242 Perangkat</span>
              </div>
              <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#22C55E] h-full rounded-full" style={{ width: '99.4%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Actions Checkable List (PRD Section 9.d) */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Tindakan Rekomendasi Pemeliharaan Preventif
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Daftar kerja mandor & teknisi prasarana KAI Daop 2
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {[
              { id: 'act-1', text: 'Jadwalkan injeksi epoxy & perkuatan dinding Terowongan Sasaksaat (Target: 3 hari)', priority: 'Paling Mendesak' },
              { id: 'act-2', text: 'Kencangkan baut paku keling pilar 4 Jembatan Cikubang & ganti strain gauge (Target: 1 minggu)', priority: 'Tinggi' },
              { id: 'act-3', text: 'Ukur ulang level air tanah terowongan MRT Bundaran HI (Target: 2 minggu)', priority: 'Rutin' },
              { id: 'act-4', text: 'Monitoring frekuensi getaran pilar Jembatan Cirahong saat dilewati KA Pasundan (Target: Harian)', priority: 'Harian' },
            ].map(item => {
              const isChecked = completedActions.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleAction(item.id)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-start gap-2.5 transition-all ${
                    isChecked ? 'bg-[#F0FDF4] border-[#86EFAC] line-through text-[#64748B]' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <button className="mt-0.5 shrink-0 text-[#0F4A8C]">
                    {isChecked ? <CheckSquare className="w-4 h-4 text-[#16A34A]" /> : <Square className="w-4 h-4 text-[#94A3B8]" />}
                  </button>
                  <div className="flex-1">
                    <p className="font-medium">{item.text}</p>
                    <span className="text-[10px] text-[#64748B] mt-0.5 inline-block">
                      Prioritas: {item.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
