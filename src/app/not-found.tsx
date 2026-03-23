import type { Metadata } from 'next';
import NotFound from '../components/pages/NotFound';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  description: 'Запрашиваемая страница не существует. Вернитесь на главную страницу ООО МИАН.',
  robots: {
    index: false,
    follow: false,
  },
};

export default NotFound;
