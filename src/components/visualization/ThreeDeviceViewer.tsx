import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, RefreshCw, Eye, Flame, Layers } from 'lucide-react';
import { DeviceItem } from '../../types/iot';

interface ThreeDeviceViewerProps {
  device: DeviceItem;
  className?: string;
  onViewDetails?: () => void;
}

export const ThreeDeviceViewer: React.FC<ThreeDeviceViewerProps> = ({
  device,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [viewMode2D, setViewMode2D] = useState<boolean>(false);
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mainMeshGroupRef = useRef<THREE.Group | null>(null);
  const statusLedRef = useRef<THREE.Mesh | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    try {
      // 1. Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xF0F4F8); // PRD light background
      scene.fog = new THREE.FogExp2(0xF0F4F8, 0.035);
      sceneRef.current = scene;

      // 2. Camera
      const width = containerRef.current.clientWidth || 600;
      const height = containerRef.current.clientHeight || 420;
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 4, 11);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // 3. Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      // 4. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(6, 12, 8);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const rimLight = new THREE.DirectionalLight(0x00A896, 0.6);
      rimLight.position.set(-8, -4, -6);
      scene.add(rimLight);

      // 5. Grid Ground Base (Civil Engineering Floor)
      const gridHelper = new THREE.GridHelper(16, 16, 0xCBD5E1, 0xE2E8F0);
      gridHelper.position.y = -2.5;
      scene.add(gridHelper);

      // 6. Build High-Fidelity Infrastructure Structural Model
      const group = new THREE.Group();
      mainMeshGroupRef.current = group;
      scene.add(group);

      const statusColorHex = 
        device.status === 'critical' ? 0xEF4444 :
        device.status === 'warning' ? 0xF59E0B : 0x22C55E;

      if (device.visualization3d.type === 'truss_joint') {
        // --- JEMBATAN BAJA HISTORIK (STEEL TRUSS BRIDGE JOINT) ---
        // Main Horizontal I-Beam
        const mainBeamGeo = new THREE.BoxGeometry(7, 0.9, 1.2);
        const steelMat = new THREE.MeshStandardMaterial({
          color: 0x334155,
          metalness: 0.7,
          roughness: 0.35,
          wireframe: showWireframe
        });
        const mainBeam = new THREE.Mesh(mainBeamGeo, steelMat);
        mainBeam.castShadow = true;
        group.add(mainBeam);

        // Diagonal Truss Member
        const diagBeamGeo = new THREE.BoxGeometry(5.5, 0.7, 0.9);
        const diagBeam = new THREE.Mesh(diagBeamGeo, steelMat);
        diagBeam.rotation.z = Math.PI / 4;
        diagBeam.position.set(0.8, 1.4, 0);
        group.add(diagBeam);

        // Gusset Plate (Pelat Buhul Sambungan Paku Keling)
        const gussetGeo = new THREE.BoxGeometry(2.4, 2.4, 1.4);
        const gussetMat = new THREE.MeshStandardMaterial({
          color: 0x1E293B,
          metalness: 0.8,
          roughness: 0.3
        });
        const gusset = new THREE.Mesh(gussetGeo, gussetMat);
        group.add(gusset);

        // Rivets (Paku Keling 1893/1906 Heritage pattern)
        for (let i = -0.8; i <= 0.8; i += 0.4) {
          for (let j = -0.8; j <= 0.8; j += 0.4) {
            const rivetGeo = new THREE.SphereGeometry(0.08, 12, 12);
            const rivetMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.9 });
            const rivetFront = new THREE.Mesh(rivetGeo, rivetMat);
            rivetFront.position.set(i, j, 0.72);
            group.add(rivetFront);
            const rivetBack = rivetFront.clone();
            rivetBack.position.z = -0.72;
            group.add(rivetBack);
          }
        }

        // Strulytic AIoT Enclosure Box (SHM Sensor Unit mounted on gusset plate)
        const sensorGeo = new THREE.BoxGeometry(0.9, 1.1, 0.5);
        const sensorMat = new THREE.MeshStandardMaterial({
          color: 0x0F4A8C, // Strulytic Primary
          metalness: 0.4,
          roughness: 0.2
        });
        const sensorBox = new THREE.Mesh(sensorGeo, sensorMat);
        sensorBox.position.set(0, 0.3, 0.95);
        group.add(sensorBox);

        // Optical Fiber / Strain Gauge Ribbon attached across joint
        const strainRibbonGeo = new THREE.BoxGeometry(2.0, 0.08, 0.05);
        const strainMat = new THREE.MeshStandardMaterial({
          color: showHeatmap ? 0xF59E0B : 0x00A896,
          emissive: showHeatmap ? 0xF59E0B : 0x00A896,
          emissiveIntensity: 0.5
        });
        const strainRibbon = new THREE.Mesh(strainRibbonGeo, strainMat);
        strainRibbon.position.set(0, -0.6, 0.74);
        group.add(strainRibbon);

      } else {
        // --- TEROWONGAN BAWAH TANAH / TUA (TUNNEL MASONRY & SHIELD SEGMENT) ---
        // Arched Curved Tunnel Ring
        const ringGeo = new THREE.TorusGeometry(3.2, 0.65, 20, 48, Math.PI);
        const tunnelMat = new THREE.MeshStandardMaterial({
          color: device.id.includes('MRT') ? 0x475569 : 0x78350F, // Concrete or Heritage Brick
          roughness: 0.85,
          metalness: 0.1,
          wireframe: showWireframe
        });
        const tunnelRing = new THREE.Mesh(ringGeo, tunnelMat);
        tunnelRing.rotation.z = Math.PI;
        tunnelRing.position.y = 1.0;
        group.add(tunnelRing);

        // Railway Track Base inside Tunnel
        const trackBaseGeo = new THREE.BoxGeometry(4.5, 0.3, 3.5);
        const trackMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
        const trackBase = new THREE.Mesh(trackBaseGeo, trackMat);
        trackBase.position.y = -2.1;
        group.add(trackBase);

        // Two steel rails
        for (const rx of [-1.1, 1.1]) {
          const railGeo = new THREE.BoxGeometry(0.12, 0.2, 3.5);
          const railMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.9, roughness: 0.2 });
          const rail = new THREE.Mesh(railGeo, railMat);
          rail.position.set(rx, -1.88, 0);
          group.add(rail);
        }

        // Strulytic Laser/Acoustic SHM Sensor mounted on crown wall
        const sensorGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.7, 24);
        const sensorMat = new THREE.MeshStandardMaterial({
          color: 0x0F4A8C,
          metalness: 0.5,
          roughness: 0.2
        });
        const sensorUnit = new THREE.Mesh(sensorGeo, sensorMat);
        sensorUnit.position.set(1.6, 1.4, 0.4);
        sensorUnit.rotation.z = -Math.PI / 4;
        group.add(sensorUnit);

        // Laser convergence beam projecting across arch
        const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 3.2);
        const beamMat = new THREE.MeshBasicMaterial({
          color: 0xEF4444,
          transparent: true,
          opacity: 0.7
        });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.set(0, 0.2, 0.4);
        beam.rotation.z = Math.PI / 2.8;
        group.add(beam);
      }

      // Status Indicator LED Beacon (Pulsing Sphere)
      const ledGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const ledMat = new THREE.MeshStandardMaterial({
        color: statusColorHex,
        emissive: statusColorHex,
        emissiveIntensity: 0.9
      });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0, 1.1, 1.25);
      group.add(led);
      statusLedRef.current = led;

      // 7. Animation Loop
      let animationFrameId: number;
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        if (mainMeshGroupRef.current) {
          if (autoRotate && !isDraggingRef.current) {
            mainMeshGroupRef.current.rotation.y += 0.008;
          }

          // Subtle dynamic vibration emulation if triaxial accelerometer or train pass
          if (device.type === 'triaxial_accelerometer' || device.metrics.metric1.value > 400) {
            const vibOffset = Math.sin(elapsedTime * 25) * 0.015;
            mainMeshGroupRef.current.position.y = vibOffset;
          }
        }

        // Pulse Status LED
        if (statusLedRef.current) {
          const pulse = (Math.sin(elapsedTime * 4) + 1) / 2;
          (statusLedRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + pulse * 0.8;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Handle Resize
      const handleResize = () => {
        if (!containerRef.current || !renderer || !camera) return;
        const newW = containerRef.current.clientWidth;
        const newH = containerRef.current.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    } catch (err) {
      console.warn("WebGL initialization note:", err);
      setWebglSupported(false);
    }
  }, [device, autoRotate, showWireframe, showHeatmap]);

  // Mouse drag orbit interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !mainMeshGroupRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    mainMeshGroupRef.current.rotation.y += deltaX * 0.008;
    mainMeshGroupRef.current.rotation.x += deltaY * 0.008;

    // Clamp vertical tilt
    mainMeshGroupRef.current.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, mainMeshGroupRef.current.rotation.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    e.preventDefault();
    const newZ = cameraRef.current.position.z + e.deltaY * 0.01;
    cameraRef.current.position.z = Math.max(4, Math.min(18, newZ));
  };

  const handleDoubleClick = () => {
    // Reset view
    if (mainMeshGroupRef.current && cameraRef.current) {
      mainMeshGroupRef.current.rotation.set(0, 0, 0);
      mainMeshGroupRef.current.position.set(0, 0, 0);
      cameraRef.current.position.set(0, 4, 11);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] bg-[#F0F4F8] rounded-[12px] border border-[#E2E8F0] overflow-hidden flex flex-col ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
    >
      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="bg-white/90 backdrop-blur-xs border border-[#CBD5E1] px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: device.statusColor }} />
          <span className="text-xs font-semibold text-[#0F172A] tracking-tight">
            {device.visualization3d.type === 'truss_joint'
              ? 'Model 3D: Sambungan Gelagar Baja Jembatan'
              : 'Model 3D: Penampang Cincin Terowongan KAI/MRT'}
          </span>
          <span className="text-[11px] text-[#64748B] border-l border-[#CBD5E1] pl-2">
            Zoom & Drag Orbit
          </span>
        </div>

        {/* Live metric badge overlay */}
        <div className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-[#CBD5E1] px-2.5 py-1 rounded-lg text-xs font-mono text-[#0F172A]">
          <span className="text-[#64748B]">{device.metrics.metric1.label.slice(0, 14)}:</span>
          <span className="font-semibold text-[#0F4A8C]">{device.metrics.metric1.value} {device.metrics.metric1.unit}</span>
        </div>
      </div>

      {/* 2D Fallback / Diagram View */}
      {viewMode2D || !webglSupported ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
          <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs text-center">
            <div className="w-12 h-12 rounded-full bg-[#0F4A8C]/10 text-[#0F4A8C] flex items-center justify-center mx-auto mb-3">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-[#0F172A]">
              Diagram Teknis Struktur 2D - {device.code}
            </h4>
            <p className="text-xs text-[#475569] mt-1 mb-4">
              Lokasi: {device.location.name} ({device.location.kilometerPost})
            </p>
            
            {/* SVG Engineering Cross Section */}
            <div className="bg-[#F1F5F9] p-4 rounded-lg border border-[#E2E8F0] flex justify-center">
              <svg width="280" height="120" viewBox="0 0 280 120" className="overflow-visible">
                {/* Horizontal girder */}
                <rect x="20" y="50" width="240" height="24" fill="#334155" rx="2" />
                {/* Diagonal tie */}
                <line x1="60" y1="50" x2="140" y2="10" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                <line x1="220" y1="50" x2="140" y2="10" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                {/* Sensor placement */}
                <circle cx="140" cy="50" r="10" fill={device.statusColor} stroke="#FFFFFF" strokeWidth="2" />
                <text x="140" y="95" textAnchor="middle" fontSize="11" fill="#0F172A" fontWeight="600">
                  Strulytic Sensor Node
                </text>
                <text x="140" y="110" textAnchor="middle" fontSize="9" fill="#64748B">
                  Koneksi: {device.connection.protocol}
                </text>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="flex-1 w-full h-full cursor-grab active:cursor-grabbing block"
        />
      )}

      {/* Bottom HUD Controls (PRD Specs) */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-[#CBD5E1] p-1 rounded-lg shadow-xs">
          {/* Auto-rotate */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              autoRotate ? 'bg-[#0F4A8C] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
            title="Nyalakan/matikan rotasi otomatis"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Auto-Putar</span>
          </button>

          {/* Reset View */}
          <button
            onClick={handleDoubleClick}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#475569] hover:bg-[#F1F5F9] rounded-md transition-colors"
            title="Reset sudut kamera (atau double-click)"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Posisi</span>
          </button>

          {/* 2D / 3D Toggle */}
          <button
            onClick={() => setViewMode2D(!viewMode2D)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode2D ? 'bg-[#00A896] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
            title="Beralih antara visualisasi 3D dan diagram 2D"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{viewMode2D ? 'Mode 3D' : 'Mode 2D'}</span>
          </button>

          {/* Heatmap Gradient Overlay Toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              showHeatmap ? 'bg-[#F59E0B] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
            title="Tampilkan gradien suhu & regangan termal"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gradien Regangan</span>
          </button>

          {/* Wireframe */}
          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              showWireframe ? 'bg-slate-700 text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
            title="Tampilkan mesh wireframe"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Wireframe</span>
          </button>
        </div>

        {/* Tip */}
        <div className="hidden lg:block bg-white/80 backdrop-blur-xs border border-[#CBD5E1] px-2.5 py-1 rounded-md text-[11px] text-[#64748B]">
          Drag untuk putar 360° · Scroll untuk zoom
        </div>
      </div>
    </div>
  );
};
