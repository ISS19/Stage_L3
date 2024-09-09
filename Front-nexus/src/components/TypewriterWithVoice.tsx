import React, { useState, useEffect } from 'react';

const TypewriterWithVoice = ({ text = "", rate = 1, pitch = 1, volume = 1, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [utterance, setUtterance] = useState(null);
  const [speechStarted, setSpeechStarted] = useState(false);

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

    // Call onComplete when the typewriter reaches the end of the text
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

  return <div>{displayedText}</div>;
};

export default TypewriterWithVoice;
