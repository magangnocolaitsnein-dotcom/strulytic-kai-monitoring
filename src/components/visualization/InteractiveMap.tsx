import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DeviceItem, DeviceGroup } from '../../types/iot';
import { useIot } from '../../context/IotContext';

interface InteractiveMapProps {
  devices?: DeviceItem[];
  groups?: DeviceGroup[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  selectedId?: string;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  devices,
  groups,
  center = [-6.8408, 107.4722], // West Java KAI Corridor Default
  zoom = 9,
  height = "380px",
  selectedId,
  className = ""
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { navigateTo } = useIot();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create map instance
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        attributionControl: false
      });

      // Light theme tile layer (CartoDB Positron for clean industrial look)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(center, zoom);
    }

    const map = mapInstanceRef.current;

    // Remove existing markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Custom Icon Generator
    const createMarkerIcon = (color: string, label: string, isSelected: boolean) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="
              width: ${isSelected ? '24px' : '18px'};
              height: ${isSelected ? '24px' : '18px'};
              border-radius: 50%;
              background-color: ${color};
              border: 3px solid #FFFFFF;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="width: 6px; height: 6px; border-radius: 50%; background: #FFFFFF;"></div>
            </div>
            <div style="
              position: absolute;
              bottom: -18px;
              white-space: nowrap;
              background: #FFFFFF;
              border: 1px solid #E2E8F0;
              padding: 1px 5px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: 600;
              color: #0F172A;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            ">
              ${label}
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
    };

    // Plot Devices
    if (devices && devices.length > 0) {
      devices.forEach(dev => {
        const color = dev.status === 'critical' ? '#EF4444' : dev.status === 'warning' ? '#F59E0B' : '#22C55E';
        const isSelected = selectedId === dev.id;
        const marker = L.marker(dev.location.coordinates, {
          icon: createMarkerIcon(color, dev.code, isSelected)
        }).addTo(map);

        const popupContent = document.createElement('div');
        popupContent.className = 'p-1 text-xs';
        popupContent.innerHTML = `
          <div style="font-weight: 700; color: #0F4A8C; font-size: 13px;">${dev.name}</div>
          <div style="color: #475569; margin-top: 2px;">${dev.location.name} (${dev.location.kilometerPost})</div>
          <div style="margin-top: 6px; padding: 4px; background: #F8FAFC; border-radius: 4px; border: 1px solid #E2E8F0;">
            <div><strong>Status:</strong> <span style="color: ${color}; text-transform: capitalize;">${dev.status}</span></div>
            <div><strong>${dev.metrics.metric1.label}:</strong> ${dev.metrics.metric1.value} ${dev.metrics.metric1.unit}</div>
            <div><strong>Uptime:</strong> ${dev.uptime.thisMonth}%</div>
          </div>
          <button id="btn-inspect-${dev.id}" style="
            margin-top: 8px;
            width: 100%;
            padding: 5px 8px;
            background: #0F4A8C;
            color: #FFFFFF;
            border: none;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">
            Buka Detail Telemetri →
          </button>
        `;

        marker.bindPopup(popupContent);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-inspect-${dev.id}`);
          if (btn) {
            btn.onclick = () => {
              navigateTo('device-detail', { deviceId: dev.id });
            };
          }
        });
      });
    }

    // Plot Groups
    if (groups && groups.length > 0) {
      groups.forEach(grp => {
        const color = grp.status === 'critical' ? '#EF4444' : grp.status === 'warning' ? '#F59E0B' : '#22C55E';
        const isSelected = selectedId === grp.id;
        const marker = L.marker(grp.coordinates, {
          icon: createMarkerIcon(color, grp.code, isSelected)
        }).addTo(map);

        const popupContent = document.createElement('div');
        popupContent.className = 'p-1 text-xs';
        popupContent.innerHTML = `
          <div style="font-weight: 700; color: #0F4A8C; font-size: 13px;">${grp.name}</div>
          <div style="color: #475569; margin-top: 2px;">${grp.division}</div>
          <div style="margin-top: 6px; padding: 4px; background: #F8FAFC; border-radius: 4px; border: 1px solid #E2E8F0;">
            <div><strong>Sensor Aktif:</strong> ${grp.onlineCount} / ${grp.deviceCount} Unit</div>
            <div><strong>Tahun Konstruksi:</strong> ${grp.yearBuilt} (${grp.structureHeritageGrade})</div>
            <div><strong>Suhu Rata-rata:</strong> ${grp.aggregatedMetrics.avgTemperature}°C</div>
          </div>
          <button id="btn-group-${grp.id}" style="
            margin-top: 8px;
            width: 100%;
            padding: 5px 8px;
            background: #00A896;
            color: #FFFFFF;
            border: none;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">
            Lihat Dasbor Grup →
          </button>
        `;

        marker.bindPopup(popupContent);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-group-${grp.id}`);
          if (btn) {
            btn.onclick = () => {
              navigateTo('device-group', { groupId: grp.id });
            };
          }
        });
      });
    }

    // Invalidate size after layout mounts
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      // Clean up on unmount if needed
    };
  }, [devices, groups, center, zoom, selectedId, navigateTo]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height }}
      className={`w-full rounded-[12px] border border-[#E2E8F0] overflow-hidden shadow-xs relative z-0 ${className}`}
    />
  );
};
