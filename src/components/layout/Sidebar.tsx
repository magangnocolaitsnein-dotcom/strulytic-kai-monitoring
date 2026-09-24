import React, { useState, useMemo } from 'react';
import { useIot } from '../../context/IotContext';
import { 
  LayoutDashboard, 
  Cpu, 
  FolderKanban, 
  BarChart3, 
  BrainCircuit, 
  Settings, 
  Search, 
  X, 
  Star, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Radio, 
  ChevronRight,
  Train,
  Sparkles
} from 'lucide-react';
import { ParodyLogo } from '../common/ParodyLogo';

export const Sidebar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    devices, 
    deviceGroups, 
    selectedGroupId,
    selectedDeviceId,
    favorites, 
    toggleFavorite, 
    recentlyViewed,
    isMobileDrawerOpen,
    setIsMobileDrawerOpen
  } = useIot();

  const [searchQuery, setSearchQuery] = useState('');

  // Search logic across groups and devices within groups
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();

    const matchedGroups = deviceGroups.filter(g => 
      g.name.toLowerCase().includes(query) ||
      g.division.toLowerCase().includes(query) ||
      g.typeLabel.toLowerCase().includes(query)
    );

    const matchedDevices = devices.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.code.toLowerCase().includes(query) ||
      d.location.name.toLowerCase().includes(query) ||
      d.typeLabel.toLowerCase().includes(query)
    );

    return {
      groups: matchedGroups,
      devices: matchedDevices,
      totalCount: matchedGroups.length + matchedDevices.length
    };
  }, [searchQuery, deviceGroups, devices]);

  const favoriteGroups = useMemo(() => {
    return deviceGroups.filter(g => favorites.includes(g.id));
  }, [deviceGroups, favorites]);

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden bg-white text-[#0F172A] border-r border-[#E2E8F0]">
      {/* Brand & KAI Operator Lockup with Parody Logo */}
      <div className="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
        <div 
          onClick={() => navigateTo('proposal-demo')}
          className="flex items-center gap-2 cursor-pointer group"
          title="Klik untuk melihat Proposal Demo & Studio Logo Plesetan KAI"
        >
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 py-1 rounded-lg group-hover:border-[#0F4A8C] transition-colors">
            <ParodyLogo variant="rai" width={56} height={20} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-xs font-bold text-[#0F172A] tracking-tight leading-none group-hover:text-[#0F4A8C] transition-colors">
                Strulytic AIoT
              </h1>
              <span className="text-[9px] font-bold text-[#EA580C] bg-[#FFF7ED] px-1 py-0.2 rounded border border-[#FED7AA]">
                DEMO
              </span>
            </div>
            <p className="text-[10px] text-[#64748B] mt-0.5 font-medium leading-none">
              PT Kereta Api Indonesia
            </p>
          </div>
        </div>
        {isMobileDrawerOpen && (
          <button 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="p-1 text-[#64748B] hover:text-[#0F172A]"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Nav Items */}
      <div className="p-3 border-b border-[#E2E8F0] space-y-1">
        <button
          onClick={() => navigateTo('dashboard')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            currentPage === 'dashboard'
              ? 'bg-[#0F4A8C] text-white shadow-xs'
              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span className="truncate">Dasbor Utama (Overview)</span>
        </button>

        <button
          onClick={() => navigateTo('devices')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            currentPage === 'devices'
              ? 'bg-[#0F4A8C] text-white shadow-xs'
              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          }`}
        >
          <Cpu className="w-4 h-4 shrink-0" />
          <span className="truncate">Daftar Semua Sensor</span>
          <span className="ml-auto text-[10px] bg-[#E2E8F0] text-[#334155] px-1.5 py-0.2 rounded font-mono">
            {devices.length}
          </span>
        </button>
      </div>

      {/* Search Groups & Devices Box (PRD Behavior) */}
      <div className="p-3 border-b border-[#E2E8F0] bg-[#FAFCFF]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Cari jembatan, terowongan, sensor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#CBD5E1] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F4A8C] focus:ring-1 focus:ring-[#0F4A8C] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-[#94A3B8] hover:text-[#0F172A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Middle Section: Search Results OR Groups / Favorites / Recents */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {searchResults ? (
          /* Real-time Inline Search Results */
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider">
                Hasil Pencarian ({searchResults.totalCount})
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-[#0F4A8C] hover:underline"
              >
                Reset
              </button>
            </div>

            {searchResults.totalCount === 0 ? (
              <div className="p-4 text-center text-xs text-[#64748B] bg-[#F8FAFC] rounded-lg border border-dashed border-[#CBD5E1]">
                Tidak ditemukan hasil untuk "{searchQuery}". Coba kata kunci lain (misal: "Cikubang", "Sasaksaat", "Strain", "MRT").
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.groups.length > 0 && (
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-semibold">Grup Infrastruktur</span>
                    <div className="mt-1 space-y-1">
                      {searchResults.groups.map(grp => (
                        <button
                          key={grp.id}
                          onClick={() => navigateTo('device-group', { groupId: grp.id })}
                          className="w-full text-left p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-semibold text-[#0F172A]">{grp.name}</p>
                            <p className="text-[10px] text-[#64748B]">{grp.onlineCount}/{grp.deviceCount} sensor aktif</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.devices.length > 0 && (
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-semibold">Perangkat Sensor</span>
                    <div className="mt-1 space-y-1">
                      {searchResults.devices.map(dev => (
                        <button
                          key={dev.id}
                          onClick={() => navigateTo('device-detail', { deviceId: dev.id })}
                          className="w-full text-left p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-medium text-[#0F172A] truncate">{dev.name}</p>
                            <p className="text-[10px] text-[#64748B]">{dev.code} · {dev.groupName}</p>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${dev.status === 'critical' ? 'bg-[#EF4444]' : dev.status === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Standard Structure: Favorites + Device Groups + Recents */
          <>
            {/* Favorites (Pinned) */}
            {favoriteGroups.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>Infrastruktur Favorit</span>
                  </span>
                  <span className="text-[10px] text-[#64748B]">{favoriteGroups.length} pin</span>
                </div>
                <div className="space-y-1.5">
                  {favoriteGroups.map(grp => (
                    <div
                      key={grp.id}
                      onClick={() => navigateTo('device-group', { groupId: grp.id })}
                      className="cursor-pointer p-2.5 rounded-lg border border-[#CBD5E1] bg-gradient-to-r from-[#F8FAFC] to-[#FFFFFF] hover:border-[#0F4A8C] transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#0F4A8C] truncate">
                          {grp.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(grp.id);
                          }}
                          className="text-[#F59E0B] hover:text-[#D97706]"
                        >
                          <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-1">
                        <span>{grp.onlineCount}/{grp.deviceCount} sensor</span>
                        <span className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${grp.status === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'}`} />
                          <span className="capitalize">{grp.status}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Device Groups / Categories (PRD 100px Mini Card Format) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-[#0F4A8C]" />
                  <span>Koridor Jembatan & Terowongan</span>
                </span>
                <span className="text-[10px] text-[#64748B]">{deviceGroups.length} Koridor</span>
              </div>

              <div className="space-y-2">
                {deviceGroups.map(grp => {
                  const isSelected = selectedGroupId === grp.id && currentPage === 'device-group';
                  const isFav = favorites.includes(grp.id);

                  return (
                    <div
                      key={grp.id}
                      onClick={() => navigateTo('device-group', { groupId: grp.id })}
                      className={`cursor-pointer rounded-lg p-2.5 border transition-all ${
                        isSelected
                          ? 'border-[#0F4A8C] bg-[#EFF6FF] shadow-xs'
                          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#0F172A] truncate">
                            {grp.name}
                          </h4>
                          <p className="text-[10px] text-[#64748B] truncate mt-0.5">
                            {grp.division}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(grp.id);
                          }}
                          className={`p-1 rounded ${
                            isFav ? 'text-[#F59E0B]' : 'text-[#CBD5E1] hover:text-[#94A3B8]'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-[#F59E0B]' : ''}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#F1F5F9] text-[11px]">
                        <span className="flex items-center gap-1 text-[#334155] font-mono">
                          <span className={`w-2 h-2 rounded-full ${
                            grp.status === 'critical' ? 'bg-[#EF4444]' :
                            grp.status === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'
                          }`} />
                          <span>{grp.onlineCount} / {grp.deviceCount} online</span>
                        </span>
                        <span className="text-[10px] text-[#64748B]">{grp.lastUpdated}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recents Section */}
            {recentlyViewed.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#64748B]" />
                    <span>Terakhir Dilihat</span>
                  </span>
                </div>
                <div className="space-y-1">
                  {recentlyViewed.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.type === 'device') {
                          navigateTo('device-detail', { deviceId: item.id });
                        } else {
                          navigateTo('device-group', { groupId: item.id });
                        }
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs text-[#334155] hover:bg-[#F1F5F9] flex items-center justify-between transition-colors"
                    >
                      <span className="truncate max-w-40">{item.name}</span>
                      <span className="text-[10px] text-[#94A3B8] shrink-0">{item.lastViewed}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Fixed Navigation Items */}
      <div className="p-3 border-t border-[#E2E8F0] space-y-1 bg-[#F8FAFC]">
        <button
          onClick={() => navigateTo('reports')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            currentPage === 'reports'
              ? 'bg-[#0F4A8C] text-white shadow-xs'
              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          }`}
        >
          <BarChart3 className="w-4 h-4 shrink-0" />
          <span>Laporan Umum Platform</span>
        </button>

        <button
          onClick={() => navigateTo('predictive')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            currentPage === 'predictive'
              ? 'bg-[#0F4A8C] text-white shadow-xs'
              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 shrink-0 text-[#00A896]" />
          <span>Analitik Prediktif AI</span>
        </button>

        <button
          onClick={() => navigateTo('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            currentPage === 'settings'
              ? 'bg-[#0F4A8C] text-white shadow-xs'
              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Pengaturan Akun</span>
        </button>

        {/* Highlighted Proposal Demo & Parody Logo Action */}
        <button
          onClick={() => navigateTo('proposal-demo')}
          className={`w-full flex items-center gap-2 px-2.5 py-2 text-xs font-bold rounded-lg transition-all border ${
            currentPage === 'proposal-demo'
              ? 'bg-[#0F4A8C] text-white border-[#0F4A8C] shadow-xs'
              : 'bg-[#FFF7ED] text-[#C2410C] hover:bg-[#FFEDD5] border-[#FED7AA]'
          }`}
        >
          <div className="bg-white px-1 py-0.5 rounded shadow-2xs">
            <ParodyLogo variant="rai" width={28} height={10} />
          </div>
          <span className="truncate">Logo Plesetan KAI</span>
          <span className="ml-auto text-[9px] bg-[#EA580C] text-white px-1.5 py-0.2 rounded font-mono font-bold">
            PROPOSAL
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar (280px width as per PRD) */}
      <aside className="hidden lg:block w-[280px] shrink-0 h-screen sticky top-0 z-30">
        {renderSidebarContent()}
      </aside>

      {/* Mobile / Tablet Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div className="relative w-[280px] max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </>
  );
};
