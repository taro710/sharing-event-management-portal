import { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.scss';

import { PAGE_META, PAGE_PATH } from '@/constants/pathname';

const Home = () => (
  <main className={styles['layout-component']}>
    <p>Get started by creating event</p>
    <p>↓</p>
    <Link className={styles.button} href={PAGE_PATH.NEW_EVENT}>
      New Event
    </Link>
  </main>
);

export const metadata: Metadata = PAGE_META['/'];

export default Home;
