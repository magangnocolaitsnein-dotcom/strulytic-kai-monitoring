import React from 'react';
import { useIot, AppPage } from '../../context/IotContext';
import { 
  LayoutDashboard, 
  Cpu, 
  BarChart3, 
  BrainCircuit, 
  Settings 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentPage, navigateTo } = useIot();

  const navItems: Array<{ page: AppPage; label: string; icon: React.FC<{ className?: string }> }> = [
    { page: 'dashboard', label: 'Dasbor', icon: LayoutDashboard },
    { page: 'devices', label: 'Sensor', icon: Cpu },
    { page: 'reports', label: 'Laporan', icon: BarChart3 },
    { page: 'predictive', label: 'Prediktif', icon: BrainCircuit },
    { page: 'settings', label: 'Setelan', icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-[#E2E8F0] px-2 flex items-center justify-around z-40 shadow-lg">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = 
          currentPage === item.page ||
          (item.page === 'devices' && (currentPage === 'device-detail' || currentPage === 'device-config' || currentPage === 'device-reports' || currentPage === 'device-group'));

        return (
          <button
            key={item.page}
            onClick={() => navigateTo(item.page)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-colors ${
              isActive ? 'text-[#0F4A8C] font-semibold' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold underline decoration-[#0F4A8C] underline-offset-2' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
