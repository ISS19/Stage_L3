from flask import Blueprint
from controllers.historique_controller import HistoriqueController

historique_bp = Blueprint("historique", __name__)

historique_bp.route("/api/save-historique", methods=["POST"])(HistoriqueController.save_historique)
historique_bp.route("/api/list-historique", methods=["GET"])(HistoriqueController.get_historiques)