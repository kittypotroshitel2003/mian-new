'use client';

import { MapPin, Calendar, Building2, Maximize2, Layers, ArrowLeft, Home, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PageHeader } from "../PageHeader";

const objectData = {
  1: {
    name: "ЖК Северный",
    location: "САО, ул. Северная, 15",
    status: "Строится",
    completionDate: "4 кв. 2026",
    description:
      "Современный жилой комплекс с развитой инфраструктурой. Рядом метро, школы, детские сады, торговые центры. Закрытая территория с детскими и спортивными площадками.",
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTIxNzg4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "Закрытая территория",
      "Подземный паркинг",
      "Детские площадки",
      "Спортивные площадки",
      "Консьерж-сервис",
      "Видеонаблюдение",
    ],
    apartments: [
      {
        id: 1,
        rooms: "1-комн",
        area: 38,
        floor: 5,
        price: 5500000,
        status: "Свободна",
        layout: "Студия",
      },
      {
        id: 2,
        rooms: "1-комн",
        area: 42,
        floor: 8,
        price: 5900000,
        status: "Свободна",
        layout: "Европланировка",
      },
      {
        id: 3,
        rooms: "2-комн",
        area: 58,
        floor: 10,
        price: 7800000,
        status: "Свободна",
        layout: "Распашонка",
      },
      {
        id: 4,
        rooms: "2-комн",
        area: 65,
        floor: 12,
        price: 8500000,
        status: "Забронирована",
        layout: "Линейная",
      },
      {
        id: 5,
        rooms: "3-комн",
        area: 85,
        floor: 15,
        price: 11200000,
        status: "Свободна",
        layout: "Распашонка",
      },
      {
        id: 6,
        rooms: "3-комн",
        area: 92,
        floor: 16,
        price: 12000000,
        status: "Свободна",
        layout: "Европланировка",
      },
    ],
  },
};

export default function ObjectDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const object = objectData[id as unknown as keyof typeof objectData];

  const [apartmentFilters, setApartmentFilters] = useState({
    rooms: "all",
    areaFrom: "",
    areaTo: "",
    priceFrom: "",
    priceTo: "",
    floorFrom: "",
    floorTo: "",
    status: "all",
  });

  if (!object) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Объект не найден</h2>
          <Link href="/objects" className="text-blue-600 hover:underline">
            Вернуться к списку объектов
          </Link>
        </div>
      </div>
    );
  }

  const filteredApartments = object.apartments.filter((apt) => {
    if (apartmentFilters.rooms !== "all" && apt.rooms !== apartmentFilters.rooms) return false;
    if (apartmentFilters.areaFrom && apt.area < Number(apartmentFilters.areaFrom)) return false;
    if (apartmentFilters.areaTo && apt.area > Number(apartmentFilters.areaTo)) return false;
    if (apartmentFilters.priceFrom && apt.price < Number(apartmentFilters.priceFrom)) return false;
    if (apartmentFilters.priceTo && apt.price > Number(apartmentFilters.priceTo)) return false;
    if (apartmentFilters.floorFrom && apt.floor < Number(apartmentFilters.floorFrom)) return false;
    if (apartmentFilters.floorTo && apt.floor > Number(apartmentFilters.floorTo)) return false;
    if (apartmentFilters.status !== "all" && apt.status !== apartmentFilters.status) return false;
    return true;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <PageHeader
        breadcrumbs={[
          { label: "Главная", to: "/" },
          { label: "Объекты", to: "/objects" },
          { label: object.name },
        ]}
        title={object.name}
        subtitle={object.location}
        badge={
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
            object.status === "Сдан"
              ? "bg-green-50 text-green-700"
              : object.status === "Старт продаж"
              ? "bg-orange-50 text-orange-700"
              : "bg-blue-50 text-[#0066FF]"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              object.status === "Сдан" ? "bg-green-500" :
              object.status === "Старт продаж" ? "bg-orange-500" : "bg-[#0066FF] animate-pulse"
            }`} />
            {object.status} · Срок сдачи: {object.completionDate}
          </span>
        }
      />

      <div className="container mx-auto px-4 py-12">
        {/* Фото объекта */}
        <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-10 shadow-lg">
          <ImageWithFallback
            src={object.image}
            alt={object.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Object Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">О комплексе</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{object.description}</p>

              <h3 className="text-xl font-semibold mb-4">Преимущества</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {object.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Записаться на экскурсию</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors">
                  Записаться
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/mortgage"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-center py-3 rounded-xl transition-colors"
                >
                  Рассчитать ипотеку
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Apartments Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Выбор квартир</h2>

          {/* Apartment Filters */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Комнат</label>
                <select
                  value={apartmentFilters.rooms}
                  onChange={(e) =>
                    setApartmentFilters({ ...apartmentFilters, rooms: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Все</option>
                  <option value="1-комн">1-комн</option>
                  <option value="2-комн">2-комн</option>
                  <option value="3-комн">3-комн</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Площадь от (м²)</label>
                <input
                  type="number"
                  placeholder="30"
                  value={apartmentFilters.areaFrom}
                  onChange={(e) =>
                    setApartmentFilters({ ...apartmentFilters, areaFrom: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Площадь до (м²)</label>
                <input
                  type="number"
                  placeholder="100"
                  value={apartmentFilters.areaTo}
                  onChange={(e) =>
                    setApartmentFilters({ ...apartmentFilters, areaTo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Статус</label>
                <select
                  value={apartmentFilters.status}
                  onChange={(e) =>
                    setApartmentFilters({ ...apartmentFilters, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Все</option>
                  <option value="Свободна">Свободна</option>
                  <option value="Забронирована">Забронирована</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Цена от (₽)</label>
                <input
                  type="number"
                  placeholder="3 000 000"
                  value={apartmentFilters.priceFrom}
                  onChange={(e) =>
                    setApartmentFilters({ ...apartmentFilters, priceFrom: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Цена до (₽)</label>
                <input
                  type="number"
                  placeholder="15 000 000"
                  value={apartmentFilters.priceTo}
                  onChange={(e) =>
                    setApartmentFilters({ ...apartmentFilters, priceTo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() =>
                setApartmentFilters({
                  rooms: "all",
                  areaFrom: "",
                  areaTo: "",
                  priceFrom: "",
                  priceTo: "",
                  floorFrom: "",
                  floorTo: "",
                  status: "all",
                })
              }
              className="mt-4 px-6 py-2 border border-gray-300 rounded-xl hover:bg-white transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>

          {/* Apartments List */}
          <div className="space-y-4">
            {filteredApartments.length > 0 ? (
              filteredApartments.map((apt) => (
                <div
                  key={apt.id}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">

                    {/* — Apartment image — */}
                    <div className="relative w-full sm:w-44 md:w-52 flex-shrink-0 h-52 sm:h-auto overflow-hidden bg-gray-50">
                      <ImageWithFallback
                        src={
                          apt.layout === "Студия"
                            ? "https://images.unsplash.com/photo-1594295800284-990f74bb6928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                            : apt.rooms === "1-комн"
                            ? "https://images.unsplash.com/photo-1769184618473-58c1f0e294f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                            : apt.rooms === "2-комн"
                            ? "https://images.unsplash.com/photo-1561518065-8b3befac609d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                            : "https://images.unsplash.com/photo-1663851360815-784f3ba447f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                        }
                        alt={`${apt.rooms} — ${apt.layout}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* gradient bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {/* layout badge over image */}
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-800 shadow-sm">
                          <Home className="w-3 h-3 text-[#0066FF]" />
                          {apt.layout}
                        </span>
                      </div>
                    </div>

                    {/* — Content — */}
                    <div className="flex-1 flex flex-col gap-0 p-6 sm:p-7">

                      {/* Row 1: title + status + price */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-bold text-gray-900 text-xl">{apt.rooms}</span>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                apt.status === "Свободна"
                                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                  : "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  apt.status === "Свободна" ? "bg-emerald-500" : "bg-orange-500"
                                }`}
                              />
                              {apt.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">Квартира #{apt.id} · Корпус 1</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Стоимость</div>
                          <div className="text-2xl font-bold text-[#0066FF]">{formatPrice(apt.price)}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {formatPrice(Math.round(apt.price / apt.area))} за м²
                          </div>
                        </div>
                      </div>

                      {/* Row 2: spec chips */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <div className="flex items-center gap-1.5 bg-gray-50 hover:bg-blue-50 rounded-xl px-3.5 py-2 transition-colors">
                          <Maximize2 className="w-3.5 h-3.5 text-[#0066FF]" />
                          <span className="text-sm font-medium text-gray-700">{apt.area} м²</span>
                          <span className="text-xs text-gray-400">площадь</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 hover:bg-blue-50 rounded-xl px-3.5 py-2 transition-colors">
                          <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                          <span className="text-sm font-medium text-gray-700">{apt.floor}</span>
                          <span className="text-xs text-gray-400">этаж</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 hover:bg-blue-50 rounded-xl px-3.5 py-2 transition-colors">
                          <Building2 className="w-3.5 h-3.5 text-[#0066FF]" />
                          <span className="text-sm font-medium text-gray-700">Готовность 75%</span>
                        </div>
                      </div>

                      {/* Row 3: divider + CTA */}
                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                        <a
                          href="#"
                          className="text-sm text-[#0066FF] font-medium hover:underline"
                        >
                          Посмотреть план
                        </a>
                        <button
                          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                            apt.status === "Свободна"
                              ? "bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white shadow-sm shadow-blue-100 hover:shadow-md hover:shadow-blue-200 hover:scale-[1.02]"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={apt.status !== "Свободна"}
                        >
                          {apt.status === "Свободна" ? "Забронировать" : "Недоступна"}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Квартиры не найдены</h3>
                <p className="text-gray-600">Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}