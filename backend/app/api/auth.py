from fastapi import APIRouter
from app.schemas.auth import RegistrationRequest

router = APIRouter()

@router.post("/register")
def register(request : RegistrationRequest):
    return {
        "message" : "Request received",
        "name" : request.name,
        "email" : request.email,
        "dob" : request.dob,
        "password" : request.password,
        "confirm_password" : request.confirm_password
    }

