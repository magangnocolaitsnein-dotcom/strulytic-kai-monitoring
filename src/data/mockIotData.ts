import { DeviceGroup, DeviceItem, PredictiveRiskItem, SystemStats, UserProfile } from '../types/iot';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Bambang Tri Atmojo, S.T., M.Eng.",
  email: "bambang.atmojo@kai.id",
  phone: "+62 811-229-4780",
  organization: "PT Kereta Api Indonesia (Persero)",
  department: "Direktorat Prasarana - Unit Jembatan & Terowongan Daop 2 / MRT Transit",
  role: "Senior Infrastructure SHM Specialist (Superintendent)",
  joinDate: "2018-04-10",
  licenseNumber: "SKA-HAKI-2024-88491",
  avatarInitials: "BA"
};

export const INITIAL_DEVICE_GROUPS: DeviceGroup[] = [
  {
    id: "GRP-001",
    name: "Jembatan Cikubang (BH 513 - Daop 2)",
    code: "JKB-513",
    type: "bridge",
    typeLabel: "Steel Truss High Pier Bridge",
    operator: "PT Kereta Api Indonesia (Persero)",
    division: "Daop 2 Bandung - Petak Padalarang - Cilame",
    location: "Padalarang, Kabupaten Bandung Barat",
    coordinates: [-6.8408, 107.4722],
    description: "Jembatan kereta api baja terpanjang di Jawa (300m, 11 pilar baja hingga 80m). Beroperasi sejak 1906 untuk lintasan KA Argo Parahyangan & Serayu.",
    status: "online",
    deviceCount: 12,
    onlineCount: 12,
    offlineCount: 0,
    warningCount: 0,
    activeAlerts: 1,
    criticalAlerts: 0,
    lastUpdated: "2 menit yang lalu",
    yearBuilt: 1906,
    structureHeritageGrade: "A - Heritage Cagar Budaya",
    aggregatedMetrics: {
      avgStrainMicrostrain: 382.4,
      avgVibrationRms: 3.42,
      avgConvergenceMm: 1.15,
      avgTemperature: 27.8,
      onlineRate: 1.0
    },
    devices: ["DEV-JKB-01", "DEV-JKB-02", "DEV-JKB-03", "DEV-JKB-04"],
    tags: ["heritage-1906", "high-pier", "daop-2", "dynamic-load-monitoring"]
  },
  {
    id: "GRP-002",
    name: "Terowongan Sasaksaat Tua (BH 503 - Daop 2)",
    code: "TSK-503",
    type: "tunnel",
    typeLabel: "Historic Mountain Masonry Tunnel",
    operator: "PT Kereta Api Indonesia (Persero)",
    division: "Daop 2 Bandung - Petak Sasaksaat - Maswati",
    location: "Sumurbandung, Cipatat, Bandung Barat",
    coordinates: [-6.7933, 107.4172],
    description: "Terowongan kereta api aktif tertua & terpanjang Daop 2 (panjang 949m). Dibangun Staatspoorwegen (SS) tahun 1902-1903 menembus bukit batuan andesit.",
    status: "warning",
    deviceCount: 8,
    onlineCount: 7,
    offlineCount: 0,
    warningCount: 1,
    activeAlerts: 2,
    criticalAlerts: 1,
    lastUpdated: "1 menit yang lalu",
    yearBuilt: 1902,
    structureHeritageGrade: "A - Heritage Cagar Budaya",
    aggregatedMetrics: {
      avgStrainMicrostrain: 295.6,
      avgVibrationRms: 2.18,
      avgConvergenceMm: 4.82,
      avgTemperature: 23.4,
      onlineRate: 0.875
    },
    devices: ["DEV-TSK-01", "DEV-TSK-02", "DEV-TSK-03", "DEV-TSK-04"],
    tags: ["tunnel-lining-crack", "seepage-monitor", "convergence-meter", "heritage-1902"]
  },
  {
    id: "GRP-003",
    name: "MRT Jakarta Underground Tunnel (Dukuh Atas - HI)",
    code: "MRT-TU-01",
    type: "metro_underground",
    typeLabel: "Underground Metro Shield Tunnel",
    operator: "PT MRT Jakarta",
    division: "Fase 1 North-South Corridor (Chainage 11+400)",
    location: "Jl. MH Thamrin - Sudirman, Jakarta Pusat",
    coordinates: [-6.2008, 106.8227],
    description: "Segmen terowongan ganda underground diameter 6.65m dengan cincin precast beton bertulang. Dipantau untuk konvergensi radial & getaran operasional.",
    status: "online",
    deviceCount: 16,
    onlineCount: 16,
    offlineCount: 0,
    warningCount: 0,
    activeAlerts: 0,
    criticalAlerts: 0,
    lastUpdated: "Baru saja",
    yearBuilt: 2019,
    structureHeritageGrade: "Modern Transit Asset",
    aggregatedMetrics: {
      avgStrainMicrostrain: 165.2,
      avgVibrationRms: 1.84,
      avgConvergenceMm: 0.72,
      avgTemperature: 26.2,
      onlineRate: 1.0
    },
    devices: ["DEV-MRT-01", "DEV-MRT-02"],
    tags: ["shield-tunnel", "precast-ring", "urban-subsurface", "metro-jakarta"]
  },
  {
    id: "GRP-004",
    name: "Jembatan Cirahong Heritage Double-Deck (BH 1290)",
    code: "JCR-1290",
    type: "bridge",
    typeLabel: "Historic Double-Deck Truss Bridge",
    operator: "PT Kereta Api Indonesia (Persero)",
    division: "Daop 2 Bandung - Petak Manonjaya - Ciamis",
    location: "Perbatasan Manonjaya Tasikmalaya & Ciamis",
    coordinates: [-7.3486, 108.2618],
    description: "Jembatan peninggalan SS 1893 dengan konstruksi gelagar baja unik: lantai atas untuk rel kereta api dan lantai bawah untuk kendaraan bermotor & pejalan kaki.",
    status: "warning",
    deviceCount: 10,
    onlineCount: 9,
    offlineCount: 1,
    warningCount: 1,
    activeAlerts: 2,
    criticalAlerts: 0,
    lastUpdated: "3 menit yang lalu",
    yearBuilt: 1893,
    structureHeritageGrade: "A - Heritage Cagar Budaya",
    aggregatedMetrics: {
      avgStrainMicrostrain: 442.8,
      avgVibrationRms: 4.65,
      avgConvergenceMm: 2.10,
      avgTemperature: 29.1,
      onlineRate: 0.90
    },
    devices: ["DEV-JCR-01", "DEV-JCR-02"],
    tags: ["double-deck", "citanduy-river", "fatigue-monitoring", "heritage-1893"]
  },
  {
    id: "GRP-005",
    name: "LRT Jabodebek Longspan Dukuh Atas (Km 0+450)",
    code: "LRT-LSP-01",
    type: "longspan",
    typeLabel: "Curved Concrete Box Girder",
    operator: "LRT Jabodebek",
    division: "Lintas Pelayanan 2 Cawang - Dukuh Atas",
    location: "Kuningan - Setiabudi, Jakarta Selatan",
    coordinates: [-6.2088, 106.8285],
    description: "Jembatan lengkung beton bentang panjang radius kecil 115m terpanjang di Indonesia. Menggunakan sensor Strulytic fiber-optic strain & dynamic thermal tiltmeter.",
    status: "online",
    deviceCount: 10,
    onlineCount: 10,
    offlineCount: 0,
    warningCount: 0,
    activeAlerts: 0,
    criticalAlerts: 0,
    lastUpdated: "5 menit yang lalu",
    yearBuilt: 2022,
    structureHeritageGrade: "Modern Transit Asset",
    aggregatedMetrics: {
      avgStrainMicrostrain: 210.5,
      avgVibrationRms: 2.30,
      avgConvergenceMm: 0.45,
      avgTemperature: 31.4,
      onlineRate: 1.0
    },
    devices: ["DEV-LRT-01"],
    tags: ["longspan-box-girder", "thermal-expansion", "urban-viaduct"]
  }
];

export const INITIAL_DEVICES: DeviceItem[] = [
  {
    id: "DEV-JKB-01",
    name: "Strulytic SHM-G14: Truss Rivet Node 4L",
    code: "JKB-STR-01",
    type: "strain_gauge",
    typeLabel: "Dynamic Microstrain & Joint Stress Transducer",
    status: "online",
    statusColor: "#22C55E",
    groupId: "GRP-001",
    groupName: "Jembatan Cikubang (BH 513 - Daop 2)",
    location: {
      name: "Jembatan Cikubang Bentang Utama IV",
      corridor: "Lintas Kroya - Bandung - Jakarta",
      subLocation: "Sambungan Gelagar Baja Pilar 4 (Sisi Hulu)",
      coordinates: [-6.8408, 107.4722],
      elevationMeters: 595,
      kilometerPost: "Km 109+300"
    },
    connection: {
      protocol: "MQTT/TLS",
      ipAddress: "10.42.18.104",
      lastSync: "15 detik yang lalu",
      quality: 96,
      packetLossPercent: 0.04,
      firmwareVersion: "v3.4.2-strulytic-kai"
    },
    uptime: {
      thisMonth: 99.98,
      allTime: 99.89,
      mtbfHours: 4280,
      dataPointsCollected: 1420800
    },
    metrics: {
      metric1: {
        label: "Regangan Baja (Microstrain)",
        value: 382.4,
        unit: "µε",
        min: 120.0,
        max: 520.0,
        threshold: { warning: 600.0, critical: 750.0 },
        trend: "→",
        status: "normal",
        sparkline: [360.2, 365.1, 372.4, 380.0, 382.4, 381.8]
      },
      metric2: {
        label: "Tegangan Lentur Joint",
        value: 78.4,
        unit: "MPa",
        min: 35.0,
        max: 110.0,
        threshold: { warning: 135.0, critical: 160.0 },
        trend: "↑",
        status: "normal",
        sparkline: [72.1, 74.5, 75.8, 77.0, 78.2, 78.4]
      },
      metric3: {
        label: "Celah Muai Sambungan",
        value: 14.8,
        unit: "mm",
        min: 11.2,
        max: 18.5,
        threshold: { warning: 22.0, critical: 26.0 },
        trend: "→",
        status: "normal",
        sparkline: [14.6, 14.7, 14.7, 14.8, 14.8, 14.8]
      },
      metric4: {
        label: "Suhu Permukaan Baja Gelagar",
        value: 28.5,
        unit: "°C",
        min: 21.0,
        max: 38.0,
        threshold: { warning: 42.0, critical: 48.0 },
        trend: "→",
        status: "normal",
        sparkline: [26.4, 27.0, 27.5, 28.1, 28.3, 28.5]
      }
    },
    trends24h: {
      timestamps: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      metric1: [210, 205, 198, 200, 220, 290, 480, 520, 390, 380, 410, 510, 490, 395, 410, 495, 520, 480, 410, 382, 340, 290, 240, 220],
      metric2: [42, 41, 39, 40, 45, 62, 98, 106, 79, 78, 83, 104, 99, 81, 84, 101, 107, 98, 83, 78, 69, 58, 48, 44],
      metric3: [12.4, 12.2, 12.1, 12.1, 12.5, 13.2, 14.1, 14.9, 15.6, 16.0, 16.2, 16.4, 16.2, 15.9, 15.4, 15.0, 14.8, 14.2, 13.8, 13.4, 13.0, 12.8, 12.6, 12.5],
      metric4: [22.1, 21.8, 21.4, 21.2, 21.5, 22.8, 24.5, 27.2, 29.8, 32.1, 33.5, 34.2, 33.8, 32.4, 30.5, 29.1, 28.5, 27.2, 26.1, 25.0, 24.2, 23.5, 22.9, 22.4]
    },
    visualization3d: {
      type: "truss_joint",
      geometry: "truss_node",
      statusColor: "#22C55E",
      rotationSpeed: 0.8,
      accentColor: "#0F4A8C",
      highlightCoordinates: [0, 1.2, 0]
    },
    eventLog: [
      {
        id: "EVT-8821",
        timestamp: "2026-09-23 19:42:10",
        type: "METRIC",
        severity: "info",
        message: "Puncak beban dinamis 482 µε tercatat saat KA Argo Parahyangan (CC206-13) melintas."
      },
      {
        id: "EVT-8820",
        timestamp: "2026-09-23 18:30:00",
        type: "STATUS",
        severity: "info",
        message: "Pengecekan telemetry sync 10-menit nominal. Signal RSSI -62 dBm."
      },
      {
        id: "EVT-8819",
        timestamp: "2026-09-23 16:15:22",
        type: "CONFIG",
        severity: "info",
        message: "Batas ambang sampling frekuensi tinggi diatur otomatis ke 200 Hz."
      },
      {
        id: "EVT-8818",
        timestamp: "2026-09-23 14:02:45",
        type: "ALERT",
        severity: "warning",
        message: "Pergeseran termal bearing 16.4 mm mencapai 75% ambang peringatan siang hari."
      }
    ],
    alerts: [
      {
        id: "ALR-801",
        deviceId: "DEV-JKB-01",
        deviceName: "Strulytic SHM-G14: Truss Rivet Node 4L",
        groupId: "GRP-001",
        groupName: "Jembatan Cikubang (BH 513)",
        severity: "warning",
        type: "thermal_expansion_limit",
        message: "Fluktuasi regangan termal siang melampaui rentang nominal harian.",
        timestamp: "2026-09-23 14:02:45",
        acknowledged: false
      }
    ],
    lastUpdate: "15 detik yang lalu"
  },
  {
    id: "DEV-JKB-02",
    name: "Strulytic ACC-3X: Pier 4 Lateral Accelerometer",
    code: "JKB-ACC-02",
    type: "triaxial_accelerometer",
    typeLabel: "Triaxial Piezoelectric Seismic & Bogie Accelerometer",
    status: "online",
    statusColor: "#22C55E",
    groupId: "GRP-001",
    groupName: "Jembatan Cikubang (BH 513 - Daop 2)",
    location: {
      name: "Kepala Pilar 4 Baja Cikubang",
      corridor: "Lintas Kroya - Bandung - Jakarta",
      subLocation: "Dudukan Bearing Roll Kiri",
      coordinates: [-6.8409, 107.4724],
      elevationMeters: 592,
      kilometerPost: "Km 109+315"
    },
    connection: {
      protocol: "MQTT/TLS",
      ipAddress: "10.42.18.105",
      lastSync: "30 detik yang lalu",
      quality: 94,
      packetLossPercent: 0.08,
      firmwareVersion: "v3.4.2-strulytic-kai"
    },
    uptime: {
      thisMonth: 100.0,
      allTime: 99.94,
      mtbfHours: 5120,
      dataPointsCollected: 2150000
    },
    metrics: {
      metric1: {
        label: "Kecepatan Getaran (RMS)",
        value: 3.42,
        unit: "mm/s",
        min: 0.4,
        max: 8.5,
        threshold: { warning: 12.0, critical: 18.0 },
        trend: "→",
        status: "normal",
        sparkline: [2.1, 2.3, 2.8, 3.2, 3.4, 3.42]
      },
      metric2: {
        label: "Frekuensi Dominan Struktur",
        value: 2.14,
        unit: "Hz",
        min: 1.8,
        max: 2.6,
        threshold: { warning: 1.6, critical: 1.4 },
        trend: "→",
        status: "normal",
        sparkline: [2.18, 2.16, 2.15, 2.14, 2.14, 2.14]
      },
      metric3: {
        label: "Puncak Akselerasi Lateral",
        value: 0.18,
        unit: "g",
        min: 0.02,
        max: 0.45,
        threshold: { warning: 0.35, critical: 0.50 },
        trend: "↓",
        status: "normal",
        sparkline: [0.24, 0.22, 0.20, 0.19, 0.18, 0.18]
      },
      metric4: {
        label: "Indeks Redaman Getaran",
        value: 3.2,
        unit: "%",
        min: 2.5,
        max: 4.5,
        threshold: { warning: 2.0, critical: 1.5 },
        trend: "→",
        status: "normal",
        sparkline: [3.3, 3.3, 3.2, 3.2, 3.2, 3.2]
      }
    },
    trends24h: {
      timestamps: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      metric1: [0.6, 0.5, 0.5, 0.7, 1.2, 2.8, 4.2, 4.5, 3.2, 3.4, 3.8, 4.6, 4.1, 3.2, 3.6, 4.4, 4.8, 3.9, 3.42, 2.8, 1.9, 1.2, 0.8, 0.6],
      metric2: [2.16, 2.16, 2.16, 2.15, 2.15, 2.14, 2.14, 2.13, 2.14, 2.14, 2.14, 2.13, 2.14, 2.14, 2.14, 2.14, 2.13, 2.14, 2.14, 2.15, 2.15, 2.16, 2.16, 2.16],
      metric3: [0.03, 0.02, 0.02, 0.04, 0.09, 0.22, 0.38, 0.41, 0.24, 0.25, 0.29, 0.39, 0.34, 0.22, 0.26, 0.36, 0.42, 0.31, 0.18, 0.15, 0.10, 0.06, 0.04, 0.03],
      metric4: [3.4, 3.4, 3.4, 3.3, 3.3, 3.2, 3.1, 3.1, 3.2, 3.2, 3.2, 3.1, 3.2, 3.2, 3.2, 3.1, 3.1, 3.2, 3.2, 3.3, 3.3, 3.4, 3.4, 3.4]
    },
    visualization3d: {
      type: "rail_fastener",
      geometry: "rail_profile",
      statusColor: "#22C55E",
      rotationSpeed: 0.6,
      accentColor: "#00A896"
    },
    eventLog: [
      {
        id: "EVT-7712",
        timestamp: "2026-09-23 19:42:15",
        type: "METRIC",
        severity: "info",
        message: "FFT Spectral signature analisis normal saat rangkaian KA melintas (Peak RMS 4.4 mm/s)."
      }
    ],
    alerts: [],
    lastUpdate: "30 detik yang lalu"
  },
  {
    id: "DEV-TSK-01",
    name: "Strulytic CONV-M08: Sasaksaat Crown Arch Ring 180",
    code: "TSK-CNV-01",
    type: "tunnel_convergence",
    typeLabel: "Laser Optical Tunnel Crown Convergence & Seepage Meter",
    status: "warning",
    statusColor: "#F59E0B",
    groupId: "GRP-002",
    groupName: "Terowongan Sasaksaat Tua (BH 503 - Daop 2)",
    location: {
      name: "Terowongan Sasaksaat Tua (Km 143+180)",
      corridor: "Lintas Purwakarta - Padalarang",
      subLocation: "Dinding Busur Bata Kolonial Sisi Barat Daya",
      coordinates: [-6.7933, 107.4172],
      elevationMeters: 574,
      kilometerPost: "Km 143+180"
    },
    connection: {
      protocol: "LoRaWAN Industrial",
      ipAddress: "10.42.22.45",
      lastSync: "1 menit yang lalu",
      quality: 82,
      packetLossPercent: 1.2,
      firmwareVersion: "v2.9.1-strulytic-tunnel"
    },
    uptime: {
      thisMonth: 99.12,
      allTime: 98.90,
      mtbfHours: 2450,
      dataPointsCollected: 890400
    },
    metrics: {
      metric1: {
        label: "Konvergensi Dinding (Radial)",
        value: 4.82,
        unit: "mm",
        min: 1.5,
        max: 7.0,
        threshold: { warning: 4.5, critical: 6.0 },
        trend: "↑",
        status: "warning",
        sparkline: [4.12, 4.30, 4.48, 4.65, 4.76, 4.82]
      },
      metric2: {
        label: "Lebar Rekahan Bata (Crack)",
        value: 2.15,
        unit: "mm",
        min: 0.5,
        max: 3.5,
        threshold: { warning: 2.0, critical: 3.0 },
        trend: "↑",
        status: "warning",
        sparkline: [1.80, 1.88, 1.95, 2.04, 2.10, 2.15]
      },
      metric3: {
        label: "Kelembaban Relatif Terowongan",
        value: 88.5,
        unit: "%RH",
        min: 75.0,
        max: 99.0,
        threshold: { warning: 92.0, critical: 96.0 },
        trend: "→",
        status: "normal",
        sparkline: [86.2, 87.1, 87.8, 88.2, 88.4, 88.5]
      },
      metric4: {
        label: "Rembasan Air Dinding (Seepage)",
        value: 12.4,
        unit: "mL/min",
        min: 2.0,
        max: 25.0,
        threshold: { warning: 18.0, critical: 24.0 },
        trend: "↑",
        status: "normal",
        sparkline: [8.5, 9.2, 10.1, 11.2, 11.9, 12.4]
      }
    },
    trends24h: {
      timestamps: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      metric1: [4.20, 4.21, 4.22, 4.24, 4.28, 4.35, 4.42, 4.50, 4.58, 4.64, 4.69, 4.72, 4.75, 4.78, 4.80, 4.81, 4.82, 4.82, 4.82, 4.82, 4.82, 4.82, 4.82, 4.82],
      metric2: [1.82, 1.83, 1.84, 1.85, 1.89, 1.94, 1.99, 2.02, 2.06, 2.09, 2.12, 2.13, 2.14, 2.15, 2.15, 2.15, 2.15, 2.15, 2.15, 2.15, 2.15, 2.15, 2.15, 2.15],
      metric3: [85.2, 85.8, 86.4, 86.9, 87.4, 87.9, 88.2, 88.5, 88.6, 88.7, 88.5, 88.3, 88.1, 88.2, 88.4, 88.5, 88.5, 88.5, 88.5, 88.5, 88.5, 88.5, 88.5, 88.5],
      metric4: [7.2, 7.5, 7.9, 8.4, 9.1, 9.8, 10.4, 11.1, 11.6, 11.9, 12.2, 12.3, 12.4, 12.4, 12.4, 12.4, 12.4, 12.4, 12.4, 12.4, 12.4, 12.4, 12.4, 12.4]
    },
    visualization3d: {
      type: "tunnel_lining",
      geometry: "tunnel_ring",
      statusColor: "#F59E0B",
      rotationSpeed: 0.5,
      accentColor: "#EF4444",
      highlightCoordinates: [-1.2, 0.8, 0]
    },
    eventLog: [
      {
        id: "EVT-6540",
        timestamp: "2026-09-23 18:22:11",
        type: "ALERT",
        severity: "warning",
        message: "Konvergensi radial melampaui batas peringatan 4.50 mm (nilai terbaca: 4.82 mm)."
      },
      {
        id: "EVT-6539",
        timestamp: "2026-09-23 17:10:04",
        type: "ALERT",
        severity: "warning",
        message: "Lebar rekahan bata pasangan meningkat menjadi 2.15 mm akibat resapan air pasca hujan lebat."
      },
      {
        id: "EVT-6538",
        timestamp: "2026-09-23 14:00:00",
        type: "STATUS",
        severity: "info",
        message: "Sensor sinkronisasi modul LoRa gateway Sasaksaat Portal Timur berhasil."
      }
    ],
    alerts: [
      {
        id: "ALR-802",
        deviceId: "DEV-TSK-01",
        deviceName: "Strulytic CONV-M08: Sasaksaat Crown Arch Ring 180",
        groupId: "GRP-002",
        groupName: "Terowongan Sasaksaat Tua (BH 503)",
        severity: "warning",
        type: "tunnel_convergence_warning",
        message: "Konvergensi radial dinding terowongan tua mencapai 4.82 mm (Ambang Peringatan 4.5 mm).",
        timestamp: "2026-09-23 18:22:11",
        acknowledged: false
      },
      {
        id: "ALR-803",
        deviceId: "DEV-TSK-01",
        deviceName: "Strulytic CONV-M08: Sasaksaat Crown Arch Ring 180",
        groupId: "GRP-002",
        groupName: "Terowongan Sasaksaat Tua (BH 503)",
        severity: "warning",
        type: "masonry_crack_widening",
        message: "Lebar rekahan pasangan batu bata melebihi 2.0 mm di Cincin Busur 180.",
        timestamp: "2026-09-23 17:10:04",
        acknowledged: true
      }
    ],
    lastUpdate: "1 menit yang lalu"
  },
  {
    id: "DEV-TSK-02",
    name: "Strulytic AE-C03: Sasaksaat Acoustic Crack Sensor",
    code: "TSK-AEC-02",
    type: "acoustic_crack",
    typeLabel: "Acoustic Emission Structural Crack & Micro-fracture Sensor",
    status: "critical",
    statusColor: "#EF4444",
    groupId: "GRP-002",
    groupName: "Terowongan Sasaksaat Tua (BH 503 - Daop 2)",
    location: {
      name: "Terowongan Sasaksaat Tua (Km 143+240)",
      corridor: "Lintas Purwakarta - Padalarang",
      subLocation: "Portal Tengah (Mid-Section Zona Sesar)",
      coordinates: [-6.7936, 107.4175],
      elevationMeters: 572,
      kilometerPost: "Km 143+240"
    },
    connection: {
      protocol: "LoRaWAN Industrial",
      ipAddress: "10.42.22.46",
      lastSync: "2 menit yang lalu",
      quality: 74,
      packetLossPercent: 2.8,
      firmwareVersion: "v2.9.1-strulytic-tunnel"
    },
    uptime: {
      thisMonth: 98.45,
      allTime: 98.10,
      mtbfHours: 1980,
      dataPointsCollected: 642000
    },
    metrics: {
      metric1: {
        label: "Energi Emisi Akustik (Hits/jam)",
        value: 142,
        unit: "hits/jam",
        min: 10,
        max: 180,
        threshold: { warning: 80, critical: 120 },
        trend: "↑",
        status: "critical",
        sparkline: [45, 62, 88, 110, 134, 142]
      },
      metric2: {
        label: "Frekuensi Puncak Micro-Fracture",
        value: 84.6,
        unit: "kHz",
        min: 40.0,
        max: 150.0,
        threshold: { warning: 75.0, critical: 90.0 },
        trend: "↑",
        status: "warning",
        sparkline: [62.1, 68.4, 73.2, 79.5, 82.1, 84.6]
      },
      metric3: {
        label: "Laju Pelepasan Energi (b-value)",
        value: 0.88,
        unit: "idx",
        min: 0.70,
        max: 1.50,
        threshold: { warning: 1.00, critical: 0.90 },
        trend: "↓",
        status: "critical",
        sparkline: [1.18, 1.12, 1.04, 0.96, 0.91, 0.88]
      },
      metric4: {
        label: "Suhu Batuan Sekitar Terowongan",
        value: 23.2,
        unit: "°C",
        min: 20.5,
        max: 26.0,
        threshold: { warning: 28.0, critical: 32.0 },
        trend: "→",
        status: "normal",
        sparkline: [23.0, 23.1, 23.1, 23.2, 23.2, 23.2]
      }
    },
    trends24h: {
      timestamps: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      metric1: [14, 12, 11, 15, 28, 45, 68, 85, 92, 104, 118, 126, 132, 138, 140, 142, 142, 142, 142, 142, 142, 142, 142, 142],
      metric2: [48, 49, 49, 52, 58, 65, 71, 74, 76, 78, 80, 81, 82, 83, 84, 84.6, 84.6, 84.6, 84.6, 84.6, 84.6, 84.6, 84.6, 84.6],
      metric3: [1.32, 1.30, 1.28, 1.25, 1.18, 1.10, 1.05, 0.98, 0.95, 0.92, 0.90, 0.89, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88],
      metric4: [22.9, 22.9, 22.9, 23.0, 23.0, 23.1, 23.1, 23.1, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2, 23.2]
    },
    visualization3d: {
      type: "tunnel_lining",
      geometry: "tunnel_ring",
      statusColor: "#EF4444",
      rotationSpeed: 0.9,
      accentColor: "#EF4444",
      highlightCoordinates: [0, -1.1, 0]
    },
    eventLog: [
      {
        id: "EVT-5510",
        timestamp: "2026-09-23 19:15:30",
        type: "ALERT",
        severity: "critical",
        message: "KRITIKAL: Emisi akustik rekahan mikro terowongan melonjak ke 142 hits/jam (ambang kritis 120 hits/jam)."
      },
      {
        id: "EVT-5509",
        timestamp: "2026-09-23 18:40:12",
        type: "ALERT",
        severity: "critical",
        message: "Parameter seismik b-value turun di bawah 0.90 menunjukkan potensi pelepasan tegangan rekahan batuan."
      }
    ],
    alerts: [
      {
        id: "ALR-804",
        deviceId: "DEV-TSK-02",
        deviceName: "Strulytic AE-C03: Sasaksaat Acoustic Crack Sensor",
        groupId: "GRP-002",
        groupName: "Terowongan Sasaksaat Tua (BH 503)",
        severity: "critical",
        type: "acoustic_microfracture_critical",
        message: "Laju perambatan retakan mikro akustik melebihi ambang batas kritis di Km 143+240.",
        timestamp: "2026-09-23 19:15:30",
        acknowledged: false
      }
    ],
    lastUpdate: "2 menit yang lalu"
  },
  {
    id: "DEV-MRT-01",
    name: "Strulytic TBM-R11: MRT Shield Tunnel Segment Ring 450",
    code: "MRT-SHD-01",
    type: "tunnel_convergence",
    typeLabel: "High-Precision Metro Segment Ovalization & Tilt Transducer",
    status: "online",
    statusColor: "#22C55E",
    groupId: "GRP-003",
    groupName: "MRT Jakarta Underground Tunnel (Dukuh Atas - HI)",
    location: {
      name: "MRT Jakarta Jalur Hilir (Track 2)",
      corridor: "Koridor Lebak Bulus - Bundaran HI",
      subLocation: "Terowongan Bawah Tanah Bawah Sungai Cideng",
      coordinates: [-6.2008, 106.8227],
      elevationMeters: -18,
      kilometerPost: "Chainage 11+450"
    },
    connection: {
      protocol: "MQTT/TLS",
      ipAddress: "172.24.8.42",
      lastSync: "5 detik yang lalu",
      quality: 99,
      packetLossPercent: 0.01,
      firmwareVersion: "v4.1.0-mrt-strulytic"
    },
    uptime: {
      thisMonth: 100.0,
      allTime: 99.98,
      mtbfHours: 8500,
      dataPointsCollected: 3890000
    },
    metrics: {
      metric1: {
        label: "Ovalisasi Cincin Terowongan",
        value: 0.72,
        unit: "mm",
        min: 0.20,
        max: 2.50,
        threshold: { warning: 3.00, critical: 5.00 },
        trend: "→",
        status: "normal",
        sparkline: [0.70, 0.71, 0.71, 0.72, 0.72, 0.72]
      },
      metric2: {
        label: "Kemiringan Radial Dinding",
        value: 0.35,
        unit: "mrad",
        min: 0.10,
        max: 1.20,
        threshold: { warning: 1.50, critical: 2.50 },
        trend: "→",
        status: "normal",
        sparkline: [0.34, 0.34, 0.35, 0.35, 0.35, 0.35]
      },
      metric3: {
        label: "Tekanan Air Pori Subsurface",
        value: 182.5,
        unit: "kPa",
        min: 150.0,
        max: 240.0,
        threshold: { warning: 260.0, critical: 300.0 },
        trend: "→",
        status: "normal",
        sparkline: [181.2, 181.8, 182.1, 182.3, 182.4, 182.5]
      },
      metric4: {
        label: "Suhu Udara Terowongan Bawah Tanah",
        value: 26.2,
        unit: "°C",
        min: 24.0,
        max: 30.0,
        threshold: { warning: 32.0, critical: 35.0 },
        trend: "→",
        status: "normal",
        sparkline: [25.8, 25.9, 26.0, 26.1, 26.2, 26.2]
      }
    },
    trends24h: {
      timestamps: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      metric1: [0.65, 0.65, 0.65, 0.65, 0.66, 0.70, 0.74, 0.75, 0.72, 0.72, 0.73, 0.74, 0.73, 0.72, 0.73, 0.74, 0.75, 0.73, 0.72, 0.70, 0.68, 0.66, 0.65, 0.65],
      metric2: [0.32, 0.32, 0.32, 0.32, 0.33, 0.34, 0.36, 0.36, 0.35, 0.35, 0.35, 0.36, 0.35, 0.35, 0.35, 0.36, 0.36, 0.35, 0.35, 0.34, 0.33, 0.33, 0.32, 0.32],
      metric3: [180.5, 180.8, 181.0, 181.2, 181.5, 181.9, 182.2, 182.5, 182.4, 182.3, 182.5, 182.6, 182.5, 182.4, 182.5, 182.7, 182.6, 182.5, 182.5, 182.3, 181.9, 181.5, 181.0, 180.8],
      metric4: [25.4, 25.3, 25.2, 25.2, 25.4, 25.8, 26.4, 26.8, 26.6, 26.4, 26.5, 26.7, 26.5, 26.3, 26.4, 26.7, 26.9, 26.6, 26.2, 25.9, 25.7, 25.5, 25.4, 25.4]
    },
    visualization3d: {
      type: "tunnel_lining",
      geometry: "tunnel_ring",
      statusColor: "#22C55E",
      rotationSpeed: 0.7,
      accentColor: "#0F4A8C"
    },
    eventLog: [
      {
        id: "EVT-4401",
        timestamp: "2026-09-23 19:30:00",
        type: "STATUS",
        severity: "info",
        message: "Integritas cincin terowongan MRT TU-01 memenuhi standar keselamatan perkeretaapian EN 1990."
      }
    ],
    alerts: [],
    lastUpdate: "Baru saja"
  },
  {
    id: "DEV-JCR-01",
    name: "Strulytic STR-D02: Cirahong Lower Road Deck Joint",
    code: "JCR-STR-01",
    type: "strain_gauge",
    typeLabel: "Double-Deck Combined Rail/Vehicle Joint Strain Monitor",
    status: "warning",
    statusColor: "#F59E0B",
    groupId: "GRP-004",
    groupName: "Jembatan Cirahong Heritage Double-Deck (BH 1290)",
    location: {
      name: "Jembatan Cirahong Heritage 1893",
      corridor: "Lintas Kroya - Ciamis - Tasikmalaya",
      subLocation: "Sambungan Gelagar Kisi Bawah (Sisi Manonjaya)",
      coordinates: [-7.3486, 108.2618],
      elevationMeters: 290,
      kilometerPost: "Km 283+500"
    },
    connection: {
      protocol: "MQTT/TLS",
      ipAddress: "10.42.34.12",
      lastSync: "45 detik yang lalu",
      quality: 88,
      packetLossPercent: 0.5,
      firmwareVersion: "v3.4.2-strulytic-kai"
    },
    uptime: {
      thisMonth: 99.40,
      allTime: 99.20,
      mtbfHours: 3600,
      dataPointsCollected: 1205000
    },
    metrics: {
      metric1: {
        label: "Regangan Baja Dek Bawah",
        value: 442.8,
        unit: "µε",
        min: 150.0,
        max: 650.0,
        threshold: { warning: 500.0, critical: 620.0 },
        trend: "↑",
        status: "warning",
        sparkline: [410.2, 418.5, 426.0, 435.4, 440.1, 442.8]
      },
      metric2: {
        label: "Frekuensi Siklus Beban Fatik",
        value: 1840,
        unit: "siklus/hari",
        min: 800,
        max: 2500,
        threshold: { warning: 2000, critical: 2400 },
        trend: "↑",
        status: "normal",
        sparkline: [1620, 1680, 1720, 1790, 1820, 1840]
      },
      metric3: {
        label: "Deformasi Vertikal Mid-Span",
        value: 12.8,
        unit: "mm",
        min: 4.0,
        max: 18.0,
        threshold: { warning: 15.0, critical: 20.0 },
        trend: "→",
        status: "normal",
        sparkline: [11.5, 11.9, 12.2, 12.5, 12.7, 12.8]
      },
      metric4: {
        label: "Suhu Lingkungan Lembah Citanduy",
        value: 29.1,
        unit: "°C",
        min: 22.0,
        max: 36.0,
        threshold: { warning: 40.0, critical: 45.0 },
        trend: "→",
        status: "normal",
        sparkline: [27.5, 28.0, 28.4, 28.8, 29.0, 29.1]
      }
    },
    trends24h: {
      timestamps: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      metric1: [240, 230, 225, 240, 280, 360, 480, 510, 430, 420, 440, 505, 495, 430, 445, 515, 530, 485, 442.8, 410, 360, 310, 270, 250],
      metric2: [30, 20, 15, 25, 60, 110, 150, 160, 120, 115, 125, 155, 150, 120, 130, 165, 170, 150, 135, 110, 80, 50, 40, 35],
      metric3: [6.2, 6.0, 5.8, 6.1, 7.5, 9.8, 13.5, 14.2, 11.8, 11.5, 12.1, 14.0, 13.6, 11.9, 12.4, 14.4, 14.8, 13.5, 12.8, 11.2, 9.5, 8.0, 7.0, 6.5],
      metric4: [23.1, 22.8, 22.5, 22.4, 22.8, 24.2, 26.5, 28.9, 31.0, 33.2, 34.5, 35.1, 34.8, 33.5, 31.8, 30.2, 29.1, 28.0, 27.2, 26.1, 25.2, 24.5, 23.8, 23.4]
    },
    visualization3d: {
      type: "truss_joint",
      geometry: "truss_node",
      statusColor: "#F59E0B",
      rotationSpeed: 0.75,
      accentColor: "#F59E0B"
    },
    eventLog: [
      {
        id: "EVT-3301",
        timestamp: "2026-09-23 17:45:00",
        type: "ALERT",
        severity: "warning",
        message: "Kombinasi lintasan KA Lodaya & kendaraan darat di dek bawah memicu lonjakan regangan 442.8 µε."
      }
    ],
    alerts: [
      {
        id: "ALR-805",
        deviceId: "DEV-JCR-01",
        deviceName: "Strulytic STR-D02: Cirahong Lower Road Deck Joint",
        groupId: "GRP-004",
        groupName: "Jembatan Cirahong Heritage (BH 1290)",
        severity: "warning",
        type: "double_deck_combined_fatigue",
        message: "Akumulasi siklus tegangan lentur mendekati batas fatik bulanan pada konstruksi gelagar 1893.",
        timestamp: "2026-09-23 17:45:00",
        acknowledged: false
      }
    ],
    lastUpdate: "45 detik yang lalu"
  },
  {
    id: "DEV-LRT-01",
    name: "Strulytic FBG-K08: LRT Curved Longspan Pier 12",
    code: "LRT-FBG-01",
    type: "strain_gauge",
    typeLabel: "Fiber Bragg Grating (FBG) Optical Box Girder Strain System",
    status: "online",
    statusColor: "#22C55E",
    groupId: "GRP-005",
    groupName: "LRT Jabodebek Longspan Dukuh Atas (Km 0+450)",
    location: {
      name: "Longspan Kuningan - Dukuh Atas Lintas 2",
      corridor: "Koridor LRT Cawang - Dukuh Atas",
      subLocation: "Tengah Bentang Radius 115m (Pier P12-P13)",
      coordinates: [-6.2088, 106.8285],
      elevationMeters: 28,
      kilometerPost: "Km 0+450"
    },
    connection: {
      protocol: "MQTT/TLS",
      ipAddress: "10.42.50.88",
      lastSync: "10 detik yang lalu",
      quality: 98,
      packetLossPercent: 0.02,
      firmwareVersion: "v4.2.0-strulytic-fbg"
    },
    uptime: {
      thisMonth: 100.0,
      allTime: 99.96,
      mtbfHours: 7200,
      dataPointsCollected: 2900000
    },
    metrics: {
      metric1: {
        label: "Regangan Tarik Optik Box Girder",
        value: 210.5,
        unit: "µε",
        min: 80.0,
        max: 420.0,
        threshold: { warning: 480.0, critical: 600.0 },
        trend: "→",
        status: "normal",
        sparkline: [205.2, 207.1, 208.5, 209.8, 210.2, 210.5]
      },
      metric2: {
        label: "Defleksi Titik Tengah Bentang",
        value: 8.4,
        unit: "mm",
        min: 2.0,
        max: 22.0,
        threshold: { warning: 25.0, critical: 32.0 },
        trend: "→",
        status: "normal",
        sparkline: [8.1, 8.2, 8.2, 8.3, 8.4, 8.4]
      },
      metric3: {
        label: "Gradien Suhu Top/Bottom Slab",
        value: 4.8,
        unit: "°C",
        min: 1.0,
        max: 8.5,
        threshold: { warning: 10.0, critical: 14.0 },
        trend: "↓",
        status: "normal",
        sparkline: [6.2, 5.8, 5.4, 5.1, 4.9, 4.8]
      },
      metric4: {
        label: "Rotasi Torsional Penampang",
        value: 0.12,
        unit: "mrad",
        min: 0.02,
        max: 0.50,
        threshold: { warning: 0.65, critical: 0.90 },
        trend: "→",
        status: "normal",
        sparkline: [0.11, 0.11, 0.12, 0.12, 0.12, 0.12]
      }
    },
    trends24h: {
      timestamps: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      metric1: [120, 115, 110, 112, 130, 185, 260, 275, 210, 208, 215, 265, 255, 212, 220, 270, 280, 250, 210.5, 195, 170, 150, 135, 125],
      metric2: [3.5, 3.4, 3.3, 3.4, 4.5, 6.8, 11.2, 11.8, 8.4, 8.2, 8.6, 11.5, 11.0, 8.5, 8.8, 11.8, 12.2, 10.5, 8.4, 7.2, 5.8, 4.8, 4.0, 3.6],
      metric3: [1.8, 1.6, 1.4, 1.4, 2.0, 3.5, 6.2, 7.8, 8.2, 8.4, 8.1, 7.5, 6.8, 6.2, 5.8, 5.4, 5.0, 4.8, 4.8, 4.2, 3.5, 2.8, 2.2, 1.9],
      metric4: [0.04, 0.03, 0.03, 0.04, 0.06, 0.09, 0.16, 0.18, 0.12, 0.12, 0.13, 0.17, 0.16, 0.12, 0.13, 0.17, 0.19, 0.15, 0.12, 0.10, 0.08, 0.06, 0.05, 0.04]
    },
    visualization3d: {
      type: "rail_fastener",
      geometry: "rail_profile",
      statusColor: "#22C55E",
      rotationSpeed: 0.6,
      accentColor: "#0F4A8C"
    },
    eventLog: [
      {
        id: "EVT-2201",
        timestamp: "2026-09-23 18:00:00",
        type: "STATUS",
        severity: "info",
        message: "FBG Interrogator Unit optik beroperasi pada panjang gelombang 1550 nm secara stabil."
      }
    ],
    alerts: [],
    lastUpdate: "10 detik yang lalu"
  }
];

export const INITIAL_PREDICTIVE_RISKS: PredictiveRiskItem[] = [
  {
    deviceId: "DEV-TSK-02",
    deviceName: "Strulytic AE-C03 (Sasaksaat Km 143+240)",
    groupName: "Terowongan Sasaksaat Tua (BH 503 - Daop 2)",
    riskScore: 8.8,
    riskLevel: "critical",
    predictedIssue: "Perambatan retakan mikro batuan dinding busur terowongan akibat tekanan rembasan air pasca hujan lebat",
    failureProbabilityPercent: 88.5,
    estimatedTimeToThreshold: "14 hari tanpa injeksi grouting semen",
    anomalyDetected: true,
    affectedComponent: "Pasangan Batu Bata Merah Kolonial Cincin 240 & Batuan Andesit Lapuk",
    recommendedAction: "Jadwalkan injeksi polyurethane grouting darurat dan pembatasan kecepatan KA (Vmax 30 km/jam) di petak Km 143+200 s/d Km 143+300.",
    confidenceScore: 94.8
  },
  {
    deviceId: "DEV-TSK-01",
    deviceName: "Strulytic CONV-M08 (Sasaksaat Km 143+180)",
    groupName: "Terowongan Sasaksaat Tua (BH 503 - Daop 2)",
    riskScore: 7.4,
    riskLevel: "high",
    predictedIssue: "Konvergensi radial dinding melebihi ambang batas toleransi akibat tekanan lateral tanah lempung",
    failureProbabilityPercent: 74.2,
    estimatedTimeToThreshold: "28 hari",
    anomalyDetected: true,
    affectedComponent: "Dinding Busur Bata Kolonial Sisi Barat Daya",
    recommendedAction: "Pemasangan rock-bolt tambahan dan perbaikan sistem drainase samping terowongan tua.",
    confidenceScore: 91.2
  },
  {
    deviceId: "DEV-JCR-01",
    deviceName: "Strulytic STR-D02 (Jembatan Cirahong)",
    groupName: "Jembatan Cirahong Heritage Double-Deck (BH 1290)",
    riskScore: 6.9,
    riskLevel: "medium",
    predictedIssue: "Akumulasi kelelahan fatik sambungan paku keling baja peninggalan 1893 pada kombinasi beban rel dan jalan raya",
    failureProbabilityPercent: 62.0,
    estimatedTimeToThreshold: "45 hari",
    anomalyDetected: true,
    affectedComponent: "Plat Buhul Sambungan Batang Diagonal Truss Bentang 2",
    recommendedAction: "Uji Ultrasonic Non-Destructive Testing (NDT) pada paku keling pilar Manonjaya dan batasi beban gandar jalan raya maksimal 2 ton.",
    confidenceScore: 89.5
  },
  {
    deviceId: "DEV-JKB-01",
    deviceName: "Strulytic SHM-G14 (Jembatan Cikubang)",
    groupName: "Jembatan Cikubang (BH 513 - Daop 2)",
    riskScore: 3.2,
    riskLevel: "low",
    predictedIssue: "Fluktuasi regangan termal ekspansi bantalan bearing akibat terik matahari siang",
    failureProbabilityPercent: 18.4,
    estimatedTimeToThreshold: "> 180 hari",
    anomalyDetected: false,
    affectedComponent: "Rocker Bearing Gelagar Baja Pilar 4",
    recommendedAction: "Pelumasan rutin pelat geser rocker bearing pada jadwal perawatan bulanan Daop 2.",
    confidenceScore: 96.0
  }
];

export const INITIAL_SYSTEM_STATS: SystemStats = {
  totalDevices: 1248,
  onlineDevices: 1215,
  offlineDevices: 18,
  warningDevices: 15,
  alertsTotal: 12,
  criticalAlerts: 3,
  warningAlerts: 9,
  uptimePercent: 99.87,
  cpuUsage: 45,
  memoryUsage: 62,
  bandwidthUsage: 78,
  mqttThroughputEventsSec: 2450,
  lastSyncTime: "Baru saja (Real-time)"
};
