'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ChatWidget from "./ChatWidget";

export default function Root({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");

  const navLinks = [
    { path: "/", label: "Главная" },
    { path: "/objects", label: "Объекты" },
    { path: "/construction", label: "Ход строительства" },
    { path: "/mortgage", label: "Ипотека" },
    { path: "/about", label: "О компании" },
    { path: "/faq", label: "Вопросы и ответы" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <Link href="/" className="flex items-center group">
              <Image src="/logo.svg" alt="МИАН" width={120} height={48} className="h-12 w-auto" priority />
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a
                href="tel:+79001234567"
                className="flex items-center gap-2 text-gray-700 hover:text-[#363E62] transition-colors group"
              >
                <div className="p-2 bg-white rounded-full group-hover:bg-[#363E62]/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Позвоните нам</div>
                  <div className="font-semibold">+7 (900) 123-45-67</div>
                </div>
              </a>
              <a
                href="mailto:info@mian.ru"
                className="flex items-center gap-2 text-gray-700 hover:text-[#363E62] transition-colors group"
              >
                <div className="p-2 bg-white rounded-full group-hover:bg-[#363E62]/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Напишите нам</div>
                  <div className="font-semibold">info@mian.ru</div>
                </div>
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#f5f5f5] rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block py-4">
            <ul className="flex items-center justify-start gap-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`px-4 py-2 rounded-xl font-medium transition-all relative group ${
                      isActive(link.path)
                        ? "text-[#363E62]"
                        : "text-gray-700 hover:text-[#363E62] hover:bg-[#f5f5f5]"
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#363E62] to-[#232840]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <ul className="py-4 space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                          isActive(link.path)
                            ? "bg-[#363E62]/10 text-[#363E62]"
                            : "text-gray-700 hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-4 border-t border-gray-100">
                    <a
                      href="tel:+79001234567"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#f5f5f5] rounded-xl"
                    >
                      <Phone className="w-5 h-5 text-[#363E62]" />
                      <span>+7 (900) 123-45-67</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@mian.ru"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#f5f5f5] rounded-xl"
                    >
                      <Mail className="w-5 h-5 text-[#363E62]" />
                      <span>info@mian.ru</span>
                    </a>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#363E62] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#363E62] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <Image src="/logo.svg" alt="МИАН" width={120} height={40} className="h-10 w-auto brightness-0 invert" />
              </div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Надежный застройщик качественного жилья с 2010 года. Строим ваше будущее с заботой и профессионализмом.
              </p>
              <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm">
                  ФЗ-214
                </div>
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm">
                  Аккредитация
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                Навигация
                <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/objects", label: "Объекты" },
                  { to: "/construction", label: "Ход строительства" },
                  { to: "/mortgage", label: "Ипотека" },
                  { to: "/about", label: "О компании" },
                  { to: "/faq", label: "Вопросы и ответы" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className="text-sm text-gray-400 hover:text-[#363E62] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#363E62] transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                Контакты
                <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+79001234567"
                    className="text-sm text-gray-400 hover:text-[#363E62] transition-colors flex items-start gap-3 group"
                  >
                    <Phone className="w-5 h-5 mt-0.5 text-[#363E62] group-hover:text-[#363E62] transition-colors" />
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Телефон</div>
                      <div className="text-white">+7 (900) 123-45-67</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@mian.ru"
                    className="text-sm text-gray-400 hover:text-[#363E62] transition-colors flex items-start gap-3 group"
                  >
                    <Mail className="w-5 h-5 mt-0.5 text-[#363E62] group-hover:text-[#363E62] transition-colors" />
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Email</div>
                      <div className="text-white">info@mian.ru</div>
                    </div>
                  </a>
                </li>
                <li className="text-sm text-gray-400 pt-2">
                  <div className="text-xs text-gray-500 mb-1">Адрес офиса</div>
                  <div className="text-white">ул. Примерная, д. 1</div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                Документы
                <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Политика конфиденциальности", href: "/privacy" },
                  { label: "Разрешения на строительство", href: null },
                  { label: "Проектная декларация", href: null },
                  { label: "Договор ДДУ", href: null },
                ].map(({ label, href }) => (
                  <li key={label}>
                    {href ? (
                      <Link
                        href={href}
                        className="text-sm text-gray-400 hover:text-[#363E62] transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#363E62] transition-colors" />
                        {label}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-600 inline-flex items-center gap-2 cursor-default" title="Документ в подготовке">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © 2026 ООО МИАН. Все права защищены.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Проектное финансирование в соответствии с ФЗ-214
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}