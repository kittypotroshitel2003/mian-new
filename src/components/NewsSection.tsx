'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Newspaper, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const news = [
  {
    id: 1,
    date: "15 февраля 2026",
    readTime: "3 мин.",
    category: "Разрешение",
    categoryColor: "bg-green-100 text-green-700",
    title: "Получено разрешение на ввод ЖК «Северный» в эксплуатацию",
    excerpt: "Застройщик ООО МИАН успешно прошёл все проверки и получил официальное разрешение на ввод первой очереди ЖК «Северный» в эксплуатацию. Заселение начнётся в марте 2026 года.",
    image: "https://images.unsplash.com/photo-1735777192165-b58a5dd9a450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MjYyODQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    date: "1 марта 2026",
    readTime: "4 мин.",
    category: "Старт продаж",
    categoryColor: "bg-[#363E62]/15 text-[#363E62]",
    title: "Открыт старт продаж в ЖК «Южный Парк» — встречайте новый премиум-проект",
    excerpt: "Мы рады объявить о старте продаж квартир в новом жилом комплексе «Южный Парк» в ЮЗАО. Уникальная архитектура, развитая инфраструктура и панорамные виды.",
    image: "https://images.unsplash.com/photo-1768269378478-49d80e2320b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbmV3cyUyMGNvbnN0cnVjdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MjYyODQ4OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    date: "20 февраля 2026",
    readTime: "2 мин.",
    category: "Ипотека",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "Сбербанк снизил ставку по семейной ипотеке для покупателей МИАН до 6%",
    excerpt: "ООО МИАН совместно со Сбербанком запускают специальную программу семейной ипотеки по ставке от 6% годовых для всех покупателей квартир в наших жилых комплексах.",
    image: "https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcyNjE2MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

import type { Variants } from "motion/react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function NewsSection() {
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
              <Newspaper className="w-4 h-4" />
              Актуально
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-[#363E62]"
            >
              Новости
            </motion.h2>
          </div>
          <Link
            href="/objects"
            className="hidden md:inline-flex items-center gap-2 text-[#363E62] hover:gap-3 transition-all font-semibold group"
          >
            <span>Все новости</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {news.map((item) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${item.categoryColor}`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-[#363E62] mb-3 leading-snug group-hover:text-[#363E62] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                  {item.excerpt}
                </p>

                <Link
                  href="/objects"
                  className="inline-flex items-center gap-2 text-[#363E62] font-semibold text-sm hover:gap-3 transition-all group/link"
                >
                  Читать далее
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
