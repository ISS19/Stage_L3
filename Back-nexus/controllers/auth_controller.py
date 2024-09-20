from flask import request, jsonify
from models.users import User


class AuthController:
    @staticmethod
    def register():
        data = request.get_json()
        nom = data.get("nom")
        prenom = data.get("prenom")
        age = data.get("age")
        email = data.get("email")
        password = data.get("password")
        adresse = data.get("adresse")
        num_tel = data.get("num_tel")
        historique = data.get("historique", [])

        if not nom or not prenom or not age or not password or not adresse:
            return jsonify({"status": False, "message": "Invalid input"}), 400

        if not email and not num_tel:
            return (
                jsonify(
                    {
                        "status": False,
                        "message": "Either email or num_tel must be provided",
                    }
                ),
                400,
            )

        user = User()

        query = {}
        if email:
            query["email"] = email
        if num_tel:
            query["num_tel"] = num_tel

        if user.collection.find_one(query):
            return jsonify({"status": False, "message": "User already exists"}), 400

        user_id = user.create_user(
            nom, prenom, age, email, password, adresse, num_tel, historique
        )
        return jsonify({"status": True, "message": "User registered successfully"}), 201

    @staticmethod
    def login():
        data = request.get_json()
        identifier = data.get("identifier")
        password = data.get("password")

        if not identifier or not password:
            return jsonify({"status": False, "message": "Invalid input"}), 400

        user_model = User()
        user = user_model.verify_user(identifier, password)

        if user:
            user_info = {
                "nom": user.get("nom"),
                "prenom": user.get("prenom"),
                "age": user.get("age"),
                "email": user.get("email"),
                "adresse": user.get("adresse"),
                "num_tel": user.get("num_tel"),
                # Add more fields as needed
            }
            return jsonify({"status": True, "message": "Login successful", "user": user_info}), 200

        return jsonify({"status": False, "message": "Invalid credentials"}), 401

