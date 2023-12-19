import { Inter } from 'next/font/google';

import style from './layout.module.scss';

import type { Metadata } from 'next';

import '@/assets/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={style['header-component']}>
          <div className={style['logo']}>LOGO</div>
          <ul className={style['menu']}>
            <li className={style['item']}>Events</li>
            <li className={style['item']}>Mypage</li>
            <li className={style['item']}>New Event</li>
          </ul>
        </header>
        <main className={style['main-component']}>
          <div className={style['content']}>{children}</div>
        </main>
        <footer className={style['footer-component']}></footer>
      </body>
    </html>
  );
}
