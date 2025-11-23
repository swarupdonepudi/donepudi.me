import { getAllTalks } from '@/lib/talks';
import PresentClient from './PresentClient';

export async function generateStaticParams() {
  const talks = await getAllTalks();
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
}

export default function PresentPage() {
  return <PresentClient />;
}
