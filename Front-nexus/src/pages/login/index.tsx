import React, { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "@/styles/Login.module.scss";
import Link from "next/link";

function Login() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  return (
    <>
      <Link href="/">
        <img
          src={theme === "dark" ? "/aid-logo-dark.png" : "/aid-logo.png"}
          alt="Logo"
          className={styles.logo}
        />
      </Link>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>AID-AUTH</h1>
          <img
            src="/online-doctor-animate.svg"
            alt="Doctor"
            className={`${styles.imgDoctor} ${styles.desktop}`}
          />
        </div>

        <div className={styles.loginBox}>
          <div className={styles.title}>
            <h1>Se connecter</h1>
            <p>Connecter vous pour consulter le docteur</p>
          </div>
          <br />
          <br />
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Mot de passe:</label>
              <input type="password" id="password" name="password" required />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.rememberAndForgot}>
                <div className={styles.rememberMe}>
                  <input type="checkbox" id="rememberMe" name="rememberMe" />
                  <label htmlFor="rememberMe">Rester connecté</label>
                </div>
                <a href="#" className={styles.forgotPassword}>
                  Forgot Password?
                </a>
              </div>
            </div>
            <br />

            <div className={styles.formGroup}>
              <button type="submit" className={styles.button}>
                Se connecter
              </button>
            </div>
          </form>

          <p className={styles.linkSignup}>
            Pas encore inscrit?{" "}
            <Link href="/inscription" className={styles.registerLink}>
              Créez un compte ici
            </Link>
          </p>

          <img
            src="/online-doctor-animate.svg"
            alt="Doctor"
            className={`${styles.imgDoctor} ${styles.mobile}`}
          />

          <br />
          <footer className={styles.footer}>
            <p>
              &copy; {new Date().getFullYear()} AID-NEXUS. Pour vous servir.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Login;
