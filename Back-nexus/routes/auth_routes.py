from flask import Blueprint
from controllers.auth_controller import AuthController

auth_bp = Blueprint("auth", __name__)

auth_bp.route("/api/register", methods=["POST"])(AuthController.register)
auth_bp.route("/api/login", methods=["POST"])(AuthController.login)
