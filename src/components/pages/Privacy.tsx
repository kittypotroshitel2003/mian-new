import Link from "next/link";
import { PageHeader } from "../PageHeader";

export default function Privacy() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Политика конфиденциальности" }]}
        title="Политика конфиденциальности"
        subtitle="Как мы обрабатываем ваши персональные данные"
      />

      <div className="py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-gray">

            <div className="bg-[#363E62]/5 border border-[#363E62]/10 rounded-2xl px-6 py-4 mb-10 text-sm text-[#363E62]">
              Документ действует с 1 января 2025 года. Оператор персональных данных — <strong>ООО «МИАН»</strong>.
            </div>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#363E62] mb-4">1. Какие данные мы собираем</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                При заполнении форм на сайте мы можем получать:
              </p>
              <ul className="space-y-2 text-gray-600">
                {["Имя и фамилию", "Номер телефона", "Адрес электронной почты", "Комментарии, которые вы оставляете добровольно"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#363E62] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#363E62] mb-4">2. Зачем мы это делаем</h2>
              <p className="text-gray-600 leading-relaxed">
                Данные используются исключительно для того, чтобы ответить на ваш запрос — связаться с вами по телефону или электронной почте и предоставить консультацию по интересующей вас недвижимости. Мы не передаём данные третьим лицам и не используем их для рекламных рассылок без вашего явного согласия.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#363E62] mb-4">3. Правовое основание</h2>
              <p className="text-gray-600 leading-relaxed">
                Обработка персональных данных осуществляется на основании Федерального закона № 152-ФЗ «О персональных данных» и вашего добровольного согласия, которое вы даёте при отправке формы на сайте.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#363E62] mb-4">4. Хранение и защита</h2>
              <p className="text-gray-600 leading-relaxed">
                Данные хранятся только на защищённых серверах на территории Российской Федерации. Срок хранения — не более 3 лет с момента последнего обращения или до момента отзыва согласия.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#363E62] mb-4">5. Ваши права</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                В соответствии с 152-ФЗ вы вправе:
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Получить информацию о том, какие данные мы храним",
                  "Потребовать исправления неточных данных",
                  "Отозвать согласие и потребовать удаления данных",
                  "Обратиться в Роскомнадзор при нарушении ваших прав",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#363E62] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#363E62] mb-4">6. Контакты</h2>
              <p className="text-gray-600 leading-relaxed">
                По вопросам обработки персональных данных обращайтесь:{" "}
                <a href="mailto:privacy@mian.ru" className="text-[#363E62] hover:underline">
                  privacy@mian.ru
                </a>
              </p>
            </section>

            <div className="border-t border-gray-100 pt-8 mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#363E62] font-semibold hover:text-[#232840] transition-colors"
              >
                ← Вернуться на главную
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
