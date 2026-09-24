export type DeviceType = 
  | 'strain_gauge' 
  | 'triaxial_accelerometer' 
  | 'tunnel_convergence' 
  | 'acoustic_crack' 
  | 'gateway_hub';

export type DeviceStatus = 'online' | 'warning' | 'critical' | 'offline';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface MetricDefinition {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  threshold: {
    warning: number;
    critical: number;
  };
  trend: '↑' | '↓' | '→';
  status: 'normal' | 'warning' | 'critical';
  sparkline: number[];
}

export interface DeviceMetrics {
  metric1: MetricDefinition;
  metric2: MetricDefinition;
  metric3: MetricDefinition;
  metric4: MetricDefinition;
}

export interface DeviceLocation {
  name: string;
  corridor: string;
  subLocation: string;
  coordinates: [number, number]; // [lat, lng]
  elevationMeters: number;
  kilometerPost: string;
}

export interface DeviceConnection {
  protocol: 'MQTT/TLS' | 'CoAP' | 'LoRaWAN Industrial' | 'Modbus RTU';
  ipAddress: string;
  lastSync: string;
  quality: number; // 0-100%
  packetLossPercent: number;
  firmwareVersion: string;
}

export interface DeviceUptime {
  thisMonth: number;
  allTime: number;
  mtbfHours: number;
  dataPointsCollected: number;
}

export interface Device3DConfig {
  type: 'truss_joint' | 'tunnel_lining' | 'rail_fastener' | 'gateway_tower';
  geometry: 'cube' | 'truss_node' | 'tunnel_ring' | 'rail_profile';
  statusColor: string;
  rotationSpeed: number;
  accentColor: string;
  highlightCoordinates?: [number, number, number];
}

export interface EventLogItem {
  id: string;
  timestamp: string;
  type: 'ALERT' | 'STATUS' | 'METRIC' | 'CONFIG';
  severity: AlertSeverity;
  message: string;
}

export interface AlertItem {
  id: string;
  deviceId: string;
  deviceName: string;
  groupId?: string;
  groupName?: string;
  severity: AlertSeverity;
  type: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface DeviceConfig {
  general: {
    name: string;
    type: DeviceType;
    location: string;
    description: string;
  };
  monitoring: {
    sampleInterval: number;
    dataRetentionDays: number;
    enabledMetrics: string[];
  };
  thresholds: {
    metric1Warning: number;
    metric1Critical: number;
    metric2Warning: number;
    metric2Critical: number;
  };
  communication: {
    protocol: string;
    endpoint: string;
    retryPolicy: string;
  };
}

export interface DeviceItem {
  id: string;
  name: string;
  code: string;
  type: DeviceType;
  typeLabel: string;
  status: DeviceStatus;
  statusColor: string;
  groupId: string;
  groupName: string;
  location: DeviceLocation;
  connection: DeviceConnection;
  uptime: DeviceUptime;
  metrics: DeviceMetrics;
  trends24h: {
    timestamps: string[];
    metric1: number[];
    metric2: number[];
    metric3: number[];
    metric4: number[];
  };
  visualization3d: Device3DConfig;
  eventLog: EventLogItem[];
  alerts: AlertItem[];
  lastUpdate: string;
  config?: DeviceConfig;
}

export interface DeviceGroup {
  id: string;
  name: string;
  code: string;
  type: 'bridge' | 'tunnel' | 'metro_underground' | 'longspan';
  typeLabel: string;
  operator: 'PT Kereta Api Indonesia (Persero)' | 'PT MRT Jakarta' | 'LRT Jabodebek';
  division: string;
  location: string;
  coordinates: [number, number];
  description: string;
  status: 'online' | 'warning' | 'critical';
  deviceCount: number;
  onlineCount: number;
  offlineCount: number;
  warningCount: number;
  activeAlerts: number;
  criticalAlerts: number;
  lastUpdated: string;
  yearBuilt: number;
  structureHeritageGrade: 'A - Heritage Cagar Budaya' | 'B - Historic Strategic' | 'Modern Transit Asset';
  aggregatedMetrics: {
    avgStrainMicrostrain: number;
    avgVibrationRms: number;
    avgConvergenceMm: number;
    avgTemperature: number;
    onlineRate: number;
    minTemperature?: number;
    maxTemperature?: number;
    avgStressMPa?: number;
  };
  devices: string[]; // device ids
  tags: string[];
}

export interface PredictiveRiskItem {
  id?: string;
  deviceId: string;
  deviceName: string;
  groupName: string;
  riskScore: number; // 0.0 to 10.0
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  predictedIssue: string;
  failureProbabilityPercent: number;
  probability?: number;
  timeline?: string;
  estimatedTimeToThreshold: string;
  anomalyDetected: boolean;
  affectedComponent: string;
  recommendedAction: string;
  confidenceScore: number;
}

export interface SystemStats {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  warningDevices: number;
  alertsTotal: number;
  criticalAlerts: number;
  warningAlerts: number;
  uptimePercent: number;
  cpuUsage: number;
  memoryUsage: number;
  bandwidthUsage: number;
  mqttThroughputEventsSec: number;
  lastSyncTime: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  organization: string;
  department: string;
  role: string;
  joinDate: string;
  licenseNumber: string;
  avatarInitials: string;
  notifications?: {
    criticalAlerts: boolean;
    dailyReport: boolean;
    weeklyReport: boolean;
    maintenance: boolean;
    frequency: string;
  };
}
