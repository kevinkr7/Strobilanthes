from fastapi import FastAPI
from app.schemas.auth import RegistrationRequest
from app.api.auth import router as auth_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth")

@app.get("/")
def root() :
    return {"message" : "Strobintanthes is running happily!"}
