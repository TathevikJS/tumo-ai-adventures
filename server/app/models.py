from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Story(Base):
    __tablename__ = "stories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    user_id: Mapped[str] = mapped_column(String, index=True)

    character_name: Mapped[str] = mapped_column(String)
    scene: Mapped[str] = mapped_column(Text)
    world: Mapped[str] = mapped_column(String)
    page_count: Mapped[int] = mapped_column(Integer)
    mood: Mapped[str] = mapped_column(String)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

class StoryScene(Base):
    __tablename__ = "story_scenes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    story_id: Mapped[int] = mapped_column(Integer, index=True)

    step: Mapped[int] = mapped_column(Integer)

    text: Mapped[str] = mapped_column(Text)

    choices: Mapped[str] = mapped_column(Text)

    is_ending: Mapped[bool] = mapped_column(default=False)