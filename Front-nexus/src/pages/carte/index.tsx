import dynamic from 'next/dynamic';
import styles from "@/styles/Carte.module.scss";
import { useRouter } from 'next/router';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const Home: React.FC = () => {

    const router = useRouter();

  return (
    <div>
      <header className={styles.header}>
        <nav>
          <button onClick={() => router.push("/consulter")}>Docteur</button>
          <button onClick={() => router.push("/carte")}>Carte</button>
        </nav>
      </header>
      <div className={styles.mapContainer}>
      <Map />
      </div>
    </div>
  );
};

export default Home;
