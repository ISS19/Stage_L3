from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson import ObjectId 


class User:
    def __init__(self):
        self.client = MongoClient(current_app.config["MONGO_URI"])
        self.db = self.client["aid-nexus"]  # Use the database name
        self.collection = self.db["aid_users"]

    def create_user(
        self, nom, prenom, age, email, password, adresse, num_tel, historique
    ):
        hashed_password = generate_password_hash(password)
        user = {
            "nom": nom,
            "prenom": prenom,
            "age": age,
            "email": email,
            "password": hashed_password,
            "adresse": adresse,
            "num_tel": num_tel,
            "historique": historique,
        }
        result = self.collection.insert_one(user)
        return result.inserted_id

    def verify_user(self, identifier, password):
        user = self.collection.find_one({
            "$or": [
                {"email": identifier},
                {"num_tel": identifier}
            ]
        })
        if user and check_password_hash(user["password"], password):
            return user
        return False

    def get_user(self, user_id):
        user = self.collection.find_one({"_id": user_id})
        return user
    
    def save_analysis_result(self, user_id, analysis_result):
        result = self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$push": {"historique": analysis_result}}
        )
        return result.modified_count > 0
    
    def get_historique(self, user_id):
        user = self.collection.find_one({"_id": ObjectId(user_id)}, {"historique": 1})
        if user and "historique" in user:
            return user["historique"]
        return []

