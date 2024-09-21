import React, { useEffect, useState } from "react";
import styles from "@/styles/Inscription.module.scss";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import AuthService from "@/services/AuthService";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

function Inscription() {
  const { theme } = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  const [currentStep, setCurrentStep] = useState(1);
  const [disable, setDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    age: "",
    adresse: "",
    num_tel: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const pageVariants = {
    initial: { opacity: 0, y: "-200vw" },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: "200vw" },
  };


  function validateStep1() {
    return formData.prenom && formData.nom && formData.age;
  }

  function validateStep2() {
    return formData.adresse && formData.num_tel && formData.email;
  }

  function validateStep3() {
    return formData.password && formData.confirmPassword;
  }

  function handleNext() {
    if (currentStep === 1 && !validateStep1()) {
      enqueueSnackbar(
        "Veuillez remplir tous les champs du premier formulaire.",
        {
          variant: "warning",
        }
      );
      return;
    }

    if (currentStep === 2 && !validateStep2()) {
      enqueueSnackbar(
        "Veuillez remplir tous les champs du deuxième formulaire.",
        {
          variant: "warning",
        }
      );
      return;
    }

    if (currentStep === 3 && !validateStep3()) {
      enqueueSnackbar(
        "Veuillez remplir tous les champs du troisième formulaire.",
        {
          variant: "warning",
        }
      );
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePrevious() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setDisable(true);

    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Les mots de passe ne correspondent pas.", {
        variant: "error",
      });
      setDisable(false);
      return;
    }

    const user = {
      nom: formData.nom,
      prenom: formData.prenom,
      age: formData.age,
      adresse: formData.adresse,
      num_tel: formData.num_tel,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await AuthService.register(user);
      enqueueSnackbar("Inscription réussie !", { variant: "success" });
      router.push("/login");
      console.log("User registered:", response.data);
      setDisable(false);
    } catch (error) {
      console.error("Registration error:", error);
      enqueueSnackbar("Erreur lors de l'inscription.", { variant: "error" });
      setDisable(false);
    }
  }

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
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.8, easeInOut: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.title}>
              <h1>S'inscrire</h1>
              <p>Inscrivez vos informations personnelles</p>
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className={styles.step}>
                  <div className={styles.formGroup}>
                    <label htmlFor="prenom">Prénom:</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="nom">Nom:</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="age">Âge:</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className={styles.step}>
                  {/* Deuxième section d'inscription */}
                  <div className={styles.formGroup}>
                    <label htmlFor="adresse">Adresse:</label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="num_tel">Numéro de téléphone:</label>
                    <input
                      type="tel"
                      id="num_tel"
                      name="num_tel"
                      value={formData.num_tel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className={styles.step}>
                  {/* Troisième section avec mot de passe et confirmation */}
                  <div className={styles.formGroup}>
                    <label htmlFor="password">Mot de passe:</label>
                    <div className={styles.passwordInput}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.togglePassword}
                      >
                        {showPassword ? "🙈" : "🙉"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">
                      Confirmer le mot de passe:
                    </label>
                    <div className={styles.passwordInput}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={styles.togglePassword}
                      >
                        {showConfirmPassword ? "🙈" : "🙉"}
                      </button>
                    </div>
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

                  {currentStep < 3 && (
                    <button
                      type="button"
                      className={styles.button}
                      onClick={handleNext}
                    >
                      Suivant
                    </button>
                  )}

                  {currentStep === 3 && (
                    <button
                      type="submit"
                      className={styles.button}
                      disabled={disable}
                    >
                      {disable ? (
                        <div className={styles.spinner}></div>
                      ) : (
                        "Valider"
                      )}
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
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Inscription;
