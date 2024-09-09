import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/contexts/ThemeContext';
import 'leaflet/dist/leaflet.css';
import '@/styles/globals.scss';
import styles from "@/styles/Navbar.module.scss";
import ThemeToggleButton from '@/components/Shared/ThemeToggleButton';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ThemeToggleButton styles={{ themeToggle: styles.themeToggle }} />
    </ThemeProvider>
  );
}

export default MyApp;
