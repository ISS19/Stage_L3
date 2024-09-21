import React from "react";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "leaflet/dist/leaflet.css";
import "@/styles/globals.scss";
import styles from "@/styles/Navbar.module.scss";
import ThemeToggleButton from "@/components/Shared/ThemeToggleButton";
import { SnackbarProvider } from "notistack";
import useVerifySession from "@/hooks/useVerifySession";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  useVerifySession();

  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ThemeProvider>
          <motion.div key={router.pathname}>
            <Component {...pageProps} />
          </motion.div>
          <ThemeToggleButton styles={{ themeToggle: styles.themeToggle }} />
        </ThemeProvider>
      </SnackbarProvider>
    </AnimatePresence>
  );
}

export default MyApp;
