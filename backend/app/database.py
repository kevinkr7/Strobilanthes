from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise RuntimeError("Failed to load the Database")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    bind = engine,
    autocommit = False,
    autoflush = False
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
