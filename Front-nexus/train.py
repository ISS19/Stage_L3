import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.feature_extraction.text import TfidfVectorizer


data = {
    'symptoms': [
        'mal à la tête et fièvre', 
        'fièvre et fatigue', 
        'douleur thoracique', 
        'toux et fièvre', 
        'maux de tête et fatigue', 
        'maux de ventre', 
        'douleur dans la poitrine', 
        'toux et mal de gorge', 
        'fièvre et douleur musculaire', 
        'maux de tête et nausées'
    ],
    'disease': [
        'grippe', 
        'grippe', 
        'crise cardiaque', 
        'pneumonie', 
        'grippe', 
        'intoxication alimentaire', 
        'crise cardiaque', 
        'rhume', 
        'grippe', 
        'migraine'
    ],
    'medication': [
        'Paracetamol, Rest, Hydration', 
        'Paracetamol, Rest, Hydration', 
        'Aspirin, Emergency Assistance', 
        'Antibiotics, Rest, Hydration', 
        'Paracetamol, Rest, Hydration', 
        'Hydration, Electrolytes, Rest', 
        'Aspirin, Emergency Assistance', 
        'Cough Syrup, Rest, Hydration', 
        'Paracetamol, Rest, Hydration', 
        'Ibuprofen, Rest, Hydration'
    ]
}

df = pd.DataFrame(data)

# Séparation des caractéristiques (symptoms) et de l'étiquette (disease)
X = df['symptoms']
y = df['disease']

# Conversion des symptômes textuels en vecteurs numériques avec TF-IDF
vectorizer = TfidfVectorizer()
X_tfidf = vectorizer.fit_transform(X)

# Division du jeu de données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.3, random_state=42)

# Création et entraînement du modèle Random Forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Prédictions sur l'ensemble de test
y_pred = model.predict(X_test)

# Évaluation du modèle
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Accuracy: {accuracy}")
print("Classification Report:")
print(report)

# Fonction pour prédire la maladie à partir des symptômes et donner une prescription
def predict_disease_and_prescription(symptoms):
    symptoms_tfidf = vectorizer.transform([symptoms])
    prediction = model.predict(symptoms_tfidf)
    disease = prediction[0]
    prescription = df[df['disease'] == disease]['medication'].values[0]
    return disease, prescription

# Interaction avec l'utilisateur
while True:
    symptoms_input = input("Entrez vos symptômes (ou 'exit' pour quitter) : ")
    if symptoms_input.lower() == 'exit':
        break
    predicted_disease, prescription = predict_disease_and_prescription(symptoms_input)
    print(f"Pour les symptômes '{symptoms_input}', la maladie prédite est: {predicted_disease}")
    print(f"La prescription recommandée est: {prescription}")
