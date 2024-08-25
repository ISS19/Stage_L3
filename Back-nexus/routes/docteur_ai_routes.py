from flask import Blueprint
from controllers.docteur_ai_controller import AIController

ai_bp = Blueprint('ai', __name__)

ai_bp.route('/api/disease', methods=['GET'])(AIController.get_disease_by_symptom)
