import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hook Generator',
  description: 'Generate high-retention short-form video hooks with a red/black glassmorphism UI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
