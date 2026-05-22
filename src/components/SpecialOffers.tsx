'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { Tag, Clock, ArrowRight, Percent, Gift, CreditCard, Home } from "lucide-react";

const offers = [
  {
    id: 1,
    icon: Percent,
    iconBg: "bg-[#363E62]/15",
    iconColor: "text-[#363E62]",
    tag: "Ипотека",
    tagColor: "bg-[#363E62]/10 text-[#363E62]",
    title: "Ипотека от 0.1%",
    subtitle: "от Сбербанка",
    description: "Специальные ставки по семейной ипотеке и льготным программам при покупке квартиры в наших ЖК.",
    deadline: "До 31 марта 2026",
    gradient: "from-[#363E62]/10 to-white",
    border: "border-[#363E62]/20",
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

import type { Variants } from "motion/react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function SpecialOffers() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#363E62]/10 text-[#363E62] rounded-full mb-4 font-medium"
            >
              <Tag className="w-4 h-4" />
              Выгодные условия
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-[#363E62]"
            >
              Спецпредложения
            </motion.h2>
          </div>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                variants={cardVariants}
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

                <h3 className="text-xl font-bold text-[#363E62] mb-1">{offer.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{offer.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{offer.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {offer.deadline}
                  </div>
                  <Link
                    href="/objects"
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#363E62] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
