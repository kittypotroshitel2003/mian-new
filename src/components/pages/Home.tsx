'use client';

import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  MapPin, 
  Calculator, 
  MessageSquare, 
  Phone,
  Award,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Check,
  Minus,
  Plus
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import InteractiveMap from "../InteractiveMap";
import PopularApartments from "../PopularApartments";
import SpecialOffers from "../SpecialOffers";
import AdditionalServices from "../AdditionalServices";
import NewsSection from "../NewsSection";
import FAQAccordion from "../FAQAccordion";

const promotions = [
  {
    id: 1,
    title: "Рассрочка 0% на 2\u00a0года",
    description: "Приобретайте квартиру в ЖК 'Северный' без переплаты",
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTIxNzg4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: "0%",
    tag: "Выгодно",
  },
  {
    id: 2,
    title: "Скидка в день показа 5%",
    description: "Запишитесь на экскурсию и получите дополнительную скидку",
    image: "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzcxMjM1MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: "5%",
    tag: "Акция",
  },
  {
    id: 3,
    title: "Для медиков, бюджетников и госслужащих",
    description: "Специальные условия покупки с дополнительными льготами",
    image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEyMTQ0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: "До 7%",
    tag: "Льготы",
  },
];

const featuredObjects = [
  {
    id: 1,
    name: "ЖК Северный",
    location: "САО",
    status: "Строится",
    priceFrom: "от 5 500 000 ₽",
    completionDate: "4 кв. 2026",
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTIxNzg4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 234,
  },
  {
    id: 2,
    name: "ЖК Центральный Двор",
    location: "просп. В.И. Ленина, 31",
    status: "Старт продаж",
    priceFrom: "от 3 700 000 ₽",
    completionDate: "2 кв. 2027",
    image: "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzcxMjM1MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 437,
  },
  {
    id: 3,
    name: "ЖК Восточный Берег",
    location: "ВАО",
    status: "Строится",
    priceFrom: "от 4 800 000 ₽",
    completionDate: "3 кв. 2026",
    image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEyMTQ0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 189,
  },
];

const stats = [
  { num: 16, suffix: "+", label: "Лет на рынке", icon: Award },
  { num: 25, suffix: "", label: "Сданных объектов", icon: Building2 },
  { num: 5000, suffix: "+", label: "Довольных семей", icon: Users },
  { num: 100, suffix: "%", label: "Юридическая чистота", icon: ShieldCheck },
];

const banks = [
  { id: 1, name: "Сбербанк", rate: 6.5, color: "bg-green-600" },
  { id: 2, name: "Совкомбанк", rate: 7.2, color: "bg-red-600" },
  { id: 3, name: "ВТБ", rate: 6.8, color: "bg-[#363E62]" },
];

function useCounter(target: number, started: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let rafId: number;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) { rafId = requestAnimationFrame(step); }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);
  return count;
}

function StatCounter({ num, suffix, started }: { num: number; suffix: string; started: boolean }) {
  const count = useCounter(num, started);
  return <>{count.toLocaleString("ru-RU")}{suffix}</>;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₽";
}

function ObjectSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const options = ["ЖК Северный", "ЖК Южный Парк", "ЖК Восточный Берег", "Не определился"];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setSelected(opt)}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
            selected === opt
              ? "border-[#363E62] bg-[#363E62]/10 text-[#363E62]"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function GoalSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    { label: "Для жизни", icon: "🏠" },
    { label: "Инвестиции", icon: "📈" },
    { label: "Семье", icon: "👨‍👩‍👧" },
    { label: "Аренда", icon: "🔑" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => setSelected(opt.label)}
          className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border-2 transition-all ${
            selected === opt.label
              ? "border-[#363E62] bg-[#363E62]/10 text-[#363E62]"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          <span className="text-lg">{opt.icon}</span>
          <span className="text-[10px] sm:text-xs font-medium leading-tight text-center">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function MiniMortgageCalculator() {
  const [price, setPrice] = useState(6000000);
  const [downPayment, setDownPayment] = useState(1500000);
  const [term, setTerm] = useState(20);
  const [selectedBank, setSelectedBank] = useState(banks[0]);

  const loanAmount = Math.max(price - downPayment, 0);
  const monthlyRate = selectedBank.rate / 100 / 12;
  const numberOfPayments = term * 12;
  const monthlyPayment =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : 0;

  const downPaymentPercent = Math.round((downPayment / price) * 100);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
      <div className="space-y-5">
        {/* Price */}
        <div>
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Стоимость квартиры</span>
            <span className="font-semibold text-white">{formatPrice(price)}</span>
          </div>
          <input
            type="range"
            min="2000000"
            max="30000000"
            step="100000"
            value={price}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPrice(val);
              if (downPayment > val * 0.8) setDownPayment(Math.round(val * 0.2));
            }}
            className="w-full h-2 rounded-full appearance-none cursor-pointer white-thumb"
            style={{
              background: `linear-gradient(to right, #fff ${((price - 2000000) / (30000000 - 2000000)) * 100}%, rgba(255,255,255,0.3) ${((price - 2000000) / (30000000 - 2000000)) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>2 млн ₽</span><span>30 млн ₽</span>
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Первоначальный взнос ({downPaymentPercent}%)</span>
            <span className="font-semibold text-white">{formatPrice(downPayment)}</span>
          </div>
          <input
            type="range"
            min={Math.round(price * 0.1)}
            max={Math.round(price * 0.8)}
            step="50000"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer white-thumb"
            style={{
              background: `linear-gradient(to right, #fff ${((downPayment - price * 0.1) / (price * 0.7)) * 100}%, rgba(255,255,255,0.3) ${((downPayment - price * 0.1) / (price * 0.7)) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>10%</span><span>80%</span>
          </div>
        </div>

        {/* Term */}
        <div>
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Срок кредита</span>
            <span className="font-semibold text-white">{term} лет</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTerm((t) => Math.max(1, t - 1))}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Minus className="w-3.5 h-3.5 text-white" />
            </button>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #fff ${((term - 1) / 29) * 100}%, rgba(255,255,255,0.3) ${((term - 1) / 29) * 100}%)`,
              }}
            />
            <button
              onClick={() => setTerm((t) => Math.min(30, t + 1))}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>1 год</span><span>30 лет</span>
          </div>
        </div>

        {/* Bank selector */}
        <div>
          <p className="text-sm text-white/80 mb-2">Банк-партнёр</p>
          <div className="flex gap-2">
            {banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all ${
                  selectedBank.id === bank.id
                    ? "bg-white text-[#363E62]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <div>{bank.name}</div>
                <div className={`text-xs ${selectedBank.id === bank.id ? "text-[#363E62]" : "text-white/60"}`}>
                  {bank.rate}%
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Ежемесячный платёж</p>
          <p className="text-3xl font-bold text-[#363E62] mb-1">
            {formatPrice(monthlyPayment)}
          </p>
          <p className="text-xs text-gray-400">
            Кредит {formatPrice(loanAmount)} · {term} лет · {selectedBank.rate}% годовых
          </p>
          <Link
            href="/mortgage"
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity w-full justify-center"
          >
            Полный расчёт
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);

  // Форма консультации
  const [consultForm, setConsultForm] = useState({ name: "", phone: "", comment: "", privacyChecked: false });
  const [consultErrors, setConsultErrors] = useState<{ phone?: string; privacy?: string }>({});
  const [consultStatus, setConsultStatus] = useState<"idle" | "success">("idle");

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { phone?: string; privacy?: string } = {};
    const phone = consultForm.phone.trim();
    if (!phone) {
      errors.phone = "Укажите номер телефона";
    } else if (!/^\+?[\d\s\-\(\)]{10,16}$/.test(phone)) {
      errors.phone = "Введите корректный номер";
    }
    if (!consultForm.privacyChecked) {
      errors.privacy = "Необходимо согласие с политикой конфиденциальности";
    }
    if (Object.keys(errors).length > 0) {
      setConsultErrors(errors);
      return;
    }
    setConsultErrors({});
    // TODO: подключить backend (Telegram Bot / Supabase / email-сервис)
    setConsultStatus("success");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById("stats-section");
      if (statsSection && !countersStarted) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setCountersStarted(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [countersStarted]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={promotions[currentSlide].image}
              alt={promotions[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="max-w-2xl text-white"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] px-5 py-2.5 rounded-full mb-6 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">{promotions[currentSlide].tag}</span>
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
                      {promotions[currentSlide].discount}
                    </span>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-6xl font-bold mb-6 leading-tight"
                  >
                    {promotions[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl mb-8 text-gray-200"
                  >
                    {promotions[currentSlide].description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      href="/objects"
                      className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all hover:opacity-90 shadow-xl"
                    >
                      <span className="relative z-10">Выбрать квартиру</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#363E62] to-[#232840] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <button
                      onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border-2 border-white/20 hover:bg-white/20 transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Получить консультацию</span>
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-2xl transition-all z-20 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-2xl transition-all z-20 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide
                  ? "bg-white w-12 h-2"
                  : "bg-white/40 hover:bg-white/60 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="relative -mt-24 z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={countersStarted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="font-bold bg-gradient-to-r from-[#363E62] to-[#232840] bg-clip-text text-transparent mb-2 text-[40px] md:text-[72px] tabular-nums">
                    <StatCounter num={stat.num} suffix={stat.suffix} started={countersStarted} />
                  </div>
                  <div className="text-gray-600 font-medium text-[14px] md:text-[24px]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Objects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#363E62]/10 text-[#363E62] rounded-full mb-4 font-medium"
              >
                <Building2 className="w-4 h-4" />
                Наши проекты
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                className="text-4xl md:text-5xl font-bold text-[#363E62]"
              >
                Выберите свою квартиру
              </motion.h2>
            </div>
            <Link
              href="/objects"
              className="hidden md:inline-flex items-center gap-2 text-[#363E62] hover:gap-3 transition-all font-semibold group"
            >
              <span>Смотреть все</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredObjects.map((object, index) => (
              <motion.div
                key={object.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ delay: index * 0.1 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="px-4 py-2 bg-black/45 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                        {object.status}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-5 h-5 text-[#363E62]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-[#363E62] group-hover:text-[#363E62] transition-colors">
                      {object.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-6">
                      <MapPin className="w-4 h-4 text-[#363E62]" />
                      <span>{object.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Квартир в продаже</div>
                        <div className="font-bold text-[#363E62]">{object.apartments} шт</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Срок сдачи</div>
                        <div className="font-bold text-[#363E62]">{object.completionDate}</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#363E62] to-[#232840] bg-clip-text text-transparent">
                      {object.priceFrom}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/objects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <span>Смотреть все объекты</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Apartments */}
      <PopularApartments />

      {/* Mortgage Calculator CTA with inline calculator */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#363E62] via-[#232840] to-[#1a1f35]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              className="flex-1 text-white"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Рассчитайте ипотеку онлайн
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Узнайте ежемесячный платёж и подберите оптимальные условия от наших банков-партнёров
              </p>
              <ul className="space-y-4 mb-8">
                {["Сбербанк — от 6.5%", "Совкомбанк — от 7.2%", "ВТБ — от 6.8%"].map((bank) => (
                  <li key={bank} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-lg">{bank}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/mortgage"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Открыть полный калькулятор
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right: Mini Calculator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              className="flex-1 w-full"
            >
              <MiniMortgageCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <SpecialOffers />

      {/* Additional Services */}
      <AdditionalServices />

      {/* FAQ — Говорим открыто */}
      <section className="py-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

            {/* LEFT: heading column */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              className="lg:col-span-2 lg:sticky lg:top-28"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#363E62]/10 text-[#363E62] rounded-full mb-6 font-medium">
                <MessageSquare className="w-4 h-4" />
                Ответы на вопросы
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#363E62] leading-tight mb-6">
                Говорим<br />
                <span className="bg-gradient-to-r from-[#363E62] to-[#232840] bg-clip-text text-transparent">
                  открыто
                </span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                Собрали самые частые вопросы покупателей — отвечаем честно и без лишних слов
              </p>

              {/* Stat strip */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { value: "5 000+", label: "сделок закрыто" },
                  { value: "16 лет", label: "на рынке" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5">
                    <p className="text-2xl font-bold text-[#363E62] mb-0.5">{s.value}</p>
                    <p className="text-sm text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="#consultation-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-7 py-4 rounded-2xl font-semibold shadow-lg shadow-[#363E62]/15 hover:shadow-[#363E62]/20 hover:opacity-90 transition-all"
              >
                <Phone className="w-4 h-4" />
                Задать свой вопрос
              </a>
            </motion.div>

            {/* RIGHT: accordion */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              className="lg:col-span-3 space-y-3"
            >
              <FAQAccordion limit={4} showMoreLink="/faq" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation-form" className="py-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 min-h-[680px]"
          >
            {/* LEFT — Visual panel */}
            <div className="relative flex flex-col justify-between p-10 md:p-14 overflow-hidden bg-[#080f1f]">
              {/* Background image */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758448617677-2f8bebc56d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGx1eHVyeSUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzcyNjI5MzEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="ЖК МИАН"
                  className="w-full h-full object-cover opacity-30"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#363E62]/40 via-transparent to-[#080f1f]/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1f] via-transparent to-transparent" />
              </div>

              {/* Decorative circle glow */}
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#363E62]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#363E62]/10 rounded-full blur-3xl" />

              {/* TOP: badge + title */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full mb-8">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 text-sm font-medium">Онлайн — отвечаем прямо сейчас</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                  Получите<br />
                  <span className="text-white">
                    бесплатную
                  </span><br />
                  консультацию
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                  Подберём квартиру под ваш бюджет, расскажем об ипотеке и организуем показ в удобное время
                </p>
              </div>

              {/* BOTTOM: manager card */}
              <div className="relative z-10 flex items-stretch gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mt-8">
                <div className="relative flex-shrink-0 self-start">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1770199105692-9e52ff137cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNjI5MzEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Менеджер МИАН"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#080f1f]" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="text-white font-bold text-base leading-tight">Анна Соколова</p>
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
            <div className="bg-white flex flex-col justify-center p-10 md:p-14">
              {consultStatus === "success" ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#363E62]/10 flex items-center justify-center">
                    <Phone className="w-7 h-7 text-[#363E62]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#363E62] mb-2">Спасибо за интерес!</h3>
                    <p className="text-gray-500 leading-relaxed max-w-sm">
                      Онлайн-обработка заявок пока не подключена. Позвоните нам — специалист ответит прямо сейчас.
                    </p>
                  </div>
                  <a
                    href="tel:+74951234567"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-7 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    +7 (495) 123-45-67
                  </a>
                  <button
                    onClick={() => { setConsultStatus("idle"); setConsultForm({ name: "", phone: "", comment: "", privacyChecked: false }); }}
                    className="text-sm text-gray-400 hover:text-[#363E62] transition-colors"
                  >
                    Заполнить снова
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-8">
                    <p className="text-[#363E62] font-semibold mb-2 text-sm tracking-wide uppercase">Заявка на консультацию</p>
                    <h3 className="text-3xl font-bold text-[#363E62] leading-snug">
                      Расскажите нам<br />о своих планах
                    </h3>
                  </div>

                  <form onSubmit={handleConsultSubmit} className="space-y-5" noValidate>
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ваше имя</label>
                        <input
                          type="text"
                          value={consultForm.name}
                          onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                          placeholder="Иван Иванов"
                          className="w-full px-5 py-4 bg-[#f5f5f5] rounded-2xl border-2 border-transparent focus:border-[#363E62] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Телефон <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={consultForm.phone}
                          onChange={(e) => { setConsultForm({ ...consultForm, phone: e.target.value }); setConsultErrors({ ...consultErrors, phone: undefined }); }}
                          placeholder="+7 (900) 000-00-00"
                          className={`w-full px-5 py-4 bg-[#f5f5f5] rounded-2xl border-2 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 ${consultErrors.phone ? "border-red-400 bg-red-50" : "border-transparent focus:border-[#363E62]"}`}
                        />
                        {consultErrors.phone && (
                          <p className="mt-1.5 text-xs text-red-500">{consultErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Object selection */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Интересующий объект</label>
                      <ObjectSelector />
                    </div>

                    {/* Goal */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Цель покупки</label>
                      <GoalSelector />
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Комментарий</label>
                      <textarea
                        value={consultForm.comment}
                        onChange={(e) => setConsultForm({ ...consultForm, comment: e.target.value })}
                        rows={3}
                        placeholder="Бюджет, пожелания по планировке, срок..."
                        className="w-full px-5 py-4 bg-[#f5f5f5] rounded-2xl border-2 border-transparent focus:border-[#363E62] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-gray-300"
                      />
                    </div>

                    {/* Privacy */}
                    <div>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consult-privacy"
                          checked={consultForm.privacyChecked}
                          onChange={(e) => { setConsultForm({ ...consultForm, privacyChecked: e.target.checked }); setConsultErrors({ ...consultErrors, privacy: undefined }); }}
                          className="mt-0.5 w-4 h-4 accent-[#363E62] cursor-pointer"
                        />
                        <label htmlFor="consult-privacy" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                          Я согласен(а) с{" "}
                          <a href="/privacy" className="text-[#363E62] hover:underline">политикой конфиденциальности</a>
                        </label>
                      </div>
                      {consultErrors.privacy && (
                        <p className="mt-1.5 text-xs text-red-500 pl-7">{consultErrors.privacy}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full relative overflow-hidden bg-gradient-to-r from-[#363E62] to-[#232840] text-white px-8 py-5 rounded-2xl font-bold shadow-lg shadow-[#363E62]/20 hover:shadow-[#363E62]/30 hover:opacity-90 transition-all flex items-center justify-center gap-3 group"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Отправить заявку</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Footer note — честный */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#363E62]" />
                      <span className="text-xs text-gray-400">Данные защищены согласно 152-ФЗ</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Interactive Map */}
      <section className="py-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#363E62] rounded-full mb-4 font-medium shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              Карта объектов
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              className="text-4xl md:text-5xl font-bold text-[#363E62]"
            >
              Найдите свой дом на карте
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          >
            <InteractiveMap />
          </motion.div>
        </div>
      </section>
    </div>
  );
}