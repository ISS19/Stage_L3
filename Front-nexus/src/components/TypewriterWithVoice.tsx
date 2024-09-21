import React, { useState, useEffect } from 'react';

const TypewriterWithVoice = ({ text = "", rate = 1, pitch = 1, volume = 1, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [utterance, setUtterance] = useState(null);
  const [speechStarted, setSpeechStarted] = useState(false);

  const userSession = localStorage.getItem('user');

  if (userSession) {
    const userObject = JSON.parse(userSession);
    const userName = userObject.name; 
    console.log("Nom de l'utilisateur : ", userName);
  } else {
    console.log("Aucun utilisateur trouvé dans le localStorage.");
  }


  useEffect(() => {
    const speech = new SpeechSynthesisUtterance();
    speech.rate = rate;
    speech.pitch = pitch;
    speech.volume = volume;

    speech.onstart = () => {
      setSpeechStarted(true);
    };

    setUtterance(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [rate, pitch, volume]);

  useEffect(() => {
    if (!text || index >= text.length || !speechStarted) return;

    const timeout = setTimeout(() => {
      const nextChar = text[index];
      setDisplayedText((prev) => prev + nextChar);
      setIndex((prev) => prev + 1);
    }, 62);

    if (index === text.length - 1 && onComplete) {
      onComplete();
    }

    return () => clearTimeout(timeout);
  }, [text, index, displayedText, speechStarted, onComplete]);

  useEffect(() => {
    if (utterance && text) {
      utterance.text = text;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [utterance, text]);

  return <div><span></span>{displayedText}</div>;
};

export default TypewriterWithVoice;
