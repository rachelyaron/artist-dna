import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artist DNA Content Engine',
  description: 'Generate social media content that matches your unique brand voice',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
