from pydantic import BaseModel


class StoryRequest(BaseModel):
    user_id: str
    character_name: str
    scene: str
    world: str
    page_count: int
    mood: str


class Scene(BaseModel):
    text: str
    choices: list[str]
    is_ending: bool


class StoryResponse(BaseModel):
    id: int
    title: str
    scene: Scene
    current_step: int
    total_steps: int


class ContinueStoryRequest(BaseModel):
    current_scene: str
    choice: str
    current_step: int
    total_steps: int


class SceneResponse(BaseModel):
    scene: Scene
    current_step: int
    total_steps: int