import React from "react";
import styles from "@/styles/Login.module.scss";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>AID-AUTH</h1>
        <img
          src="/3dDoctor.png"
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

        <img
          src="/3dDoctor.png"
          alt="Doctor"
          className={`${styles.imgDoctor} ${styles.mobile}`}
        />

        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} AID-NEXUS. Pour vous servir.</p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
