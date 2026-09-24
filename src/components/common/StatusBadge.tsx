import React from 'react';
import { DeviceStatus, AlertSeverity } from '../../types/iot';

interface StatusBadgeProps {
  status: DeviceStatus | AlertSeverity | 'online' | 'warning' | 'critical' | 'offline' | 'info';
  size?: 'sm' | 'md';
  showDotOnly?: boolean;
  className?: string;
  customLabel?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDotOnly = false,
  className = '',
  customLabel
}) => {
  let dotColor = 'bg-[#22C55E]';
  let textColor = 'text-[#16A34A]';
  let defaultLabel = 'Online';

  switch (status) {
    case 'online':
      dotColor = 'bg-[#22C55E]';
      textColor = 'text-[#15803D]';
      defaultLabel = 'Normal / Online';
      break;
    case 'warning':
      dotColor = 'bg-[#F59E0B]';
      textColor = 'text-[#B45309]';
      defaultLabel = 'Warning / Waspada';
      break;
    case 'critical':
      dotColor = 'bg-[#EF4444] animate-pulse';
      textColor = 'text-[#B91C1C] font-semibold';
      defaultLabel = 'Kritikal / Bahaya';
      break;
    case 'offline':
      dotColor = 'bg-[#94A3B8]';
      textColor = 'text-[#64748B]';
      defaultLabel = 'Offline / Terputus';
      break;
    case 'info':
      dotColor = 'bg-[#0F4A8C]';
      textColor = 'text-[#0F4A8C]';
      defaultLabel = 'Informasi';
      break;
  }

  const label = customLabel || defaultLabel;

  if (showDotOnly) {
    return (
      <span
        title={label}
        className={`inline-block rounded-full ${dotColor} ${size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'} ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${size === 'sm' ? 'text-xs' : 'text-xs'} ${textColor} ${className}`}>
      <span className={`rounded-full ${dotColor} ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'} shrink-0`} />
      <span className="tabular-nums whitespace-nowrap">{label}</span>
    </span>
  );
};
