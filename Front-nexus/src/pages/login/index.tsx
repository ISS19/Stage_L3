import React from "react";
import Typewriter from "typewriter-effect";
import styles from "@/styles/Login.module.scss";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>
          <Typewriter
            options={{
              strings: ["Se connecter"],
              autoStart: true,
              loop: true,
              delay: 50,
              cursor: "|",
            }}
          />
        </h1>
        <img src="/3dDoctor.png" alt="" className={styles.imgDoctor}/>
      </div>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Se connecter</h1>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
