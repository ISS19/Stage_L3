from flask import current_app
from pymongo import MongoClient
from bson import ObjectId
from deep_translator import GoogleTranslator

class AIModel:
    def __init__(self):
        self.client = MongoClient(current_app.config["MONGO_URI"])
        self.db = self.client["aid-nexus"]
        self.translator = GoogleTranslator(target='fr')  # Initialize translator

    def get_diseases_by_symptoms(self, symptoms):
        # Process and format symptoms
        symptoms = [self.format_symptom(s) for s in symptoms if s]
        if len(symptoms) > 4:
            symptoms = symptoms[:4]

        # Build query based on the number of symptoms
        if len(symptoms) == 4:
            # Use $and if exactly 4 symptoms are provided
            query = {
                "$and": [
                    {"Symptom_1": {"$in": symptoms}},
                    {"Symptom_2": {"$in": symptoms}},
                    {"Symptom_3": {"$in": symptoms}},
                    {"Symptom_4": {"$in": symptoms}},
                ]
            }
        elif len(symptoms) == 3:
            # Use $and if exactly 3 symptoms are provided
            query = {
                "$and": [
                    {"Symptom_1": {"$in": symptoms}},
                    {"Symptom_2": {"$in": symptoms}},
                    {"Symptom_3": {"$in": symptoms}},
                ]
            }
        else:
            # Use $or for less than 3 symptoms
            query = {
                "$or": [
                    {"Symptom_1": {"$in": symptoms}},
                    {"Symptom_2": {"$in": symptoms}},
                    {"Symptom_3": {"$in": symptoms}},
                    {"Symptom_4": {"$in": symptoms}},
                ]
            }

        diseases = self.db["symptoms_df"].find(query)
        
        # Limit the results if only 3 symptoms were provided
        if len(symptoms) == 3:
            diseases = diseases.limit(2)

        # Collect the disease names
        disease_names = {doc["Disease"] for doc in diseases}

        # Translate disease names to French
        disease_info = {}
        for disease_name in disease_names:
            description = self.db["description"].find_one({"Disease": disease_name})
            diets = self.db["diets"].find({"Disease": disease_name})
            medications = self.db["medications"].find({"Disease": disease_name})
            precautions = self.db["precautions_df"].find({"Disease": disease_name})
            workout = self.db["workout_df"].find({"Disease": disease_name})

            # Include translated disease name in the response
            translated_name = self.translate_text(disease_name)
            translated_description = self.translate_text(description)
            disease_info[translated_name] = {
                "description": self.serialize_doc(translated_description),
                "diets": [self.serialize_doc(doc) for doc in diets],
                "medications": [self.serialize_doc(doc) for doc in medications],
                "precautions": [self.serialize_doc(doc) for doc in precautions],
                "workout": [self.serialize_doc(doc) for doc in workout]
            }

        return disease_info,

    def format_symptom(self, symptom):
        return f" {symptom.strip().replace(' ', '_').lower()}"

    def serialize_doc(self, doc):
        if doc is None:
            return doc
        if isinstance(doc, ObjectId):
            return str(doc)
        if isinstance(doc, dict):
            return {k: self.serialize_doc(v) for k, v in doc.items()}
        if isinstance(doc, list):
            return [self.serialize_doc(i) for i in doc]
        return doc

    def translate_text(self, text):
        """Translate the given text to French."""
        if isinstance(text, str):
            return self.translator.translate(text)
        elif isinstance(text, dict):
            return {k: self.translate_text(v) for k, v in text.items()}
        elif isinstance(text, list):
            return [self.translate_text(i) for i in text]
        return text
