from flask import Flask
from flask_cors import CORS
from config import Config
from routes.auth_routes import auth_bp
from routes.docteur_ai_routes import ai_bp

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(ai_bp, url_prefix="/ai")

if __name__ == "__main__":
    app.run(debug=True)
