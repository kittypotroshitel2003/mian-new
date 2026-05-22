'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  subtitle?: string;
  /** Маленький бейдж-пилюля под хлебными крошками (опционально) */
  badge?: React.ReactNode;
}

/**
 * Единый заголовок для внутренних страниц.
 * Используется на всех страницах кроме Главной и О компании
 * (у них полноценные баннеры с фото).
 */
export function PageHeader({ breadcrumbs, title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="relative bg-white border-b border-gray-100">
      {/* Левый акцент — единый визуальный маркер с баннерами */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#363E62] to-[#232840]" />

      <div className="container mx-auto px-4 py-8 md:py-10">
        {/* Хлебные крошки */}
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-sm text-gray-400 mb-4 flex-wrap"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
              {crumb.to ? (
                <Link
                  href={crumb.to}
                  className="hover:text-[#363E62] transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-600 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        {/* Бейдж */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-3"
          >
            {badge}
          </motion.div>
        )}

        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-3xl md:text-4xl font-bold text-[#363E62] leading-tight"
        >
          {title}
        </motion.h1>

        {/* Подзаголовок */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.13 }}
            className="mt-2 text-gray-500 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
