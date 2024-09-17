import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "@/styles/Login.module.scss";
import Link from "next/link";
import AuthService from "@/services/AuthService";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

function Login() {
  const { theme } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisable(true);

    const user = {
      identifier: formData.identifier,
      password: formData.password,
    };

    if (!user.identifier || !user.password) {
      enqueueSnackbar("Veuillez remplir tous les champs.", {
        variant: "warning",
      });
      setDisable(false);
      return;
    }

    try {
      const response = await AuthService.signin(user);
      enqueueSnackbar("Connexion réussie !", { variant: "success" });
      console.log("User logged in:", response.data);
      router.push("/consulter")
      
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar("Erreur lors de la connexion.", { variant: "error" });
    } finally {
      setDisable(false);
    }
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
            <h1>Se connecter</h1>
            <p>Connectez-vous pour consulter le docteur</p>
          </div>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="identifier">Email:</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                required
              />
            </div>

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
              <div className={styles.rememberAndForgot}>
                <div className={styles.rememberMe}>
                  <input type="checkbox" id="rememberMe" name="rememberMe" />
                  <label htmlFor="rememberMe">Rester connecté</label>
                </div>
                <a href="#" className={styles.forgotPassword}>
                  Mot de passe oublié?
                </a>
              </div>
            </div>
            <br />

            <div className={styles.formGroup}>
              <button
                type="submit"
                className={styles.button}
                disabled={disable}
              >
                {disable ? (
                  <div className={styles.spinner}></div>
                ) : (
                  "Se connecter"
                )}
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
