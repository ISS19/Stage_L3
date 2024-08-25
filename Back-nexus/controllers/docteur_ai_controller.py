from flask import request, jsonify
from models.docteur_ai import AIModel

class AIController:
    @staticmethod
    def get_disease_by_symptom():
        data = request.get_json()
        symptom = data.get("symptom")

        if not symptom:
            return jsonify({"status": False, "message": "Symptom is required"}), 400

        docteur_ai = AIModel()
        disease_info = docteur_ai.get_diseases_by_symptoms(symptom)

        if not disease_info:
            return jsonify({"status": False, "message": "No diseases found for the given symptom"}), 404

        return jsonify({"status": True, "data": disease_info}), 200
