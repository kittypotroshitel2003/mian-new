'use client';

import { Calendar, Image as ImageIcon, Camera, ChevronDown, ArrowRight, Building2, Wifi } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PageHeader } from "../PageHeader";

const BANNER_BG =
  "https://images.unsplash.com/photo-1763911937217-a0b47fc7f699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwY3JhbmUlMjBidWlsZGluZyUyMG1vZGVybiUyMHJlc2lkZW50aWFsfGVufDF8fHx8MTc3MjY5Nzc4Mnww&ixlib=rb-4.1.0&q=80&w=1920";

/* ─── camera preview images ─────────────────────────────── */
const CAM_IMGS = {
  crane:    "https://images.unsplash.com/photo-1771433053449-d14881091839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  scaffold: "https://images.unsplash.com/photo-1772551419343-6416fad2593c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  aerial:   "https://images.unsplash.com/photo-1679859714566-8bd38006794e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  interior: "https://images.unsplash.com/photo-1768321910101-bdf80fb1ec56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  workers:  "https://images.unsplash.com/photo-1769284013173-47150b8c7e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  site:     "https://images.unsplash.com/photo-1766595680977-fd4818afa337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
};

const constructionReports = [
  {
    id: 1, objectId: "1", objectName: "ЖК Северный",
    date: "Февраль 2026", progress: 75,
    description: "Завершены работы по возведению 15 этажа. Начат монтаж фасадных конструкций.",
    images: [CAM_IMGS.crane, CAM_IMGS.scaffold, CAM_IMGS.aerial],
    cameras: [
      { id: 1, name: "Главный фасад",     preview: CAM_IMGS.crane,    online: true  },
      { id: 2, name: "Западный угол",     preview: CAM_IMGS.scaffold, online: true  },
      { id: 3, name: "Аэрообзор",         preview: CAM_IMGS.aerial,   online: true  },
      { id: 4, name: "Внутренние работы", preview: CAM_IMGS.interior, online: false },
    ],
  },
  {
    id: 2, objectId: "2", objectName: "ЖК Южный Парк",
    date: "Февраль 2026", progress: 45,
    description: "Завершены подземные работы. Начато возведение надземной части здания.",
    images: [CAM_IMGS.scaffold, CAM_IMGS.workers],
    cameras: [
      { id: 1, name: "Главный фасад", preview: CAM_IMGS.scaffold, online: true },
      { id: 2, name: "Кран А",        preview: CAM_IMGS.crane,    online: true },
      { id: 3, name: "Территория",    preview: CAM_IMGS.aerial,   online: true },
      { id: 4, name: "Подземный Б1",  preview: CAM_IMGS.interior, online: true },
    ],
  },
  {
    id: 3, objectId: "3", objectName: "ЖК Восточный Берег",
    date: "Февраль 2026", progress: 60,
    description: "Завершены работы по монтажу кровли. Ведутся внутренние отделочные работы.",
    images: [CAM_IMGS.aerial, CAM_IMGS.scaffold, CAM_IMGS.interior],
    cameras: [
      { id: 1, name: "Набережная",   preview: CAM_IMGS.aerial,   online: true  },
      { id: 2, name: "Главный вход", preview: CAM_IMGS.crane,    online: true  },
      { id: 3, name: "Кровля",       preview: CAM_IMGS.site,     online: true  },
      { id: 4, name: "Лоджии",       preview: CAM_IMGS.scaffold, online: false },
    ],
  },
  {
    id: 4, objectId: "4", objectName: "ЖК Западные Ворота",
    date: "Февраль 2026", progress: 30,
    description: "Завершены работы по устройству фундамента. Начато возведение первого этажа.",
    images: [CAM_IMGS.workers],
    cameras: [
      { id: 1, name: "Котлован",  preview: CAM_IMGS.workers, online: true  },
      { id: 2, name: "Кран",      preview: CAM_IMGS.crane,   online: true  },
      { id: 3, name: "Фундамент", preview: CAM_IMGS.site,    online: false },
      { id: 4, name: "Панорама",  preview: CAM_IMGS.aerial,  online: true  },
    ],
  },
];

function MiniCameraWidget({
  cameras,
  objectId,
}: {
  cameras: typeof constructionReports[0]["cameras"];
  objectId: string;
}) {
  const [active, setActive] = useState(cameras[0].id);
  const selected = cameras.find((c) => c.id === active) ?? cameras[0];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-6 pt-2">
        <div className="bg-gray-950 rounded-2xl overflow-hidden">
          <div className="relative aspect-video">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={selected.preview}
                  alt={selected.name}
                  className="w-full h-full object-cover opacity-90"
                  style={{ display: "block" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 z-10">
              {selected.online ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-xs font-bold tracking-wider">LIVE</span>
                </>
              ) : (
                <span className="text-gray-400 text-xs font-bold">OFFLINE</span>
              )}
            </div>
            <div className="absolute bottom-3 left-3 z-10">
              <p className="text-white/50 text-[10px] uppercase tracking-widest">Камера</p>
              <p className="text-white font-semibold text-sm">{selected.name}</p>
            </div>
            <Link
              href={`/construction/${objectId}`}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#363E62] hover:bg-[#232840] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors z-10"
            >
              <Camera className="w-3 h-3" />
              Все камеры
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-px bg-gray-800 p-px">
            {cameras.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setActive(cam.id)}
                className={`relative aspect-video overflow-hidden transition-all ${
                  cam.id === active ? "ring-2 ring-inset ring-[#363E62]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <ImageWithFallback
                  src={cam.preview}
                  alt={cam.name}
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
                <div className="absolute inset-0 bg-black/30" />
                <span className={`absolute top-1 left-1 w-1.5 h-1.5 rounded-full ${cam.online ? "bg-red-500 animate-pulse" : "bg-white0"}`} />
                <p className="absolute bottom-1 left-0 right-0 text-center text-white text-[9px] truncate px-1 drop-shadow">{cam.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Construction() {
  const [selectedObject, setSelectedObject] = useState("all");
  const [openCamera, setOpenCamera] = useState<number | null>(null);

  const objects = ["all", ...Array.from(new Set(constructionReports.map((r) => r.objectName)))];
  const filteredReports = constructionReports.filter(
    (r) => selectedObject === "all" || r.objectName === selectedObject
  );

  return (
    <div className="bg-white min-h-screen">

      <PageHeader
        breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Ход строительства" }]}
        title="Ход строительства"
        subtitle="Онлайн-камеры, фотоотчёты и хронология — следите за стройкой в реальном времени"
        badge={
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#363E62]/10 text-[#363E62] rounded-full text-sm font-medium">
            <Building2 className="w-4 h-4" />
            Строим открыто
          </div>
        }
      />

      {/* ══ КОНТЕНТ ══════════════════════════════════════════════════════ */}
      <div className="py-14">
        <div className="container mx-auto px-4">

          {/* Фильтр объектов */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {objects.map((obj) => (
              <button
                key={obj}
                onClick={() => setSelectedObject(obj)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  selectedObject === obj
                    ? "bg-[#363E62] text-white shadow-md shadow-[#363E62]/20"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {obj === "all" ? "Все объекты" : obj}
              </button>
            ))}
          </div>

          {/* Карточки отчётов */}
          <div className="space-y-6">
            {filteredReports.map((report, idx) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Шапка карточки */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div>
                      <h2 className="text-2xl font-bold text-[#363E62] mb-1.5">{report.objectName}</h2>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Готовность</div>
                      <div className="flex items-center gap-3">
                        <div className="w-36 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${report.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-[#363E62] to-[#232840]"
                          />
                        </div>
                        <span className="font-bold text-[#363E62]">{report.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-5">{report.description}</p>

                  {/* Полоска фотографий */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {report.images.map((img, i) => (
                      <div key={i} className="flex-shrink-0 w-28 rounded-xl overflow-hidden" style={{ height: "80px" }}>
                        <ImageWithFallback
                          src={img}
                          alt={`фото ${i + 1}`}
                          className="w-full h-full object-cover"
                          style={{ display: "block" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Виджет камер */}
                <AnimatePresence>
                  {openCamera === report.id && (
                    <MiniCameraWidget cameras={report.cameras} objectId={report.objectId} />
                  )}
                </AnimatePresence>

                {/* Нижняя панель */}
                <div className="bg-white px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100">
                  <button
                    onClick={() => setOpenCamera(openCamera === report.id ? null : report.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      openCamera === report.id
                        ? "bg-[#363E62] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#363E62] hover:text-[#363E62]"
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    {openCamera === report.id ? "Скрыть камеры" : "Камеры онлайн"}
                    <span className="flex items-center">
                      {report.cameras.filter((c) => c.online).length}
                      <Wifi className="w-3 h-3 ml-1" />
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openCamera === report.id ? "rotate-180" : ""}`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <ImageIcon className="w-4 h-4" />
                      {report.images.length} фото
                    </div>
                    <Link
                      href={`/construction/${report.objectId}`}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-md hover:shadow-[#363E62]/15 hover:opacity-90 transition-all"
                    >
                      Смотреть
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Пусто */}
            {filteredReports.length === 0 && (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Отчёты не найдены</h3>
                <button
                  onClick={() => setSelectedObject("all")}
                  className="mt-4 bg-[#363E62] hover:bg-[#232840] text-white px-6 py-2.5 rounded-xl transition-colors font-semibold"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            className="mt-12 bg-gradient-to-r from-[#363E62] to-[#232840] text-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-3">Хотите посетить стройплощадку?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Запишитесь на экскурсию и своими глазами убедитесь в качестве строительства
            </p>
            <button className="bg-white text-[#363E62] hover:bg-[#363E62]/10 px-8 py-4 rounded-2xl font-bold transition-colors shadow-lg">
              Записаться на экскурсию
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}