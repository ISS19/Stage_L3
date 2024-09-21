import React from "react";
import styles from "@/styles/NavbarConsultation.module.scss";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/router";

const NavbarConsultation = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img
            src={theme === "dark" ? "/aid-logo-dark.png" : "/aid-logo.png"}
            alt="Logo"
            className={styles.logo}
          />
        </div>

        <nav className={styles.nav}>
          <button onClick={() => router.push("/consulter")}>Docteur</button>
          <button onClick={() => router.push("/carte")}>Carte</button>
        </nav>

        <div className={styles.deconexion}>
          <button
            onClick={() => {
              router.push("/login");
              localStorage.removeItem("user");
            }}
          >
            Déconnexion
          </button>
        </div>
      </header>
    </div>
  );
};

export default NavbarConsultation;
