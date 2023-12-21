'use client';

import { useRouter } from 'next/navigation';

import MainPanel from '@/components/MainPanel';
import SubPanel from '@/components/SubPanel';
import Tab from '@/components/Tab';

import style from './layout.module.scss';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onTabChange = (index: number) => {
    switch (index) {
      case 0:
        router.push('/sample/item');
        break;
      case 1:
        router.push('/sample/expense');
        break;
      case 2:
        router.push('/sample/memo');
        break;
      default:
        break;
    }
  };

  return (
    <div className={style['page-component']}>
      <div className={style['sub']}>
        <SubPanel />
      </div>
      <div className={style['main']}>
        <div className={style['tab']}>
          <Tab onChange={onTabChange} />
        </div>
        <div className={style['panel']}>
          <MainPanel>{children}</MainPanel>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;