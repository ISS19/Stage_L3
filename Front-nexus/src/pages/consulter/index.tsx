"use client";
import { ThreeDModel } from "@/components/3d/ThreeDModel "; 
import {
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styles from "@/styles/Consulter.module.scss";
import TypewriterWithVoice from "@/components/TypewriterWithVoice";
import { useEffect, useState } from "react";
import AIService from "@/services/AIService";

const HomePage = () => {
  const [voice, setVoice] = useState(false);
  const [loading, setLoading] = useState(false);

  const [symptome1, setSymptome1] = useState<string | undefined>();
  const [symptome2, setSymptome2] = useState<string | undefined>();
  const [symptome3, setSymptome3] = useState<string | undefined>();
  const [symptome4, setSymptome4] = useState<string | undefined>();

  const [diseaseDescriptions, setDiseaseDescriptions] = useState<{
    [key: string]: string;
  }>({});

  const handleSymptomeChange =
    (setter: React.Dispatch<React.SetStateAction<string | undefined>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSendSymptoms = async () => {
    const symptoms = [symptome1, symptome2, symptome3, symptome4].filter(
      Boolean
    ) as string[];

    setVoice(false);
    setLoading(true);
    try {
      const res = await AIService.getDiseasePrecaution(symptoms);
      const fetchedPrecaution = res.data.data[0];

      // Extract descriptions for all diseases
      const descriptions: { [key: string]: string } = {};
      Object.keys(fetchedPrecaution).forEach((disease) => {
        const diseaseInfo = fetchedPrecaution[disease];
        if (diseaseInfo && diseaseInfo.description) {
          descriptions[disease] = diseaseInfo.description.Description;
        }
      });

      setDiseaseDescriptions(descriptions);
      setVoice(true);
    } catch (error) {
      console.error("Error fetching precautions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (diseaseDescriptions) {
      console.log({ diseaseDescriptions });
    }
  }, [diseaseDescriptions]);

  // Concatenate all descriptions into a single string
  const concatenatedDescriptions = Object.entries(diseaseDescriptions)
    .map(([disease, description]) => `${disease}: ${description}`)
    .join('\n');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <button>Docteur</button>
          <button>Carte</button>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.leftPanel}>
          <input
            type="text"
            placeholder="Symptom 1"
            value={symptome1}
            onChange={handleSymptomeChange(setSymptome1)}
          />
          <input
            type="text"
            placeholder="Symptom 2"
            value={symptome2}
            onChange={handleSymptomeChange(setSymptome2)}
          />
          <input
            type="text"
            placeholder="Symptom 3"
            value={symptome3}
            onChange={handleSymptomeChange(setSymptome3)}
          />
          <input
            type="text"
            placeholder="Symptom 4"
            value={symptome4}
            onChange={handleSymptomeChange(setSymptome4)}
          />
          <button onClick={handleSendSymptoms} disabled={loading}>
            Send Symptoms
          </button>
        </div>
        <div className={styles.centerPanel}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="studio" />
            <ThreeDModel />
          </Canvas>
        </div>
        <div className={styles.rightPanel}>
          {voice && concatenatedDescriptions && (
            <TypewriterWithVoice text={concatenatedDescriptions} />
          )}
          <button>Save</button>
          <button>Download</button>
          <button>Evaluate</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
