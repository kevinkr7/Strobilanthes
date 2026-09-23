from fastapi import APIRouter, Depends
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import RegistrationRequest

from app.models.user import User

router = APIRouter()
password_hash = PasswordHash.recommended()

@router.post("/register")
def register(request : RegistrationRequest, db : Session = Depends(get_db)):
    result = db.execute(select(User).where(User.email==request.email))
    existing_user = result.scalar_one_or_none()

    if existing_user:
        return {"message" : "Email already exists"}

    hashed_password = password_hash.hash(request.password)

    user = User(
        name=request.name,
        email=request.email,
        dob=request.dob,
        password_hash=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message" : "Registration Successful",
        "name" : request.name,
        "email" : request.email,
        "dob" : request.dob
    }

