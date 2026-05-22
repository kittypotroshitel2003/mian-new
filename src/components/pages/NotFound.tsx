'use client';

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#363E62] mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Страница не найдена</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#363E62] hover:bg-[#232840] text-white px-8 py-4 rounded-full font-semibold transition-colors"
        >
          <Home className="w-5 h-5" />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
