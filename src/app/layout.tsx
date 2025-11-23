import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Swarup Donepudi - Platform Engineering & Infrastructure',
  description: 'Platform engineering expert, founder of Planton Cloud, creator of Project Planton',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


