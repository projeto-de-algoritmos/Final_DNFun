from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import controller.hirschberg_controller as controller

app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_headers=["*"]
        )
class EditParams(BaseModel):
    s1: str
    s2: str
    alpha: dict
    gap: int


@app.post('/check/')
async def hirschberg_check(edit_params: EditParams):
    print('Post params: ',  edit_params)
    s_x = edit_params.s1
    s_y = edit_params.s2
    alphabet = edit_params.alpha
    gap_cost = edit_params.gap

    return controller.hirschberg_controller(s_x, s_y, alphabet, gap_cost)
