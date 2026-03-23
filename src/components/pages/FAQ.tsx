'use client';

import { ChevronDown, MessageSquare, Send, HelpCircle, Phone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "../PageHeader";

const faqs = [
  {
    category: "Ипотека",
    icon: "💳",
    questions: [
      {
        question: "Какие банки-партнёры у компании?",
        answer: "Мы сотрудничаем с ведущими банками России: Сбербанк, ВТБ, Совкомбанк, Альфа-Банк, Россельхозбанк и другими. Наши специалисты помогут подобрать оптимальные условия кредитования.",
      },
      {
        question: "Какой минимальный первоначальный взнос?",
        answer: "Минимальный первоначальный взнос составляет 10% от стоимости квартиры. Однако чем больше первоначальный взнос, тем лучше условия кредитования вы можете получить.",
      },
      {
        question: "Можно ли использовать материнский капитал?",
        answer: "Да, материнский капитал можно использовать как для первоначального взноса, так и для погашения части ипотечного кредита. Наши специалисты помогут с оформлением всех необходимых документов.",
      },
      {
        question: "Сколько времени занимает одобрение ипотеки?",
        answer: "При наличии всех необходимых документов, одобрение ипотеки в банках-партнёрах занимает от 1 до 3 рабочих дней. Наши ипотечные брокеры помогут ускорить этот процесс.",
      },
    ],
  },
  {
    category: "Покупка",
    icon: "🏠",
    questions: [
      {
        question: "Какие этапы покупки квартиры?",
        answer: "Процесс покупки включает: выбор квартиры, бронирование, подписание договора долевого участия (ДДУ), внесение оплаты, получение ключей после сдачи дома, оформление права собственности.",
      },
      {
        question: "Что такое договор долевого участия (ДДУ)?",
        answer: "ДДУ — это договор между застройщиком и покупателем, который регулируется ФЗ-214. Он защищает права дольщика и гарантирует передачу квартиры после завершения строительства.",
      },
      {
        question: "Какие документы нужны для покупки?",
        answer: "Для физических лиц: паспорт, ИНН, СНИЛС. При покупке в ипотеку потребуются также справки о доходах, трудовая книжка или договор. Полный список документов предоставит менеджер.",
      },
      {
        question: "Можно ли забронировать квартиру?",
        answer: "Да, вы можете забронировать понравившуюся квартиру на срок до 7 дней. Для этого необходимо внести небольшой гарантийный взнос, который зачтётся в стоимость квартиры.",
      },
    ],
  },
  {
    category: "Строительство",
    icon: "🏗️",
    questions: [
      {
        question: "Как я могу следить за ходом строительства?",
        answer: "Мы регулярно публикуем фото и видеоотчёты о ходе строительства на нашем сайте в разделе «Ход строительства». Также вы можете записаться на экскурсию по стройплощадке.",
      },
      {
        question: "Что будет, если дом не сдадут в срок?",
        answer: "В случае задержки сдачи объекта предусмотрены штрафные санкции в пользу дольщика согласно ФЗ-214. Однако за всю историю компании мы не допускали срывов сроков сдачи объектов.",
      },
      {
        question: "Какие гарантии качества строительства?",
        answer: "Мы предоставляем гарантию на все конструктивные элементы здания сроком 5 лет. Все работы выполняются согласно проектной документации и строительным нормам под контролем независимых экспертов.",
      },
    ],
  },
  {
    category: "Гарантии",
    icon: "🛡️",
    questions: [
      {
        question: "Защищены ли мои средства при долевом строительстве?",
        answer: "Да, все наши проекты реализуются по ФЗ-214 с использованием эскроу-счетов. Ваши средства находятся на специальном счёте в банке и передаются застройщику только после ввода дома в эксплуатацию.",
      },
      {
        question: "Есть ли страхование при покупке квартиры?",
        answer: "При покупке квартиры в ипотеку страхование является обязательным требованием банка. Мы также рекомендуем оформить страхование титула для дополнительной защиты ваших прав.",
      },
      {
        question: "Что делать, если обнаружены недостатки?",
        answer: "При приёмке квартиры составляется акт осмотра. Все выявленные недостатки мы обязуемся устранить в течение гарантийного срока. Для этого нужно подать заявку в нашу службу поддержки.",
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", question: "" });

  const toggleItem = (id: string) =>
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ваш вопрос отправлен! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", email: "", question: "" });
  };

  const totalQuestions = faqs.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="bg-gray-50 min-h-screen">

      <PageHeader
        breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Вопросы и ответы" }]}
        title="Частые вопросы"
        subtitle="Ответы на самые популярные вопросы о покупке недвижимости и работе с нашей компанией"
        badge={
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#0066FF] rounded-full text-sm font-medium">
            <HelpCircle className="w-4 h-4" />
            {totalQuestions} вопросов и ответов
          </div>
        }
      />

      {/* ══ FAQ КОНТЕНТ ════════════════════════════════════════════════ */}
      <div className="py-14">
        <div className="container mx-auto px-4">

          {/* Категории */}
          <div className="space-y-10">
            {faqs.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.05 }}
              >
                {/* Заголовок категории */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-xl">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                  <span className="ml-2 px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
                    {category.questions.length}
                  </span>
                </div>

                {/* Аккордеон */}
                <div className="space-y-2.5">
                  {category.questions.map((item, itemIdx) => {
                    const itemId = `${catIdx}-${itemIdx}`;
                    const isOpen = openItems.includes(itemId);

                    return (
                      <div
                        key={itemIdx}
                        className={`bg-white rounded-2xl shadow-sm border transition-all ${
                          isOpen ? "border-[#0066FF]/20 shadow-md" : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left"
                        >
                          <span className={`font-semibold transition-colors ${isOpen ? "text-[#0066FF]" : "text-gray-900"}`}>
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 flex-shrink-0 ml-4 transition-all ${
                              isOpen ? "rotate-180 text-[#0066FF]" : "text-gray-400"
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                <div className="pt-4">{item.answer}</div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ══ ФОРМА ВОПРОСА ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Левая панель */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#0066FF] to-[#0052CC] p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#00D9FF]/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-8">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                  Не нашли ответ?
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Задайте свой вопрос — наши специалисты ответят в течение 24 часов
                </p>
              </div>
              <div className="relative z-10 mt-10 space-y-3">
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] flex-shrink-0" />
                  Ответ в течение рабочего дня
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] flex-shrink-0" />
                  Консультация бесплатна
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] flex-shrink-0" />
                  Без навязчивых звонков
                </div>
              </div>
            </div>

            {/* Форма */}
            <div className="lg:col-span-3 bg-white p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Задайте вопрос</h3>
              <p className="text-gray-500 mb-7">Опишите ситуацию — разберёмся вместе</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      required
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.ru"
                      required
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ваш вопрос *</label>
                  <textarea
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    rows={5}
                    placeholder="Опишите ваш вопрос подробно..."
                    required
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-gray-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Отправить вопрос
                </button>
              </form>
            </div>
          </motion.div>

          {/* ══ ТЕЛЕФОН ════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#0066FF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Предпочитаете позвонить?</h3>
                <p className="text-gray-500">Наши специалисты готовы ответить на все вопросы</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="tel:+79001234567"
                className="bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white px-8 py-3 rounded-2xl font-bold shadow-md shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.02] transition-all"
              >
                +7 (900) 123-45-67
              </a>
              <div className="text-sm text-gray-400 text-center">
                Ежедневно<br />с 9:00 до 21:00
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}