import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "secret_key")
    MONGO_URI = os.getenv(
        "MONGO_URI",
        "mongodb+srv://iss19:boobadkr123@cluster0.yhsfrfj.mongodb.net/",
    )
