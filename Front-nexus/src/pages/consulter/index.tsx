"use client";
import { ThreeDModel } from "@/components/3d/ThreeDModel ";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styles from "@/styles/Consulter.module.scss";
import TypewriterWithVoice from "@/components/TypewriterWithVoice";
import { useState } from "react";

const HomePage = () => {
  const [voice, setVoice] = useState(false);

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
          <input type="text" placeholder="Symptom 1" />
          <input type="text" placeholder="Symptom 2" />
          <input type="text" placeholder="Symptom 3" />
          <input type="text" placeholder="Symptom 4" />
          <button
            onClick={() => {setVoice(true)}}
          >
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
          {voice && (
            <TypewriterWithVoice text="Vous n'êtes pas malade, vous êtes juste un peu fatigué " />
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
