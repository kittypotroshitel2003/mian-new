'use client';

import {
  Building2, Award, Users, FileText, Shield,
  MapPin, ArrowRight, Briefcase, Clock, Send,
  Handshake, Newspaper, Calendar, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const BANNER_BG =
  "https://images.unsplash.com/photo-1765192366609-8bb81f6ebcdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGFwYXJ0bWVudCUyMGNvbXBsZXglMjBNb3Njb3clMjBhcmNoaXRlY3R1cmUlMjBuaWdodHxlbnwxfHx8fDE3NzI2OTU5MDF8MA&ixlib=rb-4.1.0&q=80&w=1920";

const HISTORY_IMG =
  "https://images.unsplash.com/photo-1721132537184-5494c01ed87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtJTIwYXJjaGl0ZWN0cyUyMGJsdWVwcmludHMlMjBwbGFubmluZyUyMG9mZmljZXxlbnwxfHx8fDE3NzI2OTY4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const achievements = [
  { icon: Building2, value: "25+",    label: "сданных объектов" },
  { icon: Users,    value: "5 000+",  label: "довольных семей" },
  { icon: Award,    value: "16 лет",  label: "на рынке" },
  { icon: Shield,   value: "100%",    label: "юридическая чистота" },
];

const vacancies = [
  { title: "Менеджер по продажам недвижимости", department: "Отдел продаж",       type: "Полная занятость",          location: "Офис",                 salary: "от 80 000 ₽",  hot: true  },
  { title: "Инженер-строитель",                 department: "Строительный отдел",  type: "Полная занятость",          location: "Офис / выезд на объект", salary: "от 120 000 ₽", hot: true  },
  { title: "Юрист по недвижимости",             department: "Юридический отдел",   type: "Полная занятость",          location: "Офис",                 salary: "от 100 000 ₽", hot: false },
  { title: "Ипотечный брокер",                  department: "Ипотечный отдел",     type: "Полная занятость",          location: "Офис",                 salary: "от 90 000 ₽",  hot: false },
  { title: "Маркетолог / SMM-специалист",       department: "Маркетинг",           type: "Полная занятость / удалённо", location: "Офис или удалённо",  salary: "от 70 000 ₽",  hot: false },
];

const timeline = [
  { year: "2010", text: "ООО МИАН основана группой опытных специалистов. Первый проект — малоэтажный жилой комплекс на 48 квартир." },
  { year: "2015", text: "Выход на московский рынок. Реализовано 10 объектов. Аккредитации в Сбербанке, ВТБ и Совкомбанке." },
  { year: "2020", text: "Переход на эскроу-счета по ФЗ-214. Запуск онлайн-кабинета для дольщиков. 5 000 довольных семей." },
  { year: "2026", text: "Сегодня МИАН — современная строительная компания с безупречной репутацией и 25+ сданными объектами." },
];

const news = [
  {
    id: 1,
    date: "15 февраля 2026",
    category: "Разрешение",
    categoryColor: "bg-green-100 text-green-700",
    title: "Получено разрешение на ввод ЖК «Северный» в эксплуатацию",
    excerpt: "Застройщик ООО МИАН успешно прошёл все проверки и получил официальное разрешение на ввод первой очереди ЖК «Северный» в эксплуатацию. Заселение начнётся в марте 2026 года.",
    image: "https://images.unsplash.com/photo-1735777192165-b58a5dd9a450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MjYyODQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    date: "1 марта 2026",
    category: "Старт продаж",
    categoryColor: "bg-blue-100 text-[#0066FF]",
    title: "Открыт старт продаж в ЖК «Южный Парк» — встречайте новый премиум-проект",
    excerpt: "Мы рады объявить о старте продаж квартир в новом жилом комплексе «Южный Парк» в ЮЗАО. Уникальная архитектура, развитая инфраструктура и панорамные виды.",
    image: "https://images.unsplash.com/photo-1768269378478-49d80e2320b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbmV3cyUyMGNvbnN0cnVjdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MjYyODQ4OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    date: "20 февраля 2026",
    category: "Ипотека",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "Сбербанк снизил ставку по семейной ипотеке для покупателей МИАН до 6%",
    excerpt: "ООО МИАН совместно со Сбербанком запускают специальную программу семейной ипотеки по ставке от 6% годовых для всех покупателей квартир в наших жилых комплексах.",
    image: "https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcyNjE2MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export default function About() {
  const [partnerForm, setPartnerForm] = useState({ company: "", name: "", phone: "", email: "", type: "", message: "" });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setPartnerForm({ company: "", name: "", phone: "", email: "", type: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ══ БАННЕР ══════════════════════════════════════════════════════ */}
      <section
        className="relative h-[480px] flex items-center"
        style={{ backgroundImage: `url(${BANNER_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Оверлеи */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Синяя полоса-акцент слева */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#0066FF] to-[#00D9FF]" />

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              {/* Хлебные крошки */}
              <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
                <Link href="/" className="hover:text-white transition-colors">Главная</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/80">О компании</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
                <Building2 className="w-4 h-4 text-[#00D9FF]" />
                <span className="text-white/90 font-medium text-sm">Основана в 2010 году</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
                О компании<br />
                <span className="bg-gradient-to-r from-[#0066FF] to-[#00D9FF] bg-clip-text text-transparent">
                  ООО МИАН
                </span>
              </h1>
              <p className="text-xl text-white/75 leading-relaxed">
                Мы создаём комфортное и качественное жильё для семей. Наша миссия — сделать покупку новой квартиры простой, прозрачной и выгодной.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ ДОСТИЖЕНИЯ ══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex flex-col items-center py-8 px-4 text-center"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-[#0066FF]" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                <span className="text-sm text-gray-500 mt-1">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ИСТОРИЯ КОМПАНИИ ════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Изображение */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ height: "520px" }}>
                <ImageWithFallback
                  src={HISTORY_IMG}
                  alt="Команда МИАН"
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4">
                    <p className="text-white font-semibold">Команда МИАН</p>
                    <p className="text-white/70 text-sm">Более 200 специалистов</p>
                  </div>
                </div>
              </div>

              {/* Бейдж «лет на рынке» */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-br from-[#0066FF] to-[#00D9FF] rounded-2xl p-5 shadow-xl text-white text-center w-28">
                <p className="text-3xl font-bold">16</p>
                <p className="text-xs text-white/80 mt-1">лет на рынке</p>
              </div>

              {/* Бейдж «объектов» */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">25+ объектов</p>
                  <p className="text-xs text-gray-500">успешно сдано</p>
                </div>
              </div>
            </motion.div>

            {/* Таймлайн */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:pl-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0066FF] rounded-full mb-5 font-medium">
                <Clock className="w-4 h-4" />
                С 2010 года
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-10">
                История компании
              </h2>

              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D9FF] flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-100">
                        <span className="text-white text-xs font-bold">{item.year}</span>
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-[#0066FF]/25 to-transparent my-1" style={{ minHeight: "32px" }} />
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed pb-7 pt-2.5">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ ЛИЦЕНЗИИ И СЕРТИФИКАТЫ ══════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0066FF] rounded-full mb-5 font-medium">
              <FileText className="w-4 h-4" />
              Документы
            </div>
            <h2 className="text-4xl font-bold mb-3">Лицензии и сертификаты</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Вся наша деятельность лицензирована и соответствует требованиям законодательства РФ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Лицензия на строительство", sub: "№ СРО-123456" },
              { title: "Сертификат ISO 9001",        sub: "Система менеджмента качества" },
              { title: "Членство в СРО",             sub: "Саморегулируемая организация" },
            ].map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-24 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="font-semibold mb-1 text-gray-900">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ВАКАНСИИ ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0066FF] rounded-full mb-4 font-medium">
              <Briefcase className="w-4 h-4" />
              Карьера в МИАН
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Вакансии</h2>
                <p className="text-gray-500 mt-2 text-lg">Присоединяйтесь к команде — строим будущее вместе</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {vacancies.length} открытых позиций
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            {vacancies.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#0066FF]/20 hover:shadow-md rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 transition-all cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#0066FF] transition-colors">{v.title}</h3>
                    {v.hot && (
                      <span className="px-2.5 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                        Горячая вакансия
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{v.department}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{v.type}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{v.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-bold text-gray-900">{v.salary}</span>
                  <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#0066FF] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Резюме CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 bg-gradient-to-r from-[#0066FF]/5 to-[#00D9FF]/5 border border-[#0066FF]/10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="font-semibold text-gray-900">Не нашли подходящую вакансию?</p>
              <p className="text-sm text-gray-500 mt-0.5">Отправьте резюме — рассмотрим при появлении новых позиций</p>
            </div>
            <a
              href="mailto:hr@mian.ru"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.02] transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
              Отправить резюме
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ ПАРТНЁРАМ ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-5"
          >
            {/* Левая синяя панель */}
            <div className="lg:col-span-2 relative flex flex-col justify-between p-10 bg-gradient-to-br from-[#0066FF] to-[#0052CC] overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#00D9FF]/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
                  <Handshake className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                  Стать партнёром МИАН
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Сотрудничаем с агентствами недвижимости, банками, подрядчиками и поставщиками материалов
                </p>
              </div>
              <div className="relative z-10 space-y-3 mt-10">
                {["Агентства недвижимости", "Банки и финансовые организации", "Строительные подрядчики", "Поставщики материалов"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div className="lg:col-span-3 bg-white p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Оставьте заявку</h3>
              <p className="text-gray-500 mb-7">Наш менеджер свяжется с вами в течение рабочего дня</p>
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Компания *</label>
                    <input type="text" value={partnerForm.company} onChange={(e) => setPartnerForm({ ...partnerForm, company: e.target.value })} placeholder="ООО Название" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Контактное лицо *</label>
                    <input type="text" value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} placeholder="Иван Иванов" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Телефон *</label>
                    <input type="tel" value={partnerForm.phone} onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })} placeholder="+7 (900) 000-00-00" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email *</label>
                    <input type="email" value={partnerForm.email} onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })} placeholder="partner@company.ru" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Тип сотрудничества</label>
                  <select value={partnerForm.type} onChange={(e) => setPartnerForm({ ...partnerForm, type: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all text-gray-700">
                    <option value="">Выберите вариант</option>
                    <option>Агентство недвижимости</option>
                    <option>Банк / финансовая организация</option>
                    <option>Строительный подрядчик</option>
                    <option>Поставщик материалов</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Комментарий</label>
                  <textarea value={partnerForm.message} onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })} rows={3} placeholder="Расскажите о предложении..." className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-gray-300" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Отправить заявку на партнёрство
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ НОВОСТИ ═════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0066FF] rounded-full mb-4 font-medium">
                <Newspaper className="w-4 h-4" />
                Актуально
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Новости компании</h2>
            </div>
            <Link href="/" className="hidden md:inline-flex items-center gap-2 text-[#0066FF] font-semibold hover:gap-3 transition-all group">
              Все новости
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative overflow-hidden" style={{ height: "210px" }}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ display: "block" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${item.categoryColor}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#0066FF] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{item.excerpt}</p>
                  <button className="inline-flex items-center gap-2 text-[#0066FF] font-semibold text-sm hover:gap-3 transition-all group/link">
                    Читать далее
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-5">Хотите стать частью нашей истории?</h2>
            <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
              Выберите квартиру в одном из наших жилых комплексов и станьте владельцем качественного и комфортного жилья
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/objects" className="bg-white text-[#0066FF] hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold transition-colors inline-flex items-center gap-2 justify-center">
                Посмотреть объекты
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/" className="border-2 border-white/40 hover:border-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition-all inline-flex items-center gap-2 justify-center">
                Получить консультацию
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
