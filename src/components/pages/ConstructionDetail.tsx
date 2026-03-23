'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera, Clock, Image as ImageIcon, ChevronRight,
  MapPin, Calendar, CheckCircle2, Circle, ZoomIn, X, Video,
  Wifi, WifiOff, Building2, AlertCircle
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PageHeader } from "../PageHeader";

/* ─── shared images ─────────────────────────────────────────── */
const IMG = {
  crane:    "https://images.unsplash.com/photo-1771433053449-d14881091839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  scaffold: "https://images.unsplash.com/photo-1772551419343-6416fad2593c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  aerial:   "https://images.unsplash.com/photo-1679859714566-8bd38006794e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  interior: "https://images.unsplash.com/photo-1768321910101-bdf80fb1ec56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  workers:  "https://images.unsplash.com/photo-1769284013173-47150b8c7e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  rooftop:  "https://images.unsplash.com/photo-1760456307112-e69c5ede808d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  site:     "https://images.unsplash.com/photo-1766595680977-fd4818afa337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
};

/* ─── data ───────────────────────────────────────────────────── */
const objectsData: Record<string, ObjectData> = {
  "1": {
    id: "1",
    name: "ЖК Северный",
    location: "САО, ул. Северная, 15",
    progress: 75,
    completionDate: "4 кв. 2026",
    status: "Строится",
    description:
      "Современный жилой комплекс бизнес-класса с закрытой территорией, подземным паркингом и консьерж-сервисом. На сегодняшний день завершены конструктивные работы по 15-му этажу, ведётся монтаж фасадных систем и инженерных коммуникаций.",
    cameras: [
      { id: 1, name: "Главный фасад",    angle: "Север → Юг",  preview: IMG.crane,    online: true  },
      { id: 2, name: "Западный угол",    angle: "Запад → Восток", preview: IMG.scaffold, online: true  },
      { id: 3, name: "Аэрообзор",        angle: "Верхний план", preview: IMG.aerial,   online: true  },
      { id: 4, name: "Внутренние работы",angle: "Этаж 12",     preview: IMG.interior, online: false },
    ],
    timeline: [
      { id: 1, date: "Апрель 2024",   title: "Старт строительства",           description: "Торжественная закладка первого камня. Начало земляных работ и устройство котлована.", done: true, milestone: true },
      { id: 2, date: "Сентябрь 2024", title: "Фундамент готов",               description: "Завершено устройство монолитного фундамента. Выполнены работы по гидроизоляции и дренажу.", done: true, milestone: false },
      { id: 3, date: "Январь 2025",   title: "Возведение подземного паркинга", description: "Смонтированы перекрытия подземных уровней. Выполнена гидроизоляция стен и пола.", done: true, milestone: false },
      { id: 4, date: "Июнь 2025",     title: "Монолитный каркас — 8 этажей",  description: "Возведён монолитный железобетонный каркас до отметки +8 этаж. Начата разводка коммуникаций.", done: true, milestone: true },
      { id: 5, date: "Ноябрь 2025",   title: "Монолитный каркас — 12 этажей", description: "Продолжено возведение несущих конструкций. Выполнена кладка наружных стен нижних этажей.", done: true, milestone: false },
      { id: 6, date: "Февраль 2026",  title: "15 этаж. Фасадные работы",      description: "Завершён монолитный каркас. Начат монтаж навесных вентилируемых фасадных систем и оконных блоков.", done: true, milestone: true },
      { id: 7, date: "Май 2026",      title: "Инженерные системы",            description: "Монтаж систем отопления, вентиляции, водоснабжения и электрики.", done: false, milestone: false },
      { id: 8, date: "Сентябрь 2026", title: "Отделочные работы",             description: "Чистовая отделка мест общего пользования, отделка квартир (white box и под ключ).", done: false, milestone: false },
      { id: 9, date: "4 кв. 2026",    title: "Сдача дома. Выдача ключей",     description: "Получение разрешения на ввод объекта в эксплуатацию. Передача квартир покупателям.", done: false, milestone: true },
    ],
    photoReports: [
      {
        month: "Февраль 2026",
        text: "Завершены работы по возведению 15-го этажа. Начат монтаж навесного вентилируемого фасада. На объекте задействовано 3 башенных крана и более 200 рабочих.",
        images: [IMG.crane, IMG.scaffold, IMG.aerial, IMG.interior, IMG.workers, IMG.rooftop],
      },
      {
        month: "Январь 2026",
        text: "Завершено возведение 13–14 этажей. Продолжается монтаж инженерных коммуникаций в нижних секциях. Выполнена установка окон на 1–8 этажах.",
        images: [IMG.scaffold, IMG.workers, IMG.interior, IMG.site],
      },
      {
        month: "Декабрь 2025",
        text: "Несмотря на зимние условия, строительство ведётся в плановом режиме. Установлено тепловое ограждение на верхних этажах. Монолитные работы продолжаются круглосуточно.",
        images: [IMG.site, IMG.crane, IMG.workers],
      },
    ],
  },
  "2": {
    id: "2",
    name: "ЖК Южный Парк",
    location: "ЮЗАО, пр-т Южный, 5",
    progress: 45,
    completionDate: "2 кв. 2027",
    status: "Строится",
    description:
      "Жилой комплекс с видом на парк. Выполнен монолит до 6-го этажа, ведётся надземная часть.",
    cameras: [
      { id: 1, name: "Главный фасад",  angle: "Север → Юг", preview: IMG.scaffold, online: true  },
      { id: 2, name: "Кран А",         angle: "Восток",     preview: IMG.crane,    online: true  },
      { id: 3, name: "Подземный уровень", angle: "Б1",     preview: IMG.interior, online: true  },
      { id: 4, name: "Территория",     angle: "Общий план", preview: IMG.aerial,   online: true  },
    ],
    timeline: [
      { id: 1, date: "Июнь 2025",     title: "Старт строительства",    description: "Начало земляных работ, устройство шпунтового ограждения котлована.", done: true, milestone: true  },
      { id: 2, date: "Октябрь 2025",  title: "Фундамент готов",        description: "Завершена плита фундамента, выполнена гидроизоляция.",              done: true, milestone: false },
      { id: 3, date: "Февраль 2026",  title: "Монолит — 3 этажа",     description: "Возведён монолитный каркас первых трёх этажей.",                    done: true, milestone: false },
      { id: 4, date: "Май 2026",      title: "Монолит — 6 этажей",    description: "Продолжается возведение несущих конструкций до 6-го этажа.",         done: false, milestone: true  },
      { id: 5, date: "2 кв. 2027",    title: "Сдача дома",            description: "Плановый ввод объекта в эксплуатацию.",                             done: false, milestone: true  },
    ],
    photoReports: [
      {
        month: "Февраль 2026",
        text: "Завершены подземные работы. Начато возведение надземной части здания. Смонтированы первые пролёты каркаса.",
        images: [IMG.scaffold, IMG.workers, IMG.interior, IMG.aerial],
      },
    ],
  },
  "3": {
    id: "3",
    name: "ЖК Восточный Берег",
    location: "ВАО, наб. Восточная, 3",
    progress: 60,
    completionDate: "3 кв. 2026",
    status: "Строится",
    description:
      "Жилой комплекс с видом на реку. Завершена кровля, ведутся внутренние отделочные работы.",
    cameras: [
      { id: 1, name: "Набережная",   angle: "Юг → Север",  preview: IMG.aerial,   online: true  },
      { id: 2, name: "Главный вход", angle: "Восток",       preview: IMG.crane,    online: true  },
      { id: 3, name: "Кровля",       angle: "Верхний план", preview: IMG.rooftop,  online: true  },
      { id: 4, name: "Лоджии",       angle: "Фасад",        preview: IMG.scaffold, online: false },
    ],
    timeline: [
      { id: 1, date: "Март 2025",     title: "Старт строительства",  description: "Начало строительства ЖК «Восточный Берег».", done: true, milestone: true  },
      { id: 2, date: "Июль 2025",     title: "Фундамент",           description: "Завершена свайная основа и монолитная плита.", done: true, milestone: false },
      { id: 3, date: "Ноябрь 2025",   title: "Монолит завершён",    description: "Смонтирован полный каркас здания.", done: true, milestone: true  },
      { id: 4, date: "Февраль 2026",  title: "Кровля и фасад",      description: "Выполнен монтаж кровли и начаты фасадные работы.", done: true, milestone: false },
      { id: 5, date: "3 кв. 2026",    title: "Сдача дома",          description: "Плановый ввод объекта в эксплуатацию.", done: false, milestone: true  },
    ],
    photoReports: [
      {
        month: "Февраль 2026",
        text: "Завершён монтаж кровельного покрытия. Ведутся активные фасадные работы — установка остекления и облицовочных панелей.",
        images: [IMG.rooftop, IMG.aerial, IMG.scaffold, IMG.interior, IMG.crane],
      },
    ],
  },
};

/* ─── types ──────────────────────────────────────────────────── */
interface Camera { id: number; name: string; angle: string; preview: string; online: boolean; }
interface TimelineItem { id: number; date: string; title: string; description: string; done: boolean; milestone: boolean; }
interface PhotoReport { month: string; text: string; images: string[]; }
interface ObjectData {
  id: string; name: string; location: string; progress: number;
  completionDate: string; status: string; description: string;
  cameras: Camera[]; timeline: TimelineItem[]; photoReports: PhotoReport[];
}

/* ─── helpers ────────────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <>{time.toLocaleTimeString("ru-RU")}</>;
}

/* ─── Camera section ─────────────────────────────────────────── */
function CamerasTab({ cameras }: { cameras: Camera[] }) {
  const [activeId, setActiveId] = useState(cameras[0]?.id ?? 1);
  const active = cameras.find((c) => c.id === activeId) ?? cameras[0];

  return (
    <div className="space-y-6">
      {/* Main view */}
      <div className="relative rounded-3xl overflow-hidden bg-black aspect-video shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={active.preview}
              alt={active.name}
              className="w-full h-full object-cover"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5">
            {active.online ? (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-gray-400" />
            )}
            <span className="text-white text-xs font-semibold tracking-wide">
              {active.online ? "LIVE" : "OFFLINE"}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5 font-mono text-white text-xs">
            <Clock className="w-3.5 h-3.5 text-gray-300" />
            <LiveClock />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 z-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/60 text-xs mb-0.5 uppercase tracking-widest">Камера</p>
              <p className="text-white font-bold text-xl">{active.name}</p>
              <p className="text-white/60 text-sm">{active.angle}</p>
            </div>
            {!active.online && (
              <div className="flex items-center gap-2 bg-gray-900/80 rounded-xl px-3 py-2 text-sm text-gray-300">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Ведутся технические работы
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Camera selector thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cameras.map((cam) => (
          <button
            key={cam.id}
            onClick={() => setActiveId(cam.id)}
            className={`relative rounded-2xl overflow-hidden aspect-video group transition-all ${
              cam.id === activeId
                ? "ring-2 ring-[#0066FF] ring-offset-2 shadow-lg shadow-blue-100"
                : "ring-1 ring-gray-200 hover:ring-[#0066FF]/50"
            }`}
          >
            <ImageWithFallback
              src={cam.preview}
              alt={cam.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`absolute inset-0 transition-colors ${
              cam.id === activeId ? "bg-[#0066FF]/20" : "bg-black/30 group-hover:bg-black/20"
            }`} />
            {/* badges */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5">
              {cam.online ? (
                <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-1.5 py-0.5 text-[10px] font-bold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
              ) : (
                <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-1.5 py-0.5 text-[10px] font-bold text-gray-300">
                  <WifiOff className="w-2.5 h-2.5" />
                  OFF
                </span>
              )}
            </div>
            {cam.id === activeId && (
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#0066FF] rounded-full flex items-center justify-center">
                <Video className="w-2.5 h-2.5 text-white" />
              </div>
            )}
            <p className="absolute bottom-1.5 left-2 right-2 text-white text-[11px] font-semibold truncate drop-shadow">
              {cam.name}
            </p>
          </button>
        ))}
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
        <Wifi className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0066FF]" />
        <p>Трансляция ведётся в режиме реального времени. Изображение обновляется раз в 30 секунд. Архив записей хранится 30 дней.</p>
      </div>
    </div>
  );
}

/* ─── Timeline section ───────────────────────────────────────── */
function TimelineTab({ timeline, progress }: { timeline: TimelineItem[]; progress: number }) {
  return (
    <div>
      {/* Overall progress */}
      <div className="bg-gray-50 rounded-3xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-gray-900">Общая готовность объекта</p>
          <span className="text-2xl font-bold text-[#0066FF]">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D9FF]"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Старт</span>
          <span>Сдача объекта</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

        <div className="space-y-2">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="relative flex gap-5 pl-14"
            >
              {/* dot */}
              <div className={`absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2 transition-colors z-10 ${
                item.done
                  ? item.milestone
                    ? "bg-[#0066FF] border-[#0066FF] shadow-md shadow-blue-200"
                    : "bg-emerald-500 border-emerald-500"
                  : item.milestone
                    ? "bg-white border-[#0066FF] border-dashed"
                    : "bg-white border-gray-300"
              }`}>
                {item.done ? (
                  <CheckCircle2 className={`w-4 h-4 ${item.milestone ? "text-white" : "text-white"}`} />
                ) : (
                  <Circle className={`w-4 h-4 ${item.milestone ? "text-[#0066FF]" : "text-gray-300"}`} />
                )}
              </div>

              {/* content */}
              <div className={`flex-1 rounded-2xl p-5 mb-2 transition-colors ${
                item.done
                  ? item.milestone
                    ? "bg-blue-50 border border-blue-100"
                    : "bg-gray-50 border border-gray-100"
                  : "bg-white border border-dashed border-gray-200"
              }`}>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className={`font-bold ${item.done ? "text-gray-900" : "text-gray-400"}`}>
                    {item.title}
                    {item.milestone && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#0066FF] text-white">
                        Ключевой этап
                      </span>
                    )}
                  </h3>
                  <span className={`flex-shrink-0 text-sm font-semibold ${
                    item.done ? "text-[#0066FF]" : "text-gray-400"
                  }`}>{item.date}</span>
                </div>
                <p className={`text-sm leading-relaxed ${item.done ? "text-gray-600" : "text-gray-400"}`}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Photos section ─────────────────────────────────────────── */
function PhotosTab({ photoReports }: { photoReports: PhotoReport[] }) {
  const [activeMonth, setActiveMonth] = useState(photoReports[0]?.month ?? "");
  const [lightbox, setLightbox] = useState<{ src: string; idx: number } | null>(null);
  const report = photoReports.find((r) => r.month === activeMonth) ?? photoReports[0];

  // keyboard nav
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") {
        const next = (lightbox.idx + 1) % report.images.length;
        setLightbox({ src: report.images[next], idx: next });
      }
      if (e.key === "ArrowLeft") {
        const prev = (lightbox.idx - 1 + report.images.length) % report.images.length;
        setLightbox({ src: report.images[prev], idx: prev });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, report]);

  return (
    <div>
      {/* Month tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {photoReports.map((r) => (
          <button
            key={r.month}
            onClick={() => setActiveMonth(r.month)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              r.month === activeMonth
                ? "bg-[#0066FF] text-white shadow-md shadow-blue-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            {r.month}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMonth}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Report text */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 flex gap-3">
            <Building2 className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 leading-relaxed">{report.text}</p>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {report.images.map((src, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setLightbox({ src, idx })}
                className={`relative rounded-2xl overflow-hidden group ${
                  idx === 0 ? "col-span-2 row-span-2 aspect-[16/9]" : "aspect-video"
                }`}
              >
                <ImageWithFallback
                  src={src}
                  alt={`Фото ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {idx + 1} / {report.images.length}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* prev / next */}
            {report.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const prev = (lightbox.idx - 1 + report.images.length) % report.images.length;
                    setLightbox({ src: report.images[prev], idx: prev });
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = (lightbox.idx + 1) % report.images.length;
                    setLightbox({ src: report.images[next], idx: next });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.img
              key={lightbox.src}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={lightbox.src}
              alt="фото"
              className="max-h-[88vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightbox.idx + 1} / {report.images.length} · {report.month}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────── */
const TABS = [
  { id: "cameras",  label: "Онлайн-камеры", icon: Camera },
  { id: "timeline", label: "Хронология",    icon: Clock },
  { id: "photos",   label: "Фотоотчёты",    icon: ImageIcon },
] as const;

type TabId = typeof TABS[number]["id"];

export default function ConstructionDetail() {
  const { id } = useParams<{ id: string }>();
  const object = objectsData[id ?? "1"] ?? objectsData["1"];
  const [tab, setTab] = useState<TabId>("cameras");

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        breadcrumbs={[
          { label: "Главная", to: "/" },
          { label: "Ход строительства", to: "/construction" },
          { label: object.name },
        ]}
        title={object.name}
        subtitle={object.location}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#0066FF] rounded-full text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
              {object.status}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm">
              <Calendar className="w-3.5 h-3.5" />
              Сдача: {object.completionDate}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
              Готовность: <span className="text-[#0066FF] font-bold">{object.progress}%</span>
            </span>
          </div>
        }
      />

      {/* Прогресс-бар + описание */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed max-w-2xl">{object.description}</p>
            </div>
            <div className="md:flex-shrink-0 flex items-center gap-4 min-w-[220px]">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-500">Прогресс</span>
                  <span className="font-bold text-[#0066FF]">{object.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${object.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D9FF]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="container mx-auto px-4">
          <div className="flex gap-1 border-b border-transparent">
            {TABS.map(({ id: tid, label, icon: Icon }) => (
              <button
                key={tid}
                onClick={() => setTab(tid)}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors ${
                  tab === tid ? "text-[#0066FF]" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {tab === tid && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF] rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="container mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tab === "cameras"  && <CamerasTab cameras={object.cameras} />}
            {tab === "timeline" && <TimelineTab timeline={object.timeline} progress={object.progress} />}
            {tab === "photos"   && <PhotosTab photoReports={object.photoReports} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}