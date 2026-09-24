import React, { useState } from 'react';
import { useIot } from '../../context/IotContext';
import { 
  Bell, 
  Menu, 
  User, 
  LogOut, 
  Radio, 
  Clock, 
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ParodyLogo } from '../common/ParodyLogo';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    userProfile, 
    logout, 
    allAlerts,
    setIsMobileDrawerOpen,
    systemStats
  } = useIot();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const unreadAlertsCount = allAlerts.filter(a => !a.acknowledged).length;

  const currentTime = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 lg:px-6 py-2.5 h-16 flex items-center justify-between">
      {/* Zone 1: Mobile Hamburger & Brand Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="lg:hidden p-2 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('dashboard');
          }}
          className="text-base font-bold tracking-tight text-[#0F172A] flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 py-0.5 rounded shadow-2xs">
            <ParodyLogo variant="rai" width={48} height={16} />
          </div>
          <span className="hidden sm:inline">Strulytic AIoT</span>
        </a>
      </div>

      {/* Zone 2: Navigation Links (Clean text links, single-line) */}
      <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#475569]">
        <button
          onClick={() => navigateTo('dashboard')}
          className={`hover:text-[#0F4A8C] transition-colors whitespace-nowrap ${
            currentPage === 'dashboard' ? 'text-[#0F4A8C] font-semibold border-b-2 border-[#0F4A8C] pb-0.5' : ''
          }`}
        >
          Dasbor
        </button>
        <button
          onClick={() => navigateTo('devices')}
          className={`hover:text-[#0F4A8C] transition-colors whitespace-nowrap ${
            currentPage === 'devices' || currentPage === 'device-detail' || currentPage === 'device-config' || currentPage === 'device-reports'
              ? 'text-[#0F4A8C] font-semibold border-b-2 border-[#0F4A8C] pb-0.5'
              : ''
          }`}
        >
          Sensor & Perangkat
        </button>
        <button
          onClick={() => navigateTo('device-group', { groupId: 'GRP-001' })}
          className={`hover:text-[#0F4A8C] transition-colors whitespace-nowrap ${
            currentPage === 'device-group' ? 'text-[#0F4A8C] font-semibold border-b-2 border-[#0F4A8C] pb-0.5' : ''
          }`}
        >
          Koridor
        </button>
        <button
          onClick={() => navigateTo('reports')}
          className={`hover:text-[#0F4A8C] transition-colors whitespace-nowrap ${
            currentPage === 'reports' ? 'text-[#0F4A8C] font-semibold border-b-2 border-[#0F4A8C] pb-0.5' : ''
          }`}
        >
          Laporan
        </button>
        <button
          onClick={() => navigateTo('predictive')}
          className={`hover:text-[#0F4A8C] transition-colors whitespace-nowrap ${
            currentPage === 'predictive' ? 'text-[#0F4A8C] font-semibold border-b-2 border-[#0F4A8C] pb-0.5' : ''
          }`}
        >
          AI Prediktif
        </button>
        <button
          onClick={() => navigateTo('proposal-demo')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
            currentPage === 'proposal-demo'
              ? 'bg-[#0F4A8C] text-white shadow-xs'
              : 'bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] border border-[#FED7AA]'
          }`}
          title="Buka Halaman Proposal Demo & Logo Plesetan KAI"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Logo Demo KAI</span>
        </button>
      </nav>

      {/* Zone 3: Primary Actions & User Status */}
      <div className="flex items-center gap-3">
        {/* Live sync & clock status */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-xs text-[#475569]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="font-mono tabular-nums">{currentTime} WIB</span>
          <span className="text-[#CBD5E1]">·</span>
          <span>{systemStats.mqttThroughputEventsSec} ev/s</span>
        </div>

        {/* Alerts quick button */}
        <button
          onClick={() => navigateTo('reports')}
          className="relative p-2 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          title={`${unreadAlertsCount} peringatan aktif`}
        >
          <Bell className="w-5 h-5" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
          )}
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-1 pl-2 hover:bg-[#F1F5F9] rounded-lg transition-colors border border-transparent hover:border-[#E2E8F0]"
          >
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-[#0F172A] truncate max-w-32">
                {userProfile.name}
              </div>
              <div className="text-[10px] text-[#64748B]">KAI Daop 2 / MRT</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0F4A8C] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {userProfile.avatarInitials}
            </div>
          </button>

          {isProfileMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
              onMouseLeave={() => setIsProfileMenuOpen(false)}
            >
              <div className="px-3.5 py-2 border-b border-[#E2E8F0]">
                <p className="text-xs font-semibold text-[#0F172A] truncate">{userProfile.name}</p>
                <p className="text-[11px] text-[#64748B] truncate">{userProfile.email}</p>
                <div className="mt-1 text-[10px] text-[#0F4A8C] font-medium bg-[#0F4A8C]/10 px-1.5 py-0.5 rounded inline-block">
                  {userProfile.role}
                </div>
              </div>

              <button
                onClick={() => {
                  navigateTo('settings');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-[#334155] hover:bg-[#F8FAFC] flex items-center gap-2 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Pengaturan Akun & SHM</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsProfileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-[#EF4444] hover:bg-[#FEF2F2] flex items-center gap-2 transition-colors border-t border-[#E2E8F0] mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar (Logout)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
