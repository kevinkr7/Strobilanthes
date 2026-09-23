from datetime import date, datetime, timezone

from sqlalchemy import Integer, String, Date, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class User(Base):
    __tablename__ = "users"
    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    name : Mapped[str] = mapped_column(String, nullable=False)
    email : Mapped[str] = mapped_column(String, unique=True, nullable=False)
    dob : Mapped[date] = mapped_column(Date, nullable=False)
    password_hash : Mapped[str] = mapped_column(String, nullable=False)
    created_at : Mapped[datetime] = mapped_column(DateTime(timezone=True), default= lambda : datetime.now(timezone.utc))
