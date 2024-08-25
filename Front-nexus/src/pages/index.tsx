import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Spline from "@splinetool/react-spline";
import Navbar from "@/components/Shared/Navbar";
import { Loader } from "@/components/Shared/Loader";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";

function Home() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const main = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                earum unde mollitia itaque quibusdam necessitatibus cupiditate
                dolores illum. Obcaecati repellat accusantium commodi rem
                quaerat repudiandae qui nesciunt cumque, voluptates illum.
              </p>
              <br /><br />
              <Link href="/signup" className={styles.navLinkBis}>
                Consulter
                <img src="/syringe_100px.png" className={styles.syringe_blue} alt="" />
                <img src="/syringe_white.png" className={styles.syringe_white} alt="" />
              </Link>
            </div>
            <div className={styles.spline}>
              <Spline scene="https://prod.spline.design/PC0J5Pstikht04IE/scene.splinecode" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
