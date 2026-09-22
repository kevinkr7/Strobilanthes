from pydantic import BaseModel, EmailStr
from datetime import date

class RegistrationRequest(BaseModel):
    name : str
    email : EmailStr
    dob : date
    password : str
    confirm_password : str
