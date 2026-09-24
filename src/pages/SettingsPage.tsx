import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { 
  User, 
  Shield, 
  Bell, 
  Key, 
  Info, 
  LogOut, 
  CheckCircle2, 
  Lock, 
  Smartphone, 
  Laptop, 
  Copy, 
  Plus
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { userProfile, updateProfile, logout } = useIot();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'apikeys' | 'about'>('profile');
  
  // Profile form state
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [org, setOrg] = useState(userProfile.organization);
  const [role, setRole] = useState(userProfile.role);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Security
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);

  // Notifications
  const [criticalAlerts, setCriticalAlerts] = useState(userProfile.notifications?.criticalAlerts ?? true);
  const [dailyReport, setDailyReport] = useState(userProfile.notifications?.dailyReport ?? true);
  const [weeklySummary, setWeeklySummary] = useState(userProfile.notifications?.weeklyReport ?? false);
  const [maintenance, setMaintenance] = useState(userProfile.notifications?.maintenance ?? true);
  const [frequency, setFrequency] = useState(userProfile.notifications?.frequency ?? 'real-time');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      organization: org,
      role
    });
    setSuccessToast('Profil pengguna berhasil diperbarui!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSaveNotifications = () => {
    updateProfile({
      notifications: {
        criticalAlerts,
        dailyReport,
        weeklyReport: weeklySummary,
        maintenance,
        frequency
      }
    });
    setSuccessToast('Preferensi notifikasi telemetri berhasil disimpan!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
        <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
          Pengaturan Akun & Konfigurasi Sistem SHM
        </h2>
        <p className="text-xs text-[#475569] mt-0.5">
          Manajemen profil teknisi, keamanan otentikasi, dan saluran notifikasi darurat
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-[#F1F5F9] text-xs">
          {[
            { key: 'profile', label: 'Profil Pengguna', icon: User },
            { key: 'security', label: 'Keamanan & 2FA', icon: Shield },
            { key: 'notifications', label: 'Notifikasi Alarm', icon: Bell },
            { key: 'apikeys', label: 'Kunci API (MQTT/REST)', icon: Key },
            { key: 'about', label: 'Tentang Platform', icon: Info },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0F4A8C] text-white shadow-xs font-semibold'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {successToast && (
        <div className="p-3 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* TAB 1: PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E2E8F0]">
            <div className="w-14 h-14 rounded-full bg-[#0F4A8C] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {userProfile.avatarInitials}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">{userProfile.name}</h3>
              <p className="text-xs text-[#64748B]">{userProfile.email} · {userProfile.role}</p>
              <span className="text-[10px] text-[#00A896] font-semibold bg-[#F0FDFA] px-2 py-0.5 rounded mt-1 inline-block">
                Terverifikasi PT Kereta Api Indonesia (Persero)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">Email Resmi Kedinasan</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">Nomor Telepon Siaga</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">Organisasi / Unit Kerja</label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">Peran / Jabatan</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#334155]"
              >
                <option value="Lead Structural Health Engineer">Lead Structural Health Engineer</option>
                <option value="Senior Track Inspector">Senior Track Inspector</option>
                <option value="Operations Control Center Operator">Operations Control Center Operator</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-[#F1F5F9]">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Simpan Perubahan Profil
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E2E8F0]">
            <h3 className="text-sm font-semibold text-[#0F172A]">Keamanan Sandi & Otentikasi Ganda (2FA)</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Perlindungan akses kendali telemetri prasarana vital</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-2">
              <span className="font-semibold text-[#0F172A] block">Ubah Kata Sandi</span>
              <input
                type="password"
                placeholder="Kata sandi saat ini"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs"
              />
              <input
                type="password"
                placeholder="Kata sandi baru"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  setSuccessToast('Kata sandi berhasil diperbarui!');
                  setCurrentPw('');
                  setNewPw('');
                  setTimeout(() => setSuccessToast(null), 3000);
                }}
                className="w-full py-1.5 bg-[#0F4A8C] text-white rounded text-xs font-semibold hover:bg-[#0C3B70]"
              >
                Perbarui Sandi
              </button>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0F172A]">Otentikasi 2-Faktor (2FA)</span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded font-bold">
                  AKTIF
                </span>
              </div>
              <p className="text-[11px] text-[#475569]">
                Membutuhkan token TOTP dari aplikasi Authenticator saat login dari perangkat baru.
              </p>
              <button
                type="button"
                onClick={() => setTwoFaEnabled(!twoFaEnabled)}
                className="mt-2 text-xs font-semibold text-[#0F4A8C] hover:underline"
              >
                {twoFaEnabled ? 'Konfigurasi Ulang Kunci 2FA' : 'Aktifkan 2FA'}
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E2E8F0]">
            <h4 className="text-xs font-semibold text-[#0F172A] mb-2">Sesi Aktif (Active Sessions)</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Laptop className="w-4 h-4 text-[#0F4A8C]" />
                  <div>
                    <span className="font-semibold text-[#0F172A]">Browser Desktop (Sesi Ini)</span>
                    <p className="text-[10px] text-[#64748B]">Chrome di macOS · IP: 182.253.12.44 · Bandung, Indonesia</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#16A34A] font-semibold">Sedang Aktif</span>
              </div>

              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-[#64748B]" />
                  <div>
                    <span className="font-semibold text-[#0F172A]">Tablet Lapangan KAI Toughpad</span>
                    <p className="text-[10px] text-[#64748B]">Terakhir aktif: 2 jam lalu di Terowongan Sasaksaat</p>
                  </div>
                </div>
                <button className="text-[11px] text-[#EF4444] hover:underline font-medium">
                  Cabut Akses
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E2E8F0]">
            <h3 className="text-sm font-semibold text-[#0F172A]">Preferensi Notifikasi Alarm & Laporan</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Pengiriman email dan webhook bila ambang batas dilampaui</p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-2.5 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] cursor-pointer">
              <input
                type="checkbox"
                checked={criticalAlerts}
                onChange={(e) => setCriticalAlerts(e.target.checked)}
                className="mt-0.5 rounded text-[#0F4A8C]"
              />
              <div>
                <span className="font-semibold text-[#0F172A] block">Peringatan Kritikal Darurat (Critical Alerts)</span>
                <span className="text-[11px] text-[#64748B]">Kirim langsung via Email & SMS darurat saat regangan atau getaran melewati batas yield.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] cursor-pointer">
              <input
                type="checkbox"
                checked={dailyReport}
                onChange={(e) => setDailyReport(e.target.checked)}
                className="mt-0.5 rounded text-[#0F4A8C]"
              />
              <div>
                <span className="font-semibold text-[#0F172A] block">Laporan Ringkasan Harian (Daily Digest)</span>
                <span className="text-[11px] text-[#64748B]">Rekapitulasi 24 jam setiap pukul 06:00 WIB sebelum jadwal KA pagi beroperasi.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] cursor-pointer">
              <input
                type="checkbox"
                checked={weeklySummary}
                onChange={(e) => setWeeklySummary(e.target.checked)}
                className="mt-0.5 rounded text-[#0F4A8C]"
              />
              <div>
                <span className="font-semibold text-[#0F172A] block">Laporan Mingguan Kelaikan Jembatan & Terowongan</span>
                <span className="text-[11px] text-[#64748B]">Analisis komprehensif untuk Divisi Prasarana KAI Daop 2 dan Balai Teknik Perkeretaapian.</span>
              </div>
            </label>

            <div className="pt-2">
              <label className="block font-semibold text-[#334155] mb-1">Frekuensi Transmisi Alarm</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full max-w-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#334155]"
              >
                <option value="real-time">Seketika / Real-time (Kurang dari 5 detik)</option>
                <option value="batched-15m">Pengelompokan per 15 Menit</option>
                <option value="hourly">Setiap Jam</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-[#F1F5F9]">
            <button
              onClick={handleSaveNotifications}
              className="px-4 py-2 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Simpan Preferensi Notifikasi
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: API KEYS */}
      {activeTab === 'apikeys' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A]">Kunci API & Akses Integrasi Sistem</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Integrasi SCADA KAI, MRT Jakarta OCC, dan Webhook</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSuccessToast('Kunci API baru (strulytic_live_kai_2026_x89) berhasil digenerate!');
                setTimeout(() => setSuccessToast(null), 3000);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F4A8C] text-white text-xs font-semibold rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Kunci Baru</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[#0F172A]">KAI-SCADA-INTEGRATION-KEY</span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded font-bold">AKTIF</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  readOnly
                  value="strulytic_prod_kai_99d12a8bf34409"
                  className="flex-1 bg-white border border-[#CBD5E1] rounded px-2.5 py-1.5 font-mono text-xs text-[#334155]"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("strulytic_prod_kai_99d12a8bf34409");
                    setSuccessToast('Kunci API disalin ke clipboard!');
                    setTimeout(() => setSuccessToast(null), 2000);
                  }}
                  className="p-2 border border-[#CBD5E1] hover:bg-[#F1F5F9] rounded"
                  title="Salin Kunci"
                >
                  <Copy className="w-3.5 h-3.5 text-[#475569]" />
                </button>
              </div>
              <div className="flex justify-between text-[10px] text-[#64748B] mt-2">
                <span>Izin: Read Telemetry, Alert Webhooks</span>
                <span>Dibuat: 15 Januari 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ABOUT */}
      {activeTab === 'about' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">Tentang Platform Strulytic KAI</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Versi dan spesifikasi sistem pemantauan struktural</p>
          </div>

          <div className="space-y-2 text-xs divide-y divide-[#F1F5F9]">
            <div className="flex justify-between py-2">
              <span className="text-[#64748B]">Versi Aplikasi:</span>
              <span className="font-mono font-semibold text-[#0F172A]">v1.0.0 (Enterprise KAI Release)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#64748B]">Mitra Pengembang:</span>
              <span className="font-medium text-[#0F172A]">Strulytic AIoT & Rekayasa Prasarana KAI</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#64748B]">Dukungan Standar Keselamatan:</span>
              <span className="font-medium text-[#0F172A]">EN 50126, UIC 774-3R, SNI 2833</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#64748B]">Kontak Pusat Dukungan:</span>
              <span className="font-medium text-[#0F4A8C]">ops@strulytic.kai.id · +62 21 3899 7788</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Keluar dari sesi kerja saat ini:</span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#DC2626] rounded-lg text-xs font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
