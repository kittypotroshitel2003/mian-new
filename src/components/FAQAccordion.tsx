'use client';

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqItems = [
  {
    id: 1,
    category: "Покупка",
    question: "Как проходит процесс покупки квартиры в новостройке?",
    answer:
      "Всё просто: выбираете квартиру на сайте или при личной встрече с менеджером → подписываете договор долевого участия (ДДУ) → регистрируете его в Росреестре → оплачиваете (сразу, в рассрочку или через ипотеку) → получаете ключи после сдачи дома. Мы сопровождаем вас на каждом этапе.",
  },
  {
    id: 2,
    category: "Документы",
    question: "Какие документы нужны для покупки?",
    answer:
      "Для оформления ДДУ достаточно паспорта гражданина РФ. Если привлекаете ипотеку — банк запросит СНИЛС, справку о доходах (2-НДФЛ) и копию трудовой книжки. Наши специалисты подготовят полный пакет документов и объяснят каждый шаг.",
  },
  {
    id: 3,
    category: "Ипотека",
    question: "Можно ли купить квартиру в ипотеку? Какие банки работают с вами?",
    answer:
      "Да. Мы аккредитованы в Сбербанке (от 6,5%), ВТБ (от 6,8%) и Совкомбанке (от 7,2%). Также действуют программы льготной ипотеки: семейная — от 6%, IT-ипотека — от 5%. Наш ипотечный брокер подберёт лучшее предложение бесплатно.",
  },
  {
    id: 4,
    category: "Финансы",
    question: "Есть ли рассрочка и каков минимальный первоначальный взнос?",
    answer:
      "Минимальный взнос по ипотеке — 10% от стоимости квартиры. Собственная рассрочка от застройщика — без процентов на срок до 2 лет при первоначальном взносе от 30%. По акции «Рассрочка 0%» можно въехать уже сейчас и распределить платежи до конца строительства.",
  },
  {
    id: 5,
    category: "Строительство",
    question: "Как следить за ходом строительства?",
    answer:
      "На сайте есть раздел «Ход строительства» с ежемесячными фото- и видеоотчётами с объектов. Кроме того, вы получаете уведомления в личном кабинете и можете в любое время записаться на очный показ строительной площадки.",
  },
  {
    id: 6,
    category: "Юридический",
    question: "Защищены ли мои деньги при покупке по ДДУ?",
    answer:
      "Ваши средства хранятся на эскроу-счёте в банке — застройщик получает деньги только после сдачи дома и регистрации собственности. Это обязательное требование закона 214-ФЗ. Мы работаем полностью в правовом поле и никогда не использовали «серые» схемы.",
  },
  {
    id: 7,
    category: "Отделка",
    question: "Продаются ли квартиры с отделкой? Что входит в комплектацию?",
    answer:
      "В зависимости от ЖК мы предлагаем три варианта: черновая отделка (стяжка, штукатурка, разводка), отделка white box (готово под чистовую) и квартиры с полным ремонтом под ключ. В последнем случае включены ламинат, кафель в санузлах, сантехника и встроенная кухня.",
  },
  {
    id: 8,
    category: "Инфраструктура",
    question: "Что будет построено на территории комплекса?",
    answer:
      "Каждый ЖК МИАН предусматривает закрытую благоустроенную территорию: детские и спортивные площадки, велодорожки, зоны отдыха. В первых этажах — магазины, кофейни, аптека и детский сад. Подземный паркинг — в каждом проекте.",
  },
];

interface FAQAccordionProps {
  limit?: number;
  showMoreLink?: string;
}

export default function FAQAccordion({ limit, showMoreLink }: FAQAccordionProps = {}) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const items = limit ? faqItems.slice(0, limit) : faqItems;

  return (
    <div>
      <div className="space-y-3">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-left">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 ml-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showMoreLink && (
        <div className="mt-5 flex items-center justify-between px-1">
          <p className="text-sm text-gray-400">
            Показано {items.length} из {faqItems.length} вопросов
          </p>
          <Link
            href={showMoreLink}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
          >
            Все вопросы и ответы
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
