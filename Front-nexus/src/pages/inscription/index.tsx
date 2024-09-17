import React, { useEffect, useState } from "react";
import styles from "@/styles/Inscription.module.scss";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

function Inscription() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

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
            <h1>S'inscrire</h1>
            <p>Inscrivez vos informations personnelles</p>
          </div>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className={styles.step}>
                {/* Première section d'inscription */}
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Mot de passe:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.step}>
                {/* Deuxième section d'inscription */}
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">Prénom:</label>
                  <input type="text" id="firstName" name="firstName" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Nom:</label>
                  <input type="text" id="lastName" name="lastName" required />
                </div>
              </div>
            )}

            <br />

            <div className={styles.formGroup}>
              <div className={styles.buttonGroup}>
                {currentStep > 1 && (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={handlePrevious}
                  >
                    Précédent
                  </button>
                )}

                {currentStep < 2 ? (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={handleNext}
                  >
                    Suivant
                  </button>
                ) : (
                  <button type="submit" className={styles.button}>
                    Valider
                  </button>
                )}
              </div>
            </div>
          </form>

          <p className={styles.linkSignin}>
            Déjà inscrit?{" "}
            <Link href="/login" className={styles.loginLink}>
              Connectez-vous ici
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

export default Inscription;
