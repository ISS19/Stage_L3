import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Spline from "@splinetool/react-spline";
import Navbar from "@/components/Shared/Navbar";
import { Loader } from "@/components/Shared/Loader";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className={styles.splineContainer}>
            <div className={styles.splineTitle}>
              <h1>AID-NEXUS</h1>
              <p>
                <Typewriter
                  words={[
                    "Bienvenue sur notre plateforme de soin intelligente, conçue pour révolutionner votre accès à la santé. Grâce à notre intelligence artificielle, vous pouvez obtenir des conseils de santé personnalisés en quelques secondes. Analysez vos symptômes facilement avec notre docteur virtuel, disponible 24/7 pour répondre rapidement à vos questions de santé.",
                  ]}
                  cursor
                  loop={true}
                  cursorStyle="_"
                  typeSpeed={70}
                  delaySpeed={90000000}
                  onDelay={() => {
                    setShowLink(true);
                    console.log(showLink);
                  }}
                />
              </p>
              <br />
              <br />
              {showLink && (
                <Link href="/consulter" className={styles.navLinkBis}>
                  Consulter
                </Link>
              )}
            </div>
            <div className={styles.spline}>
              <Spline scene="https://prod.spline.design/DvTcNWANHXavJ4vN/scene.splinecode" />
            </div>
          </div>
          <footer className={styles.footer}>
            <p>
              &copy; {new Date().getFullYear()} AID-NEXUS. Pour vous servir.
            </p>
          </footer>
        </>
      )}
    </>
  );
}

export default Home;
