import type { Metadata } from 'next';
import MortgageCalculator from '../../components/pages/MortgageCalculator';

export const metadata: Metadata = {
  title: 'Ипотечный калькулятор',
  description: 'Рассчитайте ипотеку онлайн. Ставки от ведущих банков, одобрение за 1 день. Ипотечные брокеры ООО МИАН помогут подобрать условия.',
  openGraph: {
    title: 'Ипотека | ООО МИАН',
    description: 'Ипотечный калькулятор и подбор условий от застройщика.',
  },
};

export default MortgageCalculator;
