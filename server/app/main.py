from fastapi import Depends, FastAPI
from app.database import Base, engine, get_db
from app import models
from app.models import Story
from sqlalchemy.orm import Session
from app.models import Story, StoryScene
from app.schemas import (
    StoryRequest,
    StoryResponse,
    ContinueStoryRequest,
    SceneResponse,
)
from fastapi.middleware.cors import CORSMiddleware
import json
from app.services.gemini import (
    generate_first_scene,
    generate_next_scene,
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "AI Adventure API is running!"}


@app.post("/stories", response_model=StoryResponse)
def create_story(
    story: StoryRequest,
    db: Session = Depends(get_db),
):
    print("CREATE STORY: started")
    generated_story = generate_first_scene(
        character_name=story.character_name,
        scene=story.scene,
        world=story.world,
        page_count=story.page_count,
        mood=story.mood,
    )
    print("CREATE STORY: generated_story", generated_story)
    new_story = Story(
        user_id=story.user_id,
        character_name=story.character_name,
        scene=story.scene,
        world=story.world,
        page_count=story.page_count,
        mood=story.mood,
    )

    db.add(new_story)
    db.commit()
    db.refresh(new_story)

    first_scene = StoryScene(
        story_id=new_story.id,
        step=1,
        text=generated_story["scene"]["text"],
        choices=json.dumps(generated_story["scene"]["choices"]),
        is_ending=story.page_count == 1,
    )

    db.add(first_scene)
    db.commit()

    return {
        "id": new_story.id,
        **generated_story,
        "current_step": 1,
        "total_steps": story.page_count,
        "scene": {
            **generated_story["scene"],
            "is_ending": story.page_count == 1,
        },
    }
@app.post("/stories/continue", response_model=SceneResponse)
def continue_story(story: ContinueStoryRequest):

    next_step = story.current_step + 1

    generated_scene = generate_next_scene(
        current_scene=story.current_scene,
        choice=story.choice,
        current_step=story.current_step,
        total_steps=story.total_steps,
    )

    return {
        "scene": {
            **generated_scene["scene"],
            "is_ending": next_step == story.total_steps,
        },
        "current_step": next_step,
        "total_steps": story.total_steps,
    }

@app.get("/stories/{user_id}", response_model=list[StoryResponse])
def get_user_stories(
    user_id: str,
    db: Session = Depends(get_db),
):
    stories = (
        db.query(Story)
        .filter(Story.user_id == user_id)
        .order_by(Story.created_at.desc())
        .all()
    )

    return stories
