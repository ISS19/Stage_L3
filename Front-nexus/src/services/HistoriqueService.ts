import axios from "axios";

const HISTORIQUE_API = "http://127.0.0.1:5000/historique/api";

class HistoriqueService {
  saveHistorique(analysisResult: {}) {
    return axios.post(HISTORIQUE_API + "/save-historique", analysisResult);
  }

  getHistorique(){
    return
  }
}

export default new HistoriqueService();
