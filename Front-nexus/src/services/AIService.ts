import axios from "axios";

const AI_API = "http://127.0.0.1:5000/ai/api/disease";

class AiService {
  getDiseasePrecaution(symptome: string[] = []) {
    return axios.post(AI_API, {
      symptom: symptome,
    });
  }
}

export default new AiService();
