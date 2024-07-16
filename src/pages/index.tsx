import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Spline from "@splinetool/react-spline";

import Navbar from "@/components/Navbar";
import { Loader } from "@/components/Loader";

import styles from "@/styles/Home.module.scss";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

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

          <div className={styles["spline-container"]}>
            <div className={styles.spline}>
              <Spline 
                scene="https://prod.spline.design/PC0J5Pstikht04IE/scene.splinecode"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
