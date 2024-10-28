import { useEffect, useState } from "react";
import { ThreeDModel } from "@/components/3d/ThreeDModel ";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styles from "@/styles/Consulter.module.scss";
import TypewriterWithVoice from "@/components/TypewriterWithVoice";
import AIService from "@/services/AIService";
import HistoriqueService from "@/services/HistoriqueService";
import { useTheme } from "@/contexts/ThemeContext";
import NavbarConsultation from "@/components/Shared/NavbarConsultation";
import { enqueueSnackbar } from "notistack";
import { getUser } from "@/utils/helpers";
import jsPDF from "jspdf";

const symptomsList = [
  "perte musculaire",
  "plaques dans la gorge",
  "forte fievre",
  "contacts extraconjugaux",
  "stomach pain",
  "vomiting",
];
function Consulter() {
  const [voice, setVoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const [symptome1, setSymptome1] = useState<string | undefined>();
  const [symptome2, setSymptome2] = useState<string | undefined>();
  const [symptome3, setSymptome3] = useState<string | undefined>();
  const [symptome4, setSymptome4] = useState<string | undefined>();

  const [suggestions1, setSuggestions1] = useState<string[]>([]);
  const [suggestions2, setSuggestions2] = useState<string[]>([]);
  const [suggestions3, setSuggestions3] = useState<string[]>([]);
  const [suggestions4, setSuggestions4] = useState<string[]>([]);

  const [diseaseDescriptions, setDiseaseDescriptions] = useState<{
    [key: string]: string;
  }>({});

  const { theme } = useTheme();

  const concatenatedDescriptions = Object.entries(diseaseDescriptions)
    .map(([disease, description]) => `${disease}: ${description}`)
    .join("\n");

  const handleSymptomeChange =
    (
      setter: React.Dispatch<React.SetStateAction<string | undefined>>,
      setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setter(value);

      // Update suggestions based on the current input value
      if (value) {
        const filteredSuggestions = symptomsList.filter((symptom) =>
          symptom.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
      }
    };

  const handleSuggestionClick = (
    symptom: string,
    setter: React.Dispatch<React.SetStateAction<string | undefined>>,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(symptom);
    setSuggestions([]); // Clear suggestions after selection
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  useEffect(() => {
    if (diseaseDescriptions) {
      console.log({ diseaseDescriptions });
    }
  }, [diseaseDescriptions]);

  function handleDownload() {
    const doc = new jsPDF();

    const user = getUser();
    const userName = user ? user.nom : null;

    const logoPath = "/aid-logo.png";
    const logo = new Image();
    logo.src = logoPath;

    logo.onload = () => {
      doc.addImage(logo, "PNG", 10, 0, 40, 40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`Prévention des Maladies pour ${userName}`, 10, 40);

      doc.text("", 10, 50);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      const maxWidth = 190;

      const entries = Object.entries(diseaseDescriptions);
      let verticalOffset = 60;

      entries.forEach(([disease, description]) => {
        doc.setFont("helvetica", "bold");
        doc.text(disease, 10, verticalOffset);
        verticalOffset += 10;

        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(description, maxWidth);

        lines.forEach((line: string) => {
          doc.text(line, 10, verticalOffset);
          verticalOffset += 10;
        });

        verticalOffset += 5;
      });

      doc.setFont("helvetica", "bold");
      doc.text("Symptômes:", 10, verticalOffset);
      verticalOffset += 10;

      doc.setFont("helvetica", "normal");
      const symptoms = [symptome1, symptome2, symptome3, symptome4].filter(
        Boolean
      ) as string[];

      if (symptoms.length > 0) {
        const symptomLines = symptoms.map((symptom) => `- ${symptom}`);
        const symptomText = doc.splitTextToSize(
          symptomLines.join("\n"),
          maxWidth
        );

        symptomText.forEach((line: string) => {
          doc.text(line, 10, verticalOffset);
          verticalOffset += 10;
        });
      } else {
        doc.text("Aucun symptôme fourni.", 10, verticalOffset);
        verticalOffset += 10;
      }

      doc.save("precautions.pdf");
    };
  }

  async function handleSendSymptoms() {
    const symptoms = [symptome1, symptome2, symptome3, symptome4].filter(
      Boolean
    ) as string[];

    if (symptoms.length === 0) {
      enqueueSnackbar(
        "Entrez au moins un symptôme pour pouvoir vous examiner",
        { variant: "warning" }
      );
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
          descriptions[
            diseaseKeys[0]
          ] = `Description: ${firstDiseaseInfo.description.Description}`;

          if (firstDiseaseInfo.diets && firstDiseaseInfo.diets.length > 0) {
            const diets = firstDiseaseInfo.diets
              .map((d: any) => d.Diet)
              .join(", ");
            descriptions[diseaseKeys[0]] += `\nRégimes recommandés: ${diets}`;
          }

          if (
            firstDiseaseInfo.medications &&
            firstDiseaseInfo.medications.length > 0
          ) {
            const medications = firstDiseaseInfo.medications
              .map((m: any) => m.Medication)
              .join(", ");
            descriptions[
              diseaseKeys[0]
            ] += `\nMédicaments recommandés: ${medications}`;
          }

          if (
            firstDiseaseInfo.precautions &&
            firstDiseaseInfo.precautions.length > 0
          ) {
            const precautions = firstDiseaseInfo.precautions
              .map(
                (p: any) =>
                  `\n- ${p.Precaution_1}\n- ${p.Precaution_2}\n- ${p.Precaution_3}\n- ${p.Precaution_4}`
              )
              .join("\n");
            descriptions[diseaseKeys[0]] += `\nPrécautions: ${precautions}`;
          }
        }
      } else {
        for (let i = 0; i < Math.min(4, diseaseKeys.length); i++) {
          const diseaseKey = diseaseKeys[i];
          const diseaseInfo = fetchedPrecaution[diseaseKey];
          if (diseaseInfo && diseaseInfo.description) {
            descriptions[diseaseKey] = diseaseInfo.description.Description;
          }
        }
        enqueueSnackbar(
          "Donnez plus de symptôme pour un peu plus de precision",
          { variant: "info" }
        );
      }
      setDiseaseDescriptions(descriptions);
      setVoice(true);
      setLoading(false);

      const user = getUser();
      const userId = user ? user.id : null;

      const historique = {
        user_id: userId,
        analysis_result: fetchedPrecaution,
      };

      const saveHistorique = await HistoriqueService.saveHistorique(historique);
      console.log(saveHistorique.data);
    } catch (error) {
      console.error("Error fetching precautions:", error);
    }
  }

  return (
    <div className={styles.container}>
      <NavbarConsultation />

      <main className={styles.main}>
        <div className={styles.leftPanel}>
          <input
            type="text"
            placeholder="Symptom 1"
            value={symptome1}
            onChange={handleSymptomeChange(setSymptome1, setSuggestions1)}
          />
          {suggestions1.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions1.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(suggestion, setSymptome1, setSuggestions1)
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            placeholder="Symptom 2"
            value={symptome2}
            onChange={handleSymptomeChange(setSymptome2, setSuggestions2)}
          />
          {suggestions2.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions2.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(suggestion, setSymptome2, setSuggestions2)
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            placeholder="Symptom 3"
            value={symptome3}
            onChange={handleSymptomeChange(setSymptome3, setSuggestions3)}
          />
          {suggestions3.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions3.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(suggestion, setSymptome3, setSuggestions3)
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            placeholder="Symptom 4"
            value={symptome4}
            onChange={handleSymptomeChange(setSymptome4, setSuggestions4)}
          />
          {suggestions4.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions4.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(suggestion, setSymptome4, setSuggestions4)
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
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
                <img
                  src={
                    theme === "dark" ? "/aid-logos-dark.png" : "/aid-logos.png"
                  }
                  alt="Logo"
                  className={styles.logo}
                />
              </div>
            )}
          </div>
          <button onClick={handleDownload}>Enregistrer</button>
        </div>
      </main>
    </div>
  );
}

export default Consulter;
