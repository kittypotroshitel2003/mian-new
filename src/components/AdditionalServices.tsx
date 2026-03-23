'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Store, Car, Package, Wrench } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const services = [
  {
    id: 1,
    icon: Store,
    title: "Коммерция",
    description: "Офисы, торговые площади и помещения свободного назначения на первых этажах наших ЖК. Готовые решения для бизнеса с отличной проходимостью.",
    image: "https://images.unsplash.com/photo-1635107624924-c209ff7330b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwc3BhY2UlMjByZWFsJTIwZXN0YXRlfGVufDF8fHx8MTc3MjYyODQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    priceFrom: "от 8 500 000 ₽",
    tag: "от 40 м²",
    accent: "from-blue-600 to-blue-800",
    tagBg: "bg-blue-600",
  },
  {
    id: 2,
    icon: Car,
    title: "Парковки",
    description: "Подземные и наземные машиноместа с охраной 24/7, видеонаблюдением и системой контроля доступа во всех жилых комплексах.",
    image: "https://images.unsplash.com/photo-1724977340973-2997357d888e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMHBhcmtpbmclMjBnYXJhZ2UlMjBtb2Rlcm58ZW58MXx8fHwxNzcyNjI4NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceFrom: "от 1 200 000 ₽",
    tag: "Охраняемые",
    accent: "from-slate-700 to-slate-900",
    tagBg: "bg-slate-700",
  },
  {
    id: 3,
    icon: Package,
    title: "Склад. помещения",
    description: "Кладовые и складские помещения для хранения вещей прямо в вашем доме. Удобный доступ круглосуточно без выхода из здания.",
    image: "https://images.unsplash.com/photo-1768796373708-e1b62a0f2900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yYWdlJTIwd2FyZWhvdXNlJTIwbW9kZXJuJTIwZmFjaWxpdHl8ZW58MXx8fHwxNzcyNjI4NDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceFrom: "от 180 000 ₽",
    tag: "от 4 м²",
    accent: "from-emerald-600 to-emerald-800",
    tagBg: "bg-emerald-600",
  },
  {
    id: 4,
    icon: Wrench,
    title: "Ремонт под ключ",
    description: "Полный спектр отделочных раб��т от наших партнёров. Белая, чистовая и дизайнерская отделка с гарантией качества и фиксированными сроками.",
    image: "https://images.unsplash.com/photo-1719474815477-d765d3d42c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjByZW5vdmF0aW9uJTIwaW50ZXJpb3IlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzcyNjI4NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceFrom: "от 12 000 ₽/м²",
    tag: "Под ключ",
    accent: "from-orange-500 to-orange-700",
    tagBg: "bg-orange-500",
  },
];

export default function AdditionalServices() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0066FF] rounded-full mb-4 font-medium shadow-sm"
          >
            <Package className="w-4 h-4" />
            Больше возможностей
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Дополнительно
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.accent} opacity-60`} />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`${service.tagBg} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0066FF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{service.priceFrom}</span>
                    <Link
                      href="/objects"
                      className="inline-flex items-center gap-1.5 text-[#0066FF] font-semibold text-sm hover:gap-2.5 transition-all"
                    >
                      Подробнее
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
