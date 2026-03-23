'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, ArrowRight, Home, Layers, Maximize2, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const apartments = [
  {
    id: 1,
    rooms: "Студия",
    area: 28,
    floor: 5,
    totalFloors: 20,
    complex: "ЖК Северный",
    location: "САО",
    price: 4200000,
    image: "https://images.unsplash.com/photo-1652882861012-95f3263cab63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBzdHVkaW8lMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNjI4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Хит",
    badgeColor: "bg-orange-500",
    objectId: 1,
  },
  {
    id: 2,
    rooms: "1-комн.",
    area: 42,
    floor: 12,
    totalFloors: 25,
    complex: "ЖК Южный Парк",
    location: "ЮЗАО",
    price: 6800000,
    image: "https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcyNjE2MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Новинка",
    badgeColor: "bg-[#0066FF]",
    objectId: 2,
  },
  {
    id: 3,
    rooms: "2-комн.",
    area: 65,
    floor: 8,
    totalFloors: 20,
    complex: "ЖК Восточный Берег",
    location: "ВАО",
    price: 9500000,
    image: "https://images.unsplash.com/photo-1661796428175-55423b19409f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwY296eSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3MjYyODQ4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Популярное",
    badgeColor: "bg-emerald-500",
    objectId: 3,
  },
  {
    id: 4,
    rooms: "3-комн.",
    area: 89,
    floor: 15,
    totalFloors: 25,
    complex: "ЖК Северный",
    location: "САО",
    price: 13200000,
    image: "https://images.unsplash.com/photo-1755624222023-621f7718950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc3MjYyODQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Премиум",
    badgeColor: "bg-purple-600",
    objectId: 1,
  },
];

function formatPrice(price: number) {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1).replace(".0", "") + " млн ₽";
  }
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}

export default function PopularApartments() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0066FF] rounded-full mb-4 font-medium shadow-sm"
            >
              <Star className="w-4 h-4" />
              Подборка квартир
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Популярные квартиры
            </motion.h2>
          </div>
          <Link
            href="/objects"
            className="hidden md:inline-flex items-center gap-2 text-[#0066FF] hover:gap-3 transition-all font-semibold group"
          >
            <span>Смотреть все</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apartments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={`/objects/${apt.objectId}`}
                className="group block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <ImageWithFallback
                    src={apt.image}
                    alt={`${apt.rooms}, ${apt.area} м²`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3">
                    <span className={`${apt.badgeColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow`}>
                      {apt.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 font-bold text-lg">{apt.rooms}</span>
                    <span className="text-[#0066FF] font-bold text-lg">{formatPrice(apt.price)}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      {apt.area} м²
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {apt.floor}/{apt.totalFloors} эт.
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Home className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span className="font-medium">{apt.complex}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                      <MapPin className="w-3 h-3" />
                      {apt.location}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/objects"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-4 rounded-2xl font-semibold"
          >
            <span>Смотреть все квартиры</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
