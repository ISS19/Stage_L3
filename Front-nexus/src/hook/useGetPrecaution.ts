import AIService from "@/services/AIService";
import React, { useState } from "react";

const useGetPrecaution = () => {
  const [precaution, setPrecaution] = useState([]);
  const [loading, setLoading] = useState(false);

  function getPrecaution(symptome: string[]) {
    setLoading(true);
    AIService.getDiseasePrecaution(symptome)
    .then((res) => {

      console.log(res.data.data[0]);
      setPrecaution(res.data.data[0]);

      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching precautions:", error);
      setLoading(false);
    });

  }

  return { getPrecaution, precaution };
};

export default useGetPrecaution;
