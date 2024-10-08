import dynamic from 'next/dynamic';
import styles from "@/styles/Carte.module.scss";
import { useRouter } from 'next/router';
import NavbarConsultation from '@/components/Shared/NavbarConsultation';
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const Carte: React.FC = () => {

  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  return (
    <div>
      <NavbarConsultation />
      <div className={styles.mapContainer}>
      <Map />
      </div>
    </div>
  );
};

export default Carte;
