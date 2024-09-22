from flask import request, jsonify
from models.users import User

class HistoriqueController:
    @staticmethod
    def save_historique():
        
        data = request.get_json()
        user_id = data.get("user_id")
        analysis_result = data.get("analysis_result")  

        if not user_id or not analysis_result:
            return jsonify({"status": False, "message": "Invalid input"}), 400

        user = User()
        
        success = user.save_analysis_result(user_id, analysis_result)

        if success:
            return jsonify({"status": True, "message": "Analysis result saved successfully"}), 200
        else:
            return jsonify({"status": False, "message": "Failed to save analysis result"}), 500

    @staticmethod
    def get_historiques():
        user_id = request.args.get("user_id") 

        if not user_id:
            return jsonify({"status": False, "message": "Missing user_id"}), 400

        user = User()
        historique = user.get_historique(user_id)

        if historique:
            return jsonify({"status": True, "historique": historique}), 200
        else:
            return jsonify({"status": False, "message": "No historique found"}), 404
