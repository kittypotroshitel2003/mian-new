'use client';

import { Calculator, TrendingDown, Building2, Phone, Send } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { PageHeader } from "../PageHeader";

const banks = [
  { id: 1, name: "Сбербанк",    rate: 6.5, color: "#21A038" },
  { id: 2, name: "Совкомбанк",  rate: 7.2, color: "#FF0000" },
  { id: 3, name: "ВТБ",         rate: 6.8, color: "#003087" },
  { id: 4, name: "Альфа-Банк",  rate: 7.0, color: "#EF3124" },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₽";

export default function MortgageCalculator() {
  const [price, setPrice]                 = useState(6_000_000);
  const [initialPayment, setInitialPayment] = useState(1_200_000);
  const [term, setTerm]                   = useState(20);
  const [selectedBank, setSelectedBank]   = useState(banks[0]);

  const loanAmount        = price - initialPayment;
  const monthlyRate       = selectedBank.rate / 100 / 12;
  const numberOfPayments  = term * 12;
  const monthlyPayment    =
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalPayment      = monthlyPayment * numberOfPayments;
  const overpayment       = totalPayment - loanAmount;
  const initPercent       = (initialPayment / price) * 100;

  const barData = Array.from({ length: Math.min(term, 10) }, (_, i) => {
    const yearlyPayment  = monthlyPayment * 12;
    const yearlyInterest = loanAmount * (selectedBank.rate / 100);
    const yearlyPrincipal = yearlyPayment - yearlyInterest;
    return {
      year: `Год ${i + 1}`,
      principal: Math.max(0, Math.round(yearlyPrincipal)),
      interest: Math.round(yearlyInterest),
    };
  });

  const pieData = [
    { name: "Основной долг", value: Math.round(loanAmount) },
    { name: "Переплата",     value: Math.round(overpayment) },
  ];
  const PIE_COLORS = ["#0066FF", "#FF4D4D"];

  return (
    <div className="bg-gray-50 min-h-screen">

      <PageHeader
        breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Ипотека" }]}
        title="Ипотечный калькулятор"
        subtitle="Рассчитайте ежемесячный платёж и подберите оптимальные условия кредитования"
        badge={
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#0066FF] rounded-full text-sm font-medium">
            <Calculator className="w-4 h-4" />
            Ставки от 6%
          </div>
        }
      />

      {/* ══ КАЛЬКУЛЯТОР ════════════════════════════════════════════════ */}
      <div className="py-14">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Форма параметрв */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Параметры кредита</h2>

              <div className="space-y-7">
                {/* Стоимость */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-gray-700">Стоимость недвижимости</label>
                    <span className="font-bold text-[#0066FF]">{formatPrice(price)}</span>
                  </div>
                  <input type="range" min="1000000" max="30000000" step="100000"
                    value={price} onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1.5">
                    <span>1 млн ₽</span><span>30 млн ₽</span>
                  </div>
                </div>

                {/* Первоначальный взнос */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-gray-700">
                      Первоначальный взнос ({initPercent.toFixed(0)}%)
                    </label>
                    <span className="font-bold text-[#0066FF]">{formatPrice(initialPayment)}</span>
                  </div>
                  <input type="range" min={price * 0.1} max={price * 0.8} step="10000"
                    value={initialPayment} onChange={(e) => setInitialPayment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1.5">
                    <span>10%</span><span>80%</span>
                  </div>
                </div>

                {/* Срок */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-gray-700">Срок кредита</label>
                    <span className="font-bold text-[#0066FF]">{term} лет</span>
                  </div>
                  <input type="range" min="1" max="30" step="1"
                    value={term} onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1.5">
                    <span>1 год</span><span>30 лет</span>
                  </div>
                </div>

                {/* Выбор банка */}
                <div>
                  <label className="font-medium text-gray-700 block mb-3">Банк-партнёр</label>
                  <div className="grid grid-cols-2 gap-3">
                    {banks.map((bank) => (
                      <button
                        key={bank.id}
                        onClick={() => setSelectedBank(bank)}
                        className={`p-4 rounded-2xl border-2 transition-all text-left ${
                          selectedBank.id === bank.id
                            ? "border-[#0066FF] bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: bank.color }}
                        >
                          {bank.name[0]}
                        </div>
                        <div className="font-semibold text-sm text-gray-800 mb-0.5">{bank.name}</div>
                        <div className="font-bold text-[#0066FF]">{bank.rate}%</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Результаты */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Ежемесячный платёж */}
              <div className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white rounded-3xl p-8 shadow-lg shadow-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Ежемесячный платёж</h3>
                </div>
                <div className="text-4xl font-bold mb-2">{formatPrice(monthlyPayment)}</div>
                <div className="text-blue-100 text-sm">На {term} лет под {selectedBank.rate}% годовых</div>
              </div>

              {/* Детали расчёта */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Детали расчёта</h3>
                <div className="space-y-4">
                  {[
                    { label: "Сумма кредита",        value: formatPrice(loanAmount),  color: "text-gray-900" },
                    { label: "Переплата по кредиту", value: formatPrice(overpayment), color: "text-red-500"  },
                    { label: "Общая сумма выплат",   value: formatPrice(totalPayment), color: "text-gray-900" },
                    { label: "Процентная ставка",    value: `${selectedBank.rate}%`,  color: "text-[#0066FF]" },
                  ].map((row, i, arr) => (
                    <div key={i} className={`flex justify-between items-center py-3 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                      <span className="text-gray-500">{row.label}</span>
                      <span className={`font-bold ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-7 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] hover:shadow-blue-200 text-white py-4 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Оформить заявку
                </button>
              </div>

              {/* Быстрые контакты */}
              <div className="bg-blue-50 rounded-3xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0066FF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Нужна помощь?</p>
                  <p className="text-sm text-gray-500">Ипотечный брокер поможет подобрать условия</p>
                </div>
                <a href="tel:+79001234567" className="flex-shrink-0 bg-[#0066FF] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#0052CC] transition-colors">
                  Позвонить
                </a>
              </div>
            </motion.div>
          </div>

          {/* ══ ГРАФИКИ ════════════════════════════════════════════════ */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Столбчатый */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">Распределение платежей по годам</h3>
              <p className="text-sm text-gray-400 mb-6">Основной долг vs. проценты</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  key={`bar-${barData.length}-${selectedBank.id}-${loanAmount}`}
                  data={barData}
                  margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => formatPrice(Number(v))} />
                  <Legend />
                  <Bar dataKey="principal" name="Основной долг" fill="#0066FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interest" name="Проценты" fill="#00D9FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Круговой */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">Структура общих выплат</h3>
              <p className="text-sm text-gray-400 mb-6">Долг и переплата за весь срок</p>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart key={`pie-${loanAmount}-${term}`}>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                    paddingAngle={4} dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatPrice(Number(v))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* ══ CTA ════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Нужна помощь с ипотекой?</h3>
                  <p className="text-blue-100 max-w-xl">
                    Наши ипотечные брокеры помогут подобрать оптимальные условия, подготовить документы и получить одобрение в кратчайшие сроки.
                  </p>
                </div>
              </div>
              <Link
                href="/about"
                className="flex-shrink-0 bg-white text-[#0066FF] hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold transition-colors shadow-lg whitespace-nowrap"
              >
                Проконсультироваться
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}