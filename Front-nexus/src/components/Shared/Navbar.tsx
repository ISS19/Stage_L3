import React from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.navLink}>
          Accueil
        </Link>
        <Link href="/about" className={styles.navLink}>
          À propos
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="/login" className={styles.navLink}>
          Login
        </Link>
        <Link href="/consulter" className={styles.navLinkBis}>
          Consulter
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
