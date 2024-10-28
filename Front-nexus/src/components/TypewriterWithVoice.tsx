import React, { useState, useEffect } from 'react';

interface TypewriterWithVoiceProps {
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onComplete?: () => void;
}

const TypewriterWithVoice: React.FC<TypewriterWithVoiceProps> = ({
  text = "",
  rate = 1,
  pitch = 1,
  volume = 1,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [speechStarted, setSpeechStarted] = useState(false);

  const titles = ["Description", "Régimes recommandés", "Médicaments recommandés", "Précautions"];

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
      const isTitle = titles.some((title) => text.slice(index, index + title.length) === title);

      if (isTitle) {
        const matchedTitle = titles.find((title) => text.slice(index, index + title.length) === title)!;
        setDisplayedText((prev) => [...prev, `<br /><strong>${matchedTitle}</strong>`]);
        setIndex((prev) => prev + matchedTitle.length);
      } else {
        setDisplayedText((prev) => {
          const lastEntry = prev[prev.length - 1];
          if (typeof lastEntry === 'string') {
            return [...prev.slice(0, -1), lastEntry + nextChar];
          }
          return [...prev, nextChar];
        });
        setIndex((prev) => prev + 1);
      }
    }, 74);

    if (index === text.length - 1 && onComplete) {
      onComplete();
    }

    return () => clearTimeout(timeout);
  }, [text, index, speechStarted, onComplete]);

  useEffect(() => {
    if (utterance && text) {
      utterance.text = text;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [utterance, text]);

  return (
    <div dangerouslySetInnerHTML={{ __html: displayedText.join('') }}></div>
  );
};

export default TypewriterWithVoice;
