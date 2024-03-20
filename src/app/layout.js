import { Arsenal } from 'next/font/google';
import './globals.css';

const arsenal = Arsenal({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={arsenal.className}>{children}</body>
    </html>
  );
}