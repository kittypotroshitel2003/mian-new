'use client';

import { useEffect, useRef, useState } from "react";

interface ObjectLocationMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export default function ObjectLocationMap({ lat, lng, name, address }: ObjectLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #363E62, #232840);
            width: 44px;
            height: 44px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 16px rgba(0,102,255,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="transform: rotate(45deg); color: white;">
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'>
                <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/>
                <polyline points='9 22 9 12 15 12 15 22'/>
              </svg>
            </div>
          </div>
        `,
        className: "",
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -48],
      });

      L.marker([lat, lng], { icon }).addTo(map);

      mapInstanceRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full rounded-3xl overflow-hidden"
        style={{ height: "420px", zIndex: 1 }}
      />

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 z-[1000]">
        <p className="text-sm font-bold text-[#363E62]">{name}</p>
        <p className="text-xs text-gray-500">{address}</p>
      </div>

      {!mapReady && (
        <div className="absolute inset-0 bg-gray-100 rounded-3xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#363E62] border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-500 text-sm">Загрузка карты...</span>
          </div>
        </div>
      )}
    </div>
  );
}
