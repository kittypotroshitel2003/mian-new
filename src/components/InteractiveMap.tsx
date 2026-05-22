'use client';

import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Complex {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  price: string;
  status: string;
  objectId: number;
}

const complexes: Complex[] = [
  {
    id: 1,
    name: "ЖК Северный",
    lat: 55.845,
    lng: 37.44,
    address: "Северный административный округ",
    price: "от 5 500 000 ₽",
    status: "Строится",
    objectId: 1,
  },
  {
    id: 2,
    name: "ЖК Южный Парк",
    lat: 55.641,
    lng: 37.553,
    address: "Юго-Западный административный округ",
    price: "от 6 200 000 ₽",
    status: "Старт продаж",
    objectId: 2,
  },
  {
    id: 3,
    name: "ЖК Восточный Берег",
    lat: 55.769,
    lng: 37.814,
    address: "Восточный административный округ",
    price: "от 4 800 000 ₽",
    status: "Строится",
    objectId: 3,
  },
];

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [selected, setSelected] = useState<Complex | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // CSS already imported via index.css

      if (!mapRef.current || mapInstanceRef.current) return;

      // Create the map
      const map = L.map(mapRef.current, {
        center: [55.751244, 37.618423],
        zoom: 10,
        zoomControl: true,
        attributionControl: false,
      });

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Custom ЖК icon using DivIcon
      const createIcon = () =>
        L.divIcon({
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

      // Add markers
      complexes.forEach((complex) => {
        const marker = L.marker([complex.lat, complex.lng], {
          icon: createIcon(),
        }).addTo(map);

        marker.on("click", () => {
          setSelected(complex);
          map.panTo([complex.lat, complex.lng], { animate: true });
        });
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Map container - no border, full rounded */}
      <div
        ref={mapRef}
        className="w-full rounded-3xl overflow-hidden"
        style={{ height: "520px", zIndex: 1 }}
      />

      {/* Info panel overlay */}
      {selected && (
        <div
          className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white rounded-2xl shadow-2xl p-6 z-[1000] animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#363E62] to-[#232840] rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#363E62]">{selected.name}</h3>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  selected.status === "Строится"
                    ? "bg-[#363E62]/15 text-[#363E62]"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {selected.status}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-3">{selected.address}</p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="font-bold text-[#363E62]">{selected.price}</span>
            <Link
              href={`/objects/${selected.objectId}`}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#363E62] to-[#232840] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Подробнее
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 z-[1000] flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#363E62] to-[#232840]" />
        <span className="text-sm font-medium text-gray-700">Жилые комплексы МИАН</span>
      </div>

      {/* Loading */}
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