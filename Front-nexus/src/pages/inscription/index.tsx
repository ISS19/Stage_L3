import React, { useState } from "react";
import styles from "@/styles/Inscription.module.scss";

function Inscription() {
  const [currentStep, setCurrentStep] = useState(1); // Gère l'étape actuelle de l'inscription

  // Fonction pour passer à l'étape suivante
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Fonction pour revenir à l'étape précédente
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour la soumission du formulaire
    console.log("Form submitted");
  };

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
                <input type="password" id="password" name="password" required />
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
            {/* Bouton Précédent, visible uniquement à partir de l'étape 2 */}
            {currentStep > 1 && (
              <button
                type="button"
                className={styles.button}
                onClick={handlePrevious}
              >
                Précédent
              </button>
            )}

            {/* Bouton Suivant ou Valider selon l'étape */}
            {currentStep < 2 ? (
              <button type="button" className={styles.button} onClick={handleNext}>
                Suivant
              </button>
            ) : (
              <button type="submit" className={styles.button}>
                Valider
              </button>
            )}
          </div>
        </form>

        <img
          src="/3dDoctor.png"
          alt="Doctor"
          className={`${styles.imgDoctor} ${styles.mobile}`}
        />
        <br />

        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} AID-NEXUS. Pour vous servir.</p>
        </footer>
      </div>
    </div>
  );
}

export default Inscription;
