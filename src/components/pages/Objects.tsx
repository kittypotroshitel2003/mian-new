'use client';

import { MapPin, Building2, Calendar, Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PageHeader } from "../PageHeader";

const allObjects = [
  {
    id: 1,
    name: "ЖК Северный",
    location: "САО",
    district: "Северный",
    status: "Строится",
    priceFrom: 5500000,
    pricePerSqm: 120000,
    completionDate: "4 кв. 2026",
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTIxNzg4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 234,
    floors: 17,
  },
  {
    id: 2,
    name: "ЖК Южный Парк",
    location: "ЮЗАО",
    district: "Южный",
    status: "Старт продаж",
    priceFrom: 6200000,
    pricePerSqm: 135000,
    completionDate: "2 кв. 2027",
    image: "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzcxMjM1MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 156,
    floors: 25,
  },
  {
    id: 3,
    name: "ЖК Восточный Берег",
    location: "ВАО",
    district: "Восточный",
    status: "Строится",
    priceFrom: 4800000,
    pricePerSqm: 110000,
    completionDate: "3 кв. 2026",
    image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEyMTQ0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 189,
    floors: 20,
  },
  {
    id: 4,
    name: "ЖК Западные Ворота",
    location: "ЗАО",
    district: "Западный",
    status: "Строится",
    priceFrom: 7100000,
    pricePerSqm: 145000,
    completionDate: "1 кв. 2027",
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTIxNzg4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 312,
    floors: 22,
  },
  {
    id: 5,
    name: "ЖК Центральный Квартал",
    location: "ЦАО",
    district: "Центральный",
    status: "Сдан",
    priceFrom: 12000000,
    pricePerSqm: 250000,
    completionDate: "Сдан",
    image: "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzcxMjM1MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 89,
    floors: 15,
  },
  {
    id: 6,
    name: "ЖК Зеленая Долина",
    location: "Московская область",
    district: "Подмосковье",
    status: "Старт продаж",
    priceFrom: 3900000,
    pricePerSqm: 95000,
    completionDate: "3 кв. 2027",
    image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEyMTQ0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 445,
    floors: 12,
  },
];

export default function Objects() {
  const [filters, setFilters] = useState({
    status: "all",
    district: "all",
    priceFrom: "",
    priceTo: "",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredObjects = allObjects.filter((obj) => {
    if (filters.status !== "all" && obj.status !== filters.status) return false;
    if (filters.district !== "all" && obj.district !== filters.district) return false;
    if (filters.priceFrom && obj.priceFrom < Number(filters.priceFrom)) return false;
    if (filters.priceTo && obj.priceFrom > Number(filters.priceTo)) return false;
    if (filters.search && !obj.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      district: "all",
      priceFrom: "",
      priceTo: "",
      search: "",
    });
  };

  const hasActiveFilters = filters.status !== "all" || 
                           filters.district !== "all" || 
                           filters.priceFrom !== "" || 
                           filters.priceTo !== "" || 
                           filters.search !== "";

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Объекты" }]}
        title="Наши объекты"
        subtitle={`Выберите квартиру мечты из ${allObjects.length} жилых комплексов`}
        badge={
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#0066FF] rounded-full text-sm font-medium">
            <Building2 className="w-4 h-4" />
            {allObjects.length} жилых комплекса
          </div>
        }
      />

      <div className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-[#0066FF]" />
                <span className="font-semibold">Фильтры</span>
                {hasActiveFilters && (
                  <span className="px-2 py-1 bg-[#0066FF] text-white text-xs rounded-full">
                    Активны
                  </span>
                )}
              </div>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className={`w-5 h-5 ${showFilters ? '' : 'rotate-45'}`} />
              </motion.div>
            </button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl p-6 md:p-8 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  {/* Search */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Поиск по названию
                    </label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Название ЖК..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Статус
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">Все статусы</option>
                      <option value="Строится">Строится</option>
                      <option value="Старт продаж">Старт продаж</option>
                      <option value="Сдан">Сдан</option>
                    </select>
                  </div>

                  {/* District Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Район
                    </label>
                    <select
                      value={filters.district}
                      onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">Все районы</option>
                      <option value="Северный">Северный</option>
                      <option value="Южный">Южный</option>
                      <option value="Восточный">Восточный</option>
                      <option value="Западный">Западный</option>
                      <option value="Центральный">Центральный</option>
                      <option value="Подмосковье">Подмосковье</option>
                    </select>
                  </div>

                  {/* Reset Button */}
                  <div className="flex items-end">
                    <button
                      onClick={resetFilters}
                      disabled={!hasActiveFilters}
                      className={`w-full px-4 py-3 rounded-2xl font-semibold transition-all ${
                        hasActiveFilters
                          ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          : "bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Сбросить
                    </button>
                  </div>
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Цена от (₽)
                    </label>
                    <input
                      type="number"
                      placeholder="3 000 000"
                      value={filters.priceFrom}
                      onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Цена до (₽)
                    </label>
                    <input
                      type="number"
                      placeholder="15 000 000"
                      value={filters.priceTo}
                      onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="text-gray-600">
            Найдено объектов:{" "}
            <span className="font-bold text-2xl text-gray-900 ml-2">
              {filteredObjects.length}
            </span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-sm text-[#0066FF] hover:text-[#0052CC] font-medium flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Сбросить фильтры
            </button>
          )}
        </motion.div>

        {/* Objects Grid */}
        {filteredObjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredObjects.map((object, index) => (
              <motion.div
                key={object.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/objects/${object.id}`}
                  className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback
                      src={object.image}
                      alt={object.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <div
                        className={`px-4 py-2 backdrop-blur-md rounded-full text-sm font-semibold shadow-lg ${
                          object.status === "Сдан"
                            ? "bg-green-500/90 text-white"
                            : object.status === "Старт продаж"
                            ? "bg-orange-500/90 text-white"
                            : "bg-blue-500/90 text-white"
                        }`}
                      >
                        {object.status}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-5 h-5 text-[#0066FF]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#0066FF] transition-colors">
                      {object.name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-6">
                      <MapPin className="w-4 h-4 text-[#0066FF]" />
                      <span>{object.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Квартир</div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#0066FF]" />
                          {object.apartments} шт
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Срок сдачи</div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#0066FF]" />
                          {object.completionDate}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-2">Цена</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00D9FF] bg-clip-text text-transparent mb-1">
                        от {formatPrice(object.priceFrom)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatPrice(object.pricePerSqm)} за м²
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Объекты не найдены
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Попробуйте изменить параметры фильтрации или сбросить все фильтры
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Сбросить фильтры
            </button>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Не нашли подходящий вариант?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Оставьте заявку, и наши специалисты подберут идеальную квартиру для вас
                </p>
              </div>
              <Link
                href="/#consultation-form"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <span>Получить консультацию</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}