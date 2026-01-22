import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meetings | Swarup Donepudi',
  description: 'Presentation decks and meeting materials',
};

export default function MeetsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
