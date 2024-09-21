import dynamic from 'next/dynamic';
import styles from "@/styles/Carte.module.scss";
import { useRouter } from 'next/router';
import NavbarConsultation from '@/components/Shared/NavbarConsultation';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const Carte: React.FC = () => {

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
