'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { Tag, Clock, ArrowRight, Percent, Gift, CreditCard, Home } from "lucide-react";

const offers = [
  {
    id: 1,
    icon: Percent,
    iconBg: "bg-blue-100",
    iconColor: "text-[#0066FF]",
    tag: "Ипотека",
    tagColor: "bg-blue-50 text-[#0066FF]",
    title: "Ипотека от 0.1%",
    subtitle: "от Сбербанка",
    description: "Специальные ставки по семейной ипотеке и льготным программам при покупке квартиры в наших ЖК.",
    deadline: "До 31 марта 2026",
    gradient: "from-blue-50 to-white",
    border: "border-blue-100",
  },
  {
    id: 2,
    icon: Home,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    tag: "Trade-in",
    tagColor: "bg-emerald-50 text-emerald-600",
    title: "Зачёт старого жилья",
    subtitle: "без хлопот",
    description: "Продайте свою старую квартиру через нас и зачтём стоимость в счёт покупки новой с максимальной выгодой.",
    deadline: "Постоянно",
    gradient: "from-emerald-50 to-white",
    border: "border-emerald-100",
  },
  {
    id: 3,
    icon: Gift,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    tag: "Скидка",
    tagColor: "bg-purple-50 text-purple-600",
    title: "Скидка 5%",
    subtitle: "при 100% оплате",
    description: "Приобретите квартиру за полную стоимость единовременно и получите скидку 5% от цены объекта.",
    deadline: "До 1 апреля 2026",
    gradient: "from-purple-50 to-white",
    border: "border-purple-100",
  },
  {
    id: 4,
    icon: CreditCard,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    tag: "Рассрочка",
    tagColor: "bg-orange-50 text-orange-600",
    title: "Рассрочка 0%",
    subtitle: "на 24 месяца",
    description: "Приобретайте квартиру без переплат и банковских процентов — платите частями в удобном ритме.",
    deadline: "До 30 апреля 2026",
    gradient: "from-orange-50 to-white",
    border: "border-orange-100",
  },
];

export default function SpecialOffers() {
  return (
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
              <Tag className="w-4 h-4" />
              Выгодные условия
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Спецпредложения
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group bg-gradient-to-b ${offer.gradient} border ${offer.border} rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`${offer.iconBg} p-3 rounded-2xl`}>
                    <Icon className={`w-6 h-6 ${offer.iconColor}`} />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${offer.tagColor}`}>
                    {offer.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{offer.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{offer.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{offer.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {offer.deadline}
                  </div>
                  <Link
                    href="/objects"
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#0066FF] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
