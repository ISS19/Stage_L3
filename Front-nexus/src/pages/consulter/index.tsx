import { useEffect, useState } from "react";
import { ThreeDModel } from "@/components/3d/ThreeDModel ";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styles from "@/styles/Consulter.module.scss";
import TypewriterWithVoice from "@/components/TypewriterWithVoice";
import AIService from "@/services/AIService";
import { useTheme } from "@/contexts/ThemeContext";
import NavbarConsultation from "@/components/Shared/NavbarConsultation";
import { enqueueSnackbar } from "notistack";

const Consulter = () => {
  const [voice, setVoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const [symptome1, setSymptome1] = useState<string | undefined>();
  const [symptome2, setSymptome2] = useState<string | undefined>();
  const [symptome3, setSymptome3] = useState<string | undefined>();
  const [symptome4, setSymptome4] = useState<string | undefined>();

  const { theme } = useTheme();

  const [diseaseDescriptions, setDiseaseDescriptions] = useState<{
    [key: string]: string;
  }>({});

  const concatenatedDescriptions = Object.entries(diseaseDescriptions)
    .map(([disease, description]) => `${disease}: ${description}`)
    .join("\n");

  const handleSymptomeChange =
    (setter: React.Dispatch<React.SetStateAction<string | undefined>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

    async function handleSendSymptoms() {
      const symptoms = [symptome1, symptome2, symptome3, symptome4].filter(Boolean) as string[];
  
      if (symptoms.length === 0) {
          enqueueSnackbar("Entrez au moins un symptôme pour pouvoir vous examiner", {
              variant: "warning",
          });
          return;
      }
  
      setVoice(false);
      setLoading(true);
      setAnimationComplete(false);
  
      try {
          const res = await AIService.getDiseasePrecaution(symptoms);
          const fetchedPrecaution = res.data.data[0];
  
          const diseaseKeys = Object.keys(fetchedPrecaution);
          const descriptions: { [key: string]: string } = {};
  
          if (diseaseKeys.length === 1) {
              const firstDiseaseInfo = fetchedPrecaution[diseaseKeys[0]];
              if (firstDiseaseInfo && firstDiseaseInfo.description) {
                  descriptions[diseaseKeys[0]] = firstDiseaseInfo.description.Description;
              }
          } else {
              for (let i = 0; i < Math.min(4, diseaseKeys.length); i++) {
                  const diseaseKey = diseaseKeys[i];
                  const diseaseInfo = fetchedPrecaution[diseaseKey];
                  if (diseaseInfo && diseaseInfo.description) {
                      descriptions[diseaseKey] = diseaseInfo.description.Description;
                  }
              }
          }

          setDiseaseDescriptions(descriptions);
          setVoice(true);
      } catch (error) {
          console.error("Error fetching precautions:", error);
      } finally {
          setLoading(false);
      }
  }
  

  useEffect(() => {
    if (diseaseDescriptions) {
      console.log({ diseaseDescriptions });
    }
  }, [diseaseDescriptions]);

  return (
    <div className={styles.container}>
      <NavbarConsultation />

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
            {loading ? <div className={styles.spinner}></div> : "Examiner"}
          </button>
        </div>
        <div className={styles.centerPanel}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="studio" />
            <ThreeDModel
              voice={voice}
              concatenatedDescriptions={concatenatedDescriptions}
              animationComplete={animationComplete}
            />
          </Canvas>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.AiResponse}>
            {voice && concatenatedDescriptions ? (
              <TypewriterWithVoice
                text={concatenatedDescriptions}
                onComplete={() => setAnimationComplete(true)}
              />
            ) : (
              <div className={styles.preResponse}>
                Les reponses du docteur s'afficheront ici <br />{" "}
                <img src="/aid-logos.png" className={styles.logo} alt="" />
              </div>
            )}
          </div>
          <button>Save</button>
          <button>Download</button>
          <button>Evaluate</button>
        </div>
      </main>
    </div>
  );
};

export default Consulter;
