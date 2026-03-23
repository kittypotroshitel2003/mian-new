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
  Clock,
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
    title: "Рассрочка 0% на 2 года",
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
    name: "ЖК Южный Парк",
    location: "ЮЗАО",
    status: "Старт продаж",
    priceFrom: "от 6 200 000 ₽",
    completionDate: "2 кв. 2027",
    image: "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzcxMjM1MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    apartments: 156,
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
  { value: "16+", label: "Лет на рынке", icon: Award },
  { value: "25", label: "Сданных объектов", icon: Building2 },
  { value: "5000+", label: "Довольных семей", icon: Users },
  { value: "100%", label: "Юридическая чистота", icon: ShieldCheck },
];

const banks = [
  { id: 1, name: "Сбербанк", rate: 6.5, color: "bg-green-600" },
  { id: 2, name: "Совкомбанк", rate: 7.2, color: "bg-red-600" },
  { id: 3, name: "ВТБ", rate: 6.8, color: "bg-blue-700" },
];

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
              ? "border-[#0066FF] bg-blue-50 text-[#0066FF]"
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
          className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all ${
            selected === opt.label
              ? "border-[#0066FF] bg-blue-50 text-[#0066FF]"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          <span className="text-xl">{opt.icon}</span>
          <span className="text-xs font-medium">{opt.label}</span>
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
          <div className="flex justify-between text-sm text-blue-100 mb-2">
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
          <div className="flex justify-between text-xs text-blue-200 mt-1">
            <span>2 млн ₽</span><span>30 млн ₽</span>
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between text-sm text-blue-100 mb-2">
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
          <div className="flex justify-between text-xs text-blue-200 mt-1">
            <span>10%</span><span>80%</span>
          </div>
        </div>

        {/* Term */}
        <div>
          <div className="flex justify-between text-sm text-blue-100 mb-2">
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
          <div className="flex justify-between text-xs text-blue-200 mt-1">
            <span>1 год</span><span>30 лет</span>
          </div>
        </div>

        {/* Bank selector */}
        <div>
          <p className="text-sm text-blue-100 mb-2">Банк-партнёр</p>
          <div className="flex gap-2">
            {banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all ${
                  selectedBank.id === bank.id
                    ? "bg-white text-[#0066FF]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <div>{bank.name}</div>
                <div className={`text-xs ${selectedBank.id === bank.id ? "text-[#0066FF]" : "text-blue-200"}`}>
                  {bank.rate}%
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Ежемесячный платёж</p>
          <p className="text-3xl font-bold text-[#0066FF] mb-1">
            {formatPrice(monthlyPayment)}
          </p>
          <p className="text-xs text-gray-400">
            Кредит {formatPrice(loanAmount)} · {term} лет · {selectedBank.rate}% годовых
          </p>
          <Link
            href="/mortgage"
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity w-full justify-center"
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
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="max-w-2xl text-white"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] px-5 py-2.5 rounded-full mb-6 shadow-lg"
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
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
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
                      className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-transform hover:scale-105 shadow-xl"
                    >
                      <span className="relative z-10">Выбрать квартиру</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
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
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-2xl transition-all z-20 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-2xl transition-all z-20 group"
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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={countersStarted ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="font-bold bg-gradient-to-r from-[#0066FF] to-[#00D9FF] bg-clip-text text-transparent mb-2 text-[72px]">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium text-[24px]">{stat.label}</div>
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0066FF] rounded-full mb-4 font-medium"
              >
                <Building2 className="w-4 h-4" />
                Наши проекты
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900"
              >
                Выберите свою квартиру
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredObjects.map((object, index) => (
              <motion.div
                key={object.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <div className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 rounded-full text-sm font-semibold shadow-lg">
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
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Квартир в продаже</div>
                        <div className="font-bold text-gray-900">{object.apartments} шт</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Срок сдачи</div>
                        <div className="font-bold text-gray-900">{object.completionDate}</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00D9FF] bg-clip-text text-transparent">
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] via-[#0052CC] to-[#00D9FF]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 text-white"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Рассчитайте ипотеку онлайн
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

            {/* LEFT: heading column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 lg:sticky lg:top-28"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0066FF] rounded-full mb-6 font-medium">
                <MessageSquare className="w-4 h-4" />
                Ответы на вопросы
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Говорим<br />
                <span className="bg-gradient-to-r from-[#0066FF] to-[#00D9FF] bg-clip-text text-transparent">
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
                  <div key={s.label} className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</p>
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-7 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.02] transition-all"
              >
                <Phone className="w-4 h-4" />
                Задать свой вопрос
              </a>
            </motion.div>

            {/* RIGHT: accordion */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-3"
            >
              <FAQAccordion limit={4} showMoreLink="/faq" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation-form" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/40 via-transparent to-[#080f1f]/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1f] via-transparent to-transparent" />
              </div>

              {/* Decorative circle glow */}
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#0066FF]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#00D9FF]/10 rounded-full blur-3xl" />

              {/* TOP: badge + title */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full mb-8">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 text-sm font-medium">Онлайн — отвечаем прямо сейчас</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                  Получите<br />
                  <span className="bg-gradient-to-r from-[#0066FF] to-[#00D9FF] bg-clip-text text-transparent">
                    бесплатную
                  </span><br />
                  консультацию
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                  Подберём квартиру под ваш бюджет, расскажем об ипотеке и организуем показ в удобное время
                </p>
              </div>

              {/* BOTTOM: manager card */}
              <div className="relative z-10 flex items-center gap-5 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-8">
                <div className="relative flex-shrink-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1770199105692-9e52ff137cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNjI5MzEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Менеджер МИАН"
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#080f1f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-lg">Анна Соколова</p>
                  <p className="text-white/60 text-sm mt-0.5">Старший менеджер · 7 лет опыта</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:+74951234567" className="w-10 h-10 bg-[#0066FF] hover:bg-[#0052CC] rounded-xl flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — Form panel */}
            <div className="bg-white flex flex-col justify-center p-10 md:p-14">
              {/* Header */}
              <div className="mb-10">
                <p className="text-[#0066FF] font-semibold mb-2 text-sm tracking-wide uppercase">Заявка на консультацию</p>
                <h3 className="text-3xl font-bold text-gray-900 leading-snug">
                  Расскажите нам<br />о своих планах
                </h3>
              </div>

              <form className="space-y-5">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Телефон *</label>
                    <input
                      type="tel"
                      placeholder="+7 (900) 000-00-00"
                      className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Object selection as pills */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Интересующий объект</label>
                  <ObjectSelector />
                </div>

                {/* Interest type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Цель покупки</label>
                  <GoalSelector />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Комментарий</label>
                  <textarea
                    rows={3}
                    placeholder="Бюджет, пожелания по планировке, срок..."
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-gray-300"
                  />
                </div>

                {/* Privacy */}
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="privacy2" className="mt-0.5 w-4 h-4 accent-[#0066FF] cursor-pointer" />
                  <label htmlFor="privacy2" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="#" className="text-[#0066FF] hover:underline">политикой конфиденциальности</a>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-5 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                >
                  <Phone className="w-5 h-5" />
                  <span>Отправить заявку</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Footer note */}
                <div className="flex items-center justify-center gap-6 pt-2">
                  {[
                    { icon: Clock, text: "Ответим за 10 мин" },
                    { icon: ShieldCheck, text: "Данные защищены" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Icon className="w-3.5 h-3.5 text-[#0066FF]" />
                      {text}
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Interactive Map */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0066FF] rounded-full mb-4 font-medium shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              Карта объектов
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Найдите свой дом на карте
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InteractiveMap />
          </motion.div>
        </div>
      </section>
    </div>
  );
}