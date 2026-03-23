import type { Metadata } from 'next';
import { objectsMeta } from '../../../lib/seo-data';
import ObjectDetail from '../../../components/pages/ObjectDetail';

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return Object.keys(objectsMeta).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const obj = objectsMeta[id];

  if (!obj) {
    return {
      title: 'Объект не найден',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: obj.name,
    description: `${obj.name} — ${obj.location}. ${obj.description} Купите квартиру от застройщика ООО МИАН.`,
    openGraph: {
      title: `${obj.name} | ООО МИАН`,
      description: obj.description,
      url: `/objects/${id}`,
    },
  };
}

export default ObjectDetail;
