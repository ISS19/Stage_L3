import React, { useState, useEffect } from 'react';

const TypewriterWithVoice = ({ text = "", rate = 1, pitch = 1, volume = 1 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [utterance, setUtterance] = useState(null);
  const [speechStarted, setSpeechStarted] = useState(false);

  useEffect(() => {
    // Initialize the speech synthesis utterance
    const speech = new SpeechSynthesisUtterance();
    speech.rate = rate; // Vitesse de la parole
    speech.pitch = pitch; // Hauteur de la parole
    speech.volume = volume; // Volume de la parole

    // Déclenchement lorsque la voix commence à parler
    speech.onstart = () => {
      setSpeechStarted(true);
    };

    setUtterance(speech);

    return () => {
      // Nettoyage: annuler la parole en cours si le composant se démonte
      window.speechSynthesis.cancel();
    };
  }, [rate, pitch, volume]);

  useEffect(() => {
    if (!text || index >= text.length || !speechStarted) return;

    const timeout = setTimeout(() => {
      const nextChar = text[index];
      setDisplayedText((prev) => prev + nextChar);
      setIndex((prev) => prev + 1);
    }, 75); // Vitesse du typewriter

    return () => clearTimeout(timeout);
  }, [text, index, displayedText, speechStarted]);

  useEffect(() => {
    // Démarre la synthèse vocale dès que le composant est prêt
    if (utterance && text) {
      utterance.text = text; // Mettre tout le texte à lire d'un coup
      window.speechSynthesis.cancel(); // Arrête la parole précédente (au cas où)
      window.speechSynthesis.speak(utterance); // Commence la parole
    }
  }, [utterance, text]);

  return <div>{displayedText}</div>;
};

export default TypewriterWithVoice;
