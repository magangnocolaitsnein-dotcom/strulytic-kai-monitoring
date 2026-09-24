import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DeviceGroup, 
  DeviceItem, 
  PredictiveRiskItem, 
  SystemStats, 
  UserProfile, 
  AlertItem 
} from '../types/iot';
import { 
  INITIAL_DEVICES, 
  INITIAL_DEVICE_GROUPS, 
  INITIAL_PREDICTIVE_RISKS, 
  INITIAL_SYSTEM_STATS, 
  INITIAL_USER_PROFILE 
} from '../data/mockIotData';

export type AppPage = 
  | 'login'
  | 'dashboard'
  | 'devices'
  | 'device-detail'
  | 'device-group'
  | 'device-config'
  | 'device-reports'
  | 'reports'
  | 'predictive'
  | 'settings'
  | 'proposal-demo';

interface IotContextType {
  isAuthenticated: boolean;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  currentPage: AppPage;
  navigateTo: (page: AppPage, params?: { deviceId?: string; groupId?: string }) => void;
  selectedDeviceId: string;
  selectedGroupId: string;
  setSelectedDeviceId: (id: string) => void;
  setSelectedGroupId: (id: string) => void;
  
  devices: DeviceItem[];
  deviceGroups: DeviceGroup[];
  predictiveRisks: PredictiveRiskItem[];
  systemStats: SystemStats;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  
  // Search & Navigation
  sidebarSearchQuery: string;
  setSidebarSearchQuery: (query: string) => void;
  favorites: string[]; // group or device ids
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  recentlyViewed: Array<{ id: string; name: string; type: 'group' | 'device'; lastViewed: string }>;
  
  // Device actions
  updateDeviceConfig: (deviceId: string, config: any) => void;
  acknowledgeAlert: (alertId: string) => void;
  dismissAlert: (alertId: string) => void;
  runConnectivityTest: (deviceId: string) => Promise<{ success: boolean; latencyMs: number; message: string }>;
  
  // Active selected entities
  currentDevice: DeviceItem;
  currentGroup: DeviceGroup;
  allAlerts: AlertItem[];
  
  // UI State
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const IotContext = createContext<IotContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'flux_iot_auth_session';
const FAVORITES_STORAGE_KEY = 'flux_iot_favorites';
const RECENTS_STORAGE_KEY = 'flux_iot_recents';

export const IotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const isAuth = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    return isAuth ? 'dashboard' : 'login';
  });

  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('DEV-JKB-01');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('GRP-001');
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState<string>('');
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['GRP-001', 'GRP-002'];
    } catch {
      return ['GRP-001', 'GRP-002'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Array<{ id: string; name: string; type: 'group' | 'device'; lastViewed: string }>>(() => {
    try {
      const saved = localStorage.getItem(RECENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        { id: 'DEV-JKB-01', name: 'Strulytic SHM-G14 (Cikubang)', type: 'device', lastViewed: 'Baru saja' },
        { id: 'GRP-002', name: 'Terowongan Sasaksaat Tua', type: 'group', lastViewed: '10m yang lalu' },
        { id: 'DEV-MRT-01', name: 'Strulytic TBM-R11 (MRT Tunnel)', type: 'device', lastViewed: '30m yang lalu' }
      ];
    } catch {
      return [];
    }
  });

  const [devices, setDevices] = useState<DeviceItem[]>(INITIAL_DEVICES);
  const [deviceGroups, setDeviceGroups] = useState<DeviceGroup[]>(INITIAL_DEVICE_GROUPS);
  const [predictiveRisks] = useState<PredictiveRiskItem[]>(INITIAL_PREDICTIVE_RISKS);
  const [systemStats, setSystemStats] = useState<SystemStats>(INITIAL_SYSTEM_STATS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const login = useCallback((username: string, pass: string): boolean => {
    if (username.trim() === 'flux' && pass.trim() === 'demo') {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      showToast('Autentikasi Berhasil. Selamat datang di Platform SHM Strulytic KAI.');
      return true;
    }
    return false;
  }, [showToast]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setCurrentPage('login');
    showToast('Sesi Anda telah berakhir.');
  }, [showToast]);

  const trackRecent = useCallback((id: string, name: string, type: 'group' | 'device') => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== id);
      const updated = [{ id, name, type, lastViewed: 'Baru saja' }, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENTS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const navigateTo = useCallback((page: AppPage, params?: { deviceId?: string; groupId?: string }) => {
    if (params?.deviceId) {
      setSelectedDeviceId(params.deviceId);
      const dev = devices.find(d => d.id === params.deviceId);
      if (dev) {
        trackRecent(dev.id, dev.name, 'device');
      }
    }
    if (params?.groupId) {
      setSelectedGroupId(params.groupId);
      const grp = deviceGroups.find(g => g.id === params.groupId);
      if (grp) {
        trackRecent(grp.id, grp.name, 'group');
      }
    }
    setCurrentPage(page);
    setIsMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [devices, deviceGroups, trackRecent]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(f => f !== id) : [...prev, id];
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      showToast(exists ? 'Dihapus dari Favorit' : 'Ditambahkan ke Favorit');
      return updated;
    });
  }, [showToast]);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
    showToast('Profil pengguna berhasil disimpan.');
  }, [showToast]);

  const updateDeviceConfig = useCallback((deviceId: string, config: { name?: string; thresholds?: Record<string, { min: number; max: number }> }) => {
    setDevices(prev => prev.map(d => {
      if (d.id === deviceId) {
        return {
          ...d,
          name: config.name || d.name,
          eventLog: [
            {
              id: `EVT-${Date.now().toString().slice(-4)}`,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
              type: 'CONFIG',
              severity: 'info',
              message: 'Konfigurasi parameter batas ambang dan telemetry diperbarui oleh operator.'
            },
            ...d.eventLog
          ]
        };
      }
      return d;
    }));
    showToast(`Konfigurasi perangkat ${deviceId} berhasil disimpan.`);
  }, [showToast]);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setDevices(prev => prev.map(d => ({
      ...d,
      alerts: d.alerts.map(a => a.id === alertId ? { ...a, acknowledged: true } : a)
    })));
    showToast('Peringatan telah dikonfirmasi (Acknowledged).');
  }, [showToast]);

  const dismissAlert = useCallback((alertId: string) => {
    setDevices(prev => prev.map(d => ({
      ...d,
      alerts: d.alerts.filter(a => a.id !== alertId)
    })));
    showToast('Peringatan telah ditutup (Dismissed).');
  }, [showToast]);

  const runConnectivityTest = useCallback(async (deviceId: string) => {
    await new Promise(resolve => setTimeout(resolve, 850));
    const latency = Math.floor(Math.random() * 25) + 18;
    showToast(`Uji konektivitas ${deviceId} selesai: 100% lolos (Latency: ${latency}ms)`);
    return {
      success: true,
      latencyMs: latency,
      message: `Modem LoRaWAN / Gateway MQTT merespons normal (Signal: -64 dBm, Paket 0% loss).`
    };
  }, [showToast]);

  // Subtle real-time data jitter for realistic live SHM monitoring
  useEffect(() => {
    const timer = setInterval(() => {
      setDevices(prev => prev.map(d => {
        // Small fluctuation on metric 1
        const delta = (Math.random() - 0.5) * 0.4;
        const newVal = Number((d.metrics.metric1.value + delta).toFixed(2));
        return {
          ...d,
          metrics: {
            ...d.metrics,
            metric1: {
              ...d.metrics.metric1,
              value: newVal,
              sparkline: [...d.metrics.metric1.sparkline.slice(1), newVal]
            }
          }
        };
      }));

      setSystemStats(prev => ({
        ...prev,
        mqttThroughputEventsSec: 2400 + Math.floor(Math.random() * 80),
        cpuUsage: 43 + Math.floor(Math.random() * 6)
      }));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentDevice = useMemo(() => {
    return devices.find(d => d.id === selectedDeviceId) || devices[0];
  }, [devices, selectedDeviceId]);

  const currentGroup = useMemo(() => {
    return deviceGroups.find(g => g.id === selectedGroupId) || deviceGroups[0];
  }, [deviceGroups, selectedGroupId]);

  const allAlerts = useMemo(() => {
    return devices.flatMap(d => d.alerts);
  }, [devices]);

  return (
    <IotContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentPage,
        navigateTo,
        selectedDeviceId,
        selectedGroupId,
        setSelectedDeviceId,
        setSelectedGroupId,
        devices,
        deviceGroups,
        predictiveRisks,
        systemStats,
        userProfile,
        updateUserProfile,
        updateProfile: updateUserProfile,
        sidebarSearchQuery,
        setSidebarSearchQuery,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyViewed,
        updateDeviceConfig,
        acknowledgeAlert,
        dismissAlert,
        runConnectivityTest,
        currentDevice,
        currentGroup,
        allAlerts,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </IotContext.Provider>
  );
};

export const useIot = () => {
  const context = useContext(IotContext);
  if (!context) {
    throw new Error('useIot must be used within an IotProvider');
  }
  return context;
};
