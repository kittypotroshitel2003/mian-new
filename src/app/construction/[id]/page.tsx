import type { Metadata } from 'next';
import { constructionMeta } from '../../../lib/seo-data';
import ConstructionDetail from '../../../components/pages/ConstructionDetail';

export const dynamic = 'force-static';

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return Object.keys(constructionMeta).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const obj = constructionMeta[id];

  if (!obj) {
    return {
      title: 'Объект не найден',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Ход строительства — ${obj.name}`,
    description: `${obj.name}, ${obj.location}. ${obj.status} Онлайн-камеры и фотоотчёты от ООО МИАН.`,
    openGraph: {
      title: `Ход строительства ${obj.name} | ООО МИАН`,
      description: `${obj.status} Следите за стройкой в реальном времени.`,
      url: `/construction/${id}`,
    },
  };
}

export default function Page() {
  return <ConstructionDetail />;
}
