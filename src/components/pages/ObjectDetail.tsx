'use client';

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Maximize2, Layers, Home, Phone, ArrowRight, ChevronDown, ChevronUp,
  ShieldCheck, CreditCard, Building2, TreePine, Car, Sparkles, Key,
  CheckCircle, Sun, LayoutGrid, X, MessageSquare
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PageHeader } from "../PageHeader";
import ObjectLocationMap from "../ObjectLocationMap";

const ICON_MAP = {
  car: Car,
  shield: ShieldCheck,
  credit: CreditCard,
  building: Building2,
  tree: TreePine,
  grid: LayoutGrid,
  sparkles: Sparkles,
  key: Key,
  sun: Sun,
} as const;

type IconKey = keyof typeof ICON_MAP;

interface Advantage {
  icon: IconKey;
  title: string;
  text: string;
}

interface MarketingCard {
  category: string;
  utp: string;
  text: string;
  icon: IconKey;
  image: string;
}

interface HeroStat {
  value: string;
  suffix: string;
  label: string;
  numericValue?: number;
  decimals?: number;
}

interface Spec {
  label: string;
  value: string;
}

interface Apartment {
  id: number;
  rooms: string;
  area: number;
  floor: number;
  price: number;
  status: string;
  layout: string;
}

interface ObjectInfo {
  name: string;
  location: string;
  status: string;
  completionDate: string;
  description: string;
  image: string;
  priceFrom?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  advantages?: Advantage[];
  heroStats?: HeroStat[];
  aboutText?: string;
  specs?: Spec[];
  marketingCards?: MarketingCard[];
  gallery?: string[];
  features: string[];
  apartments: Apartment[];
  coordinates?: { lat: number; lng: number };
}

const sharedApartments: Apartment[] = [
  { id: 1, rooms: "1-комн", area: 38, floor: 5, price: 4200000, status: "Свободна", layout: "Студия" },
  { id: 2, rooms: "1-комн", area: 42, floor: 8, price: 4700000, status: "Свободна", layout: "Европланировка" },
  { id: 3, rooms: "2-комн", area: 58, floor: 10, price: 6300000, status: "Свободна", layout: "Распашонка" },
  { id: 4, rooms: "2-комн", area: 65, floor: 12, price: 7100000, status: "Забронирована", layout: "Линейная" },
  { id: 5, rooms: "3-комн", area: 85, floor: 15, price: 9400000, status: "Свободна", layout: "Распашонка" },
  { id: 6, rooms: "3-комн", area: 92, floor: 16, price: 10200000, status: "Свободна", layout: "Европланировка" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1594295800284-990f74bb6928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1769184618473-58c1f0e294f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1561518065-8b3befac609d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1663851360815-784f3ba447f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1561518065-8b3befac609d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1769184618473-58c1f0e294f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "https://images.unsplash.com/photo-1663851360815-784f3ba447f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
];

const objectData: Record<number, ObjectInfo> = {
  1: {
    name: "ЖК Северный",
    location: "САО, ул. Северная, 15",
    status: "Строится",
    completionDate: "4 кв. 2026",
    description: "Современный жилой комплекс с развитой инфраструктурой. Рядом метро, школы, детские сады, торговые центры.",
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    gallery: galleryImages,
    features: ["Закрытая территория", "Подземный паркинг", "Детские площадки", "Спортивные площадки", "Консьерж-сервис", "Видеонаблюдение"],
    apartments: sharedApartments,
  },
  2: {
    name: "ЖК Центральный Двор",
    location: "просп. В.И. Ленина, 31",
    status: "Старт продаж",
    completionDate: "2 кв. 2027",
    priceFrom: "от 3,7 млн",
    description: "«Центральный Двор» объединяет практичные планировки, защищённую территорию и спокойную городскую среду.",
    image: "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroTitle: "Квартиры с видом на Центральный парк",
    heroSubtitle: "Закрытая территория. Двор без машин. Парк за окном.",
    advantages: [
      {
        icon: "car",
        title: "Двор без машин",
        text: "Пешеходная территория для прогулок, игр и отдыха рядом с домом.",
      },
      {
        icon: "shield",
        title: "Закрытый контур",
        text: "Контроль доступа и видеонаблюдение 24/7 дарят спокойствие и приватность.",
      },
      {
        icon: "credit",
        title: "Гибкая система оплаты",
        text: "Ипотека, рассрочка, маткапитал и полное сопровождение документов.",
      },
    ],
    heroStats: [
      { value: "от 3,5", suffix: "%", label: "Ипотека", numericValue: 3.5, decimals: 1 },
      { value: "от 32", suffix: "м²", label: "Площадь", numericValue: 32 },
      { value: "57", suffix: "га", label: "Рядом парк", numericValue: 57 },
      { value: "0", suffix: "", label: "Машин во дворе", numericValue: 0 },
    ],
    aboutText: "ЖК «Центральный Двор» — современный жилой квартал в центре города, где архитектура, благоустройство и инфраструктура создают комфортную городскую среду. Три корпуса высотой от 9 до 17 этажей образуют закрытый двор без машин — безопасное пространство для прогулок, игр и отдыха. В шаговой доступности — Центральный парк площадью 57 га.",
    specs: [
      { label: "Корпусов", value: "3" },
      { label: "Этажей", value: "9–17" },
      { label: "Квартир", value: "437" },
      { label: "Срок сдачи", value: "2 кв. 2027" },
    ],
    marketingCards: [
      {
        category: "Архитектура",
        utp: "Стильные фасады и большие окна",
        text: "Современный дом с новыми технологиями.",
        icon: "building",
        image: "/images/marketing-cards/architecture.jpg",
      },
      {
        category: "Интерьеры",
        utp: "Пространство без лишних метров",
        text: "Продуманные планировки для жизни.",
        icon: "grid",
        image: "/images/marketing-cards/interiors.jpg",
      },
      {
        category: "Двор",
        utp: "Двор без машин",
        text: "Безопасное пространство для семьи.",
        icon: "tree",
        image: "/images/marketing-cards/courtyard.jpeg",
      },
      {
        category: "Каждый день",
        utp: "Всё рядом для удобной жизни",
        text: "Парк рядом для прогулок и пробежек.",
        icon: "sun",
        image: "/images/marketing-cards/everyday.jpeg",
      },
      {
        category: "Квартиры с ремонтом",
        utp: "Можно заехать быстрее",
        text: "Готовый вариант для быстрого переезда.",
        icon: "key",
        image: "/images/marketing-cards/renovated-apartments.jpg",
      },
      {
        category: "Парк за окном",
        utp: "57 га рядом",
        text: "Зелёная среда рядом с домом.",
        icon: "sparkles",
        image: "/images/marketing-cards/park-view.jpg",
      },
    ],
    gallery: galleryImages,
    features: ["Закрытая территория", "Двор без машин", "Детские площадки", "Видеонаблюдение 24/7", "Гибкая оплата", "Ипотека от 3,5%"],
    apartments: sharedApartments,
    coordinates: { lat: 44.883901, lng: 39.194597 },
  },
};

function AnimatedStat({ stat }: { stat: HeroStat }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = stat.numericValue ?? 0;
    const dec = stat.decimals ?? 0;
    if (!started || target === 0) { setCount(target); return; }
    let rafId: number;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(dec)));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, stat.numericValue, stat.decimals]);

  const hasPrefix = stat.value.startsWith("от");
  const dec = stat.decimals ?? 0;
  const displayValue = stat.numericValue === 0
    ? "0"
    : dec > 0
      ? count.toFixed(dec).replace(".", ",")
      : String(Math.round(count));

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#363E62] leading-none tabular-nums mb-2">
        {hasPrefix && <span className="text-sm sm:text-base font-medium text-gray-400 mr-0.5">от </span>}
        <span>{displayValue}</span>
        {stat.suffix && <span className="text-base sm:text-xl md:text-2xl ml-0.5">{stat.suffix}</span>}
      </div>
      <div className="text-gray-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">{stat.label}</div>
    </div>
  );
}

function BookingForm({ objectName, objectImage }: { objectName: string; objectImage: string }) {
  return (
    <div className="rounded-[2rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
      {/* LEFT — Visual panel */}
      <div className="relative flex flex-col justify-between p-8 md:p-10 overflow-hidden bg-[#080f1f]">
        {/* Background image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={objectImage}
            alt={objectName}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#363E62]/40 via-transparent to-[#080f1f]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f1f] via-transparent to-transparent" />
        </div>

        {/* Decorative circle glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#363E62]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#363E62]/10 rounded-full blur-3xl" />

        {/* TOP: badge + title */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Онлайн — отвечаем прямо сейчас</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Запишитесь<br />на экскурсию
          </h3>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Покажем квартиры «{objectName}» вживую, ответим на вопросы и подберём удобное время визита
          </p>
        </div>

        {/* BOTTOM: manager card */}
        <div className="relative z-10 flex items-stretch gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mt-8">
          <div className="relative flex-shrink-0 self-start">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1770199105692-9e52ff137cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNjI5MzEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Менеджер МИАН"
              className="w-14 h-14 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#080f1f]" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <p className="text-white font-bold text-sm leading-tight">Анна Соколова</p>
              <p className="text-white/60 text-xs mt-1 leading-snug">Старший менеджер · 7 лет опыта</p>
            </div>
            <div className="flex gap-2 mt-3">
              <a href="tel:+74951234567" className="flex-1 h-9 bg-[#363E62] hover:bg-[#232840] rounded-xl flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="flex-1 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                <MessageSquare className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form panel */}
      <div className="bg-white flex flex-col justify-center p-8 md:p-10">
        <p className="text-[#363E62] font-semibold mb-2 text-sm tracking-wide uppercase">Запись на экскурсию</p>
        <h4 className="text-2xl font-bold text-[#363E62] leading-snug mb-6">
          Выберите удобное<br />для визита время
        </h4>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-5 py-4 bg-[#f5f5f5] rounded-2xl border-2 border-transparent focus:border-[#363E62] focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full px-5 py-4 bg-[#f5f5f5] rounded-2xl border-2 border-transparent focus:border-[#363E62] focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <input
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full px-5 py-4 bg-[#f5f5f5] rounded-2xl border-2 border-transparent focus:border-[#363E62] focus:bg-white focus:outline-none transition-all text-gray-600"
          />
          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" id="privacy" className="mt-1 w-4 h-4 accent-[#363E62] cursor-pointer flex-shrink-0" />
            <label htmlFor="privacy" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
              Я согласен(а) с{" "}
              <Link href="/privacy" className="text-[#363E62] hover:underline">политикой конфиденциальности</Link>
            </label>
          </div>
          <button
            type="submit"
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#363E62]/20 hover:shadow-[#363E62]/30 hover:opacity-90 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Записаться</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href="/mortgage"
            className="block w-full bg-gray-50 hover:bg-gray-100 text-center py-3 rounded-xl text-sm font-medium text-gray-600 transition-colors"
          >
            Рассчитать ипотеку
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 pt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#363E62]" />
          <span className="text-xs text-gray-400">Данные защищены согласно 152-ФЗ</span>
        </div>
      </div>
    </div>
  );
}

function Gallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const preview = images.slice(0, 4);

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#363E62]">Галерея</h2>
          <span className="px-2.5 py-1 bg-[#363E62]/10 text-[#363E62] rounded-full text-xs sm:text-sm font-semibold">
            {images.length} фото
          </span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 bg-white border border-gray-200 hover:border-[#363E62]/30 hover:bg-[#363E62]/5 rounded-xl text-xs sm:text-sm font-semibold text-[#363E62] transition-all whitespace-nowrap"
        >
          {open ? (
            <><span className="hidden sm:inline">Свернуть</span><span className="sm:hidden">Скрыть</span> <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></>
          ) : (
            <><span className="hidden sm:inline">Открыть галерею</span><span className="sm:hidden">Открыть</span> <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></>
          )}
        </button>
      </div>

      {/* Preview (always shown) */}
      {!open && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {preview.map((src, i) => (
            <button
              key={i}
              onClick={() => { setOpen(true); setLightbox(i); }}
              className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden group"
            >
              <ImageWithFallback
                src={src}
                alt={`Фото ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {i === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+{images.length - 4}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Expanded grid */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
            >
              <ImageWithFallback
                src={src}
                alt={`Фото ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </motion.div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div
            className="max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={images[lightbox]}
              alt={`Фото ${lightbox + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

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
    status: "all",
  });

  if (!object) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Объект не найден</h2>
          <Link href="/objects" className="text-[#363E62] hover:underline">
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
    if (apartmentFilters.status !== "all" && apt.status !== apartmentFilters.status) return false;
    return true;
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₽";

  const hasHero = !!(object.heroTitle || object.advantages);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        breadcrumbs={[
          { label: "Главная", to: "/" },
          { label: "Объекты", to: "/objects" },
          { label: object.name },
        ]}
        title={object.name}
        subtitle={object.location}
      />

      {/* ─── HERO BANNER ─── */}
      {hasHero ? (
        <section className="relative">
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <ImageWithFallback
              src={object.image}
              alt={object.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 pt-10 pb-16 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24">
            <div className="max-w-2xl text-white">
              {/* Price badge */}
              {object.priceFrom && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full mb-5 sm:mb-6"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold text-sm sm:text-base">Цена {object.priceFrom}</span>
                </motion.div>
              )}

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
              >
                {object.heroTitle || object.name}
              </motion.h1>

              {/* Subtitle */}
              {object.heroSubtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-xl text-white/80 mb-6 sm:mb-8"
                >
                  {object.heroSubtitle}
                </motion.p>
              )}

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <button
                  onClick={() => document.getElementById("apartments-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-semibold shadow-xl hover:opacity-90 transition-all text-sm sm:text-base"
                >
                  Выбрать квартиру
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-semibold border-2 border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Получить консультацию
                </button>
              </motion.div>
            </div>
          </div>

        </section>
      ) : (
        /* Fallback: simple hero image for objects without full hero data */
        <div className="container mx-auto px-4 pt-6 pb-0">
          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg mb-10">
            <ImageWithFallback
              src={object.image}
              alt={object.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      )}

      {/* ─── STATS BAR (outside hero to avoid overflow clipping) ─── */}
      {hasHero && object.heroStats && (
        <div className="relative -mt-12 sm:-mt-14 z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6">
              {object.heroStats.map((stat, i) => (
                <AnimatedStat key={i} stat={stat} />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <div className={`container mx-auto px-4 ${hasHero ? "pt-8 sm:pt-10" : "pt-8"}`}>

        {/* ─── О КОМПЛЕКСЕ ─── */}
        <div id="about-section" className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-[#363E62]">О комплексе</h2>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-gray-600 leading-relaxed text-base mb-6">
                {object.aboutText || object.description}
              </p>

              {/* Features list */}
              {!object.specs && (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-[#363E62]">Преимущества</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {object.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Feature tags (if specs are shown) */}
              {object.specs && (
                <div className="flex flex-wrap gap-2">
                  {object.features.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#363E62]/8 text-[#363E62] rounded-full text-sm font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        </div>

        {/* ─── МАРКЕТИНГОВЫЕ КАРТОЧКИ ─── */}
        {object.marketingCards && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#363E62]">Почему «Центральный Двор»</h2>
            </div>
            <div className="flex overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain snap-x snap-mandatory gap-4 pb-2 -mx-4 sm:mx-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0 [overflow-anchor:none]">
              <div className="w-4 shrink-0 snap-start sm:hidden" aria-hidden="true" />
              {object.marketingCards.map((card, i) => (
                <motion.div
                  key={card.category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 shrink-0 w-[78%] snap-start sm:w-auto sm:shrink min-h-[220px] flex flex-col justify-end p-6"
                >
                  <ImageWithFallback
                    src={card.image}
                    alt={card.utp}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />
                  <div className="relative z-10">
                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-2">{card.category}</p>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{card.utp}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{card.text}</p>
                  </div>
                </motion.div>
              ))}
              <div className="w-4 shrink-0 sm:hidden" aria-hidden="true" />
            </div>
          </motion.section>
        )}

        {/* ─── ГАЛЕРЕЯ ─── */}
        {object.gallery && object.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Gallery images={object.gallery} />
          </motion.div>
        )}

        {/* ─── КАРТА ─── */}
        {object.coordinates && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6 text-[#363E62]">Расположение на карте</h2>
            <ObjectLocationMap
              lat={object.coordinates.lat}
              lng={object.coordinates.lng}
              name={object.name}
              address={object.location}
            />
          </motion.div>
        )}

        {/* ─── ВЫБОР КВАРТИР ─── */}
        <div id="apartments-section" className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6 text-[#363E62]">Выбор квартир</h2>

          {/* Filters */}
          <div className="bg-[#f7f7fb] rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Комнат</label>
                <select
                  value={apartmentFilters.rooms}
                  onChange={(e) => setApartmentFilters({ ...apartmentFilters, rooms: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#363E62]/30 focus:border-[#363E62] transition-all"
                >
                  <option value="all">Все</option>
                  <option value="1-комн">1-комн</option>
                  <option value="2-комн">2-комн</option>
                  <option value="3-комн">3-комн</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Площадь от (м²)</label>
                <input
                  type="number"
                  placeholder="30"
                  value={apartmentFilters.areaFrom}
                  onChange={(e) => setApartmentFilters({ ...apartmentFilters, areaFrom: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#363E62]/30 focus:border-[#363E62] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Площадь до (м²)</label>
                <input
                  type="number"
                  placeholder="100"
                  value={apartmentFilters.areaTo}
                  onChange={(e) => setApartmentFilters({ ...apartmentFilters, areaTo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#363E62]/30 focus:border-[#363E62] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Статус</label>
                <select
                  value={apartmentFilters.status}
                  onChange={(e) => setApartmentFilters({ ...apartmentFilters, status: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#363E62]/30 focus:border-[#363E62] transition-all"
                >
                  <option value="all">Все</option>
                  <option value="Свободна">Свободна</option>
                  <option value="Забронирована">Забронирована</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Цена от (₽)</label>
                <input
                  type="number"
                  placeholder="3 000 000"
                  value={apartmentFilters.priceFrom}
                  onChange={(e) => setApartmentFilters({ ...apartmentFilters, priceFrom: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#363E62]/30 focus:border-[#363E62] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Цена до (₽)</label>
                <input
                  type="number"
                  placeholder="15 000 000"
                  value={apartmentFilters.priceTo}
                  onChange={(e) => setApartmentFilters({ ...apartmentFilters, priceTo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#363E62]/30 focus:border-[#363E62] transition-all"
                />
              </div>
            </div>

            <button
              onClick={() => setApartmentFilters({ rooms: "all", areaFrom: "", areaTo: "", priceFrom: "", priceTo: "", status: "all" })}
              className="px-6 py-2.5 border border-gray-200 bg-white rounded-xl hover:border-[#363E62]/30 text-sm font-medium text-gray-600 transition-all"
            >
              Сбросить фильтры
            </button>
          </div>

          {/* Apartments list */}
          <div className="space-y-4">
            {filteredApartments.length > 0 ? (
              filteredApartments.map((apt) => (
                <div
                  key={apt.id}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#363E62]/30 hover:shadow-xl hover:shadow-[#363E62]/10 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-44 md:w-52 flex-shrink-0 h-52 sm:h-auto overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/45 backdrop-blur-sm rounded-lg text-xs font-semibold text-white">
                          <Home className="w-3 h-3" />
                          {apt.layout}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-0 p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-bold text-[#363E62] text-xl">{apt.rooms}</span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              apt.status === "Свободна"
                                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                : "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${apt.status === "Свободна" ? "bg-emerald-500" : "bg-orange-500"}`} />
                              {apt.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">Квартира #{apt.id} · Корпус 1</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Стоимость</div>
                          <div className="text-2xl font-bold text-[#363E62]">{formatPrice(apt.price)}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{formatPrice(Math.round(apt.price / apt.area))} за м²</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        <div className="flex items-center gap-1.5 bg-gray-50 hover:bg-[#363E62]/8 rounded-xl px-3.5 py-2 transition-colors">
                          <Maximize2 className="w-3.5 h-3.5 text-[#363E62]" />
                          <span className="text-sm font-medium text-gray-700">{apt.area} м²</span>
                          <span className="text-xs text-gray-400">площадь</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 hover:bg-[#363E62]/8 rounded-xl px-3.5 py-2 transition-colors">
                          <Layers className="w-3.5 h-3.5 text-[#363E62]" />
                          <span className="text-sm font-medium text-gray-700">{apt.floor}</span>
                          <span className="text-xs text-gray-400">этаж</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 hover:bg-[#363E62]/8 rounded-xl px-3.5 py-2 transition-colors">
                          <Building2 className="w-3.5 h-3.5 text-[#363E62]" />
                          <span className="text-sm font-medium text-gray-700">Готовность 75%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                        <a href="#" className="text-sm text-[#363E62] font-medium hover:underline">
                          Посмотреть план
                        </a>
                        <button
                          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                            apt.status === "Свободна"
                              ? "bg-gradient-to-r from-[#363E62] to-[#232840] text-white shadow-sm shadow-[#363E62]/15 hover:shadow-md hover:shadow-[#363E62]/20 hover:opacity-90"
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

        {/* ─── ЗАПИСЬ НА ЭКСКУРСИЮ ─── */}
        <div id="booking-form" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookingForm objectName={object.name} objectImage={object.image} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
