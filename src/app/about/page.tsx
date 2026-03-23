import type { Metadata } from 'next';
import About from '../../components/pages/About';

export const metadata: Metadata = {
  title: 'О компании',
  description: 'ООО МИАН — строительная компания с 2010 года. Более 25 сданных объектов, 5000 довольных семей. Работаем по ФЗ-214.',
  openGraph: {
    title: 'О компании | ООО МИАН',
    description: 'Строительная компания ООО МИАН — надёжный застройщик с 2010 года.',
  },
};

export default About;
