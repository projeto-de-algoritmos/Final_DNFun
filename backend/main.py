from fastapi import FastAPI
import controller.hirschberg_controller as controller

app = FastAPI()


@app.post('/check/')
async def hirschberg_check(edit_params):
    s_x = edit_params['s1']
    s_y = edit_params['s2']
    alphabet = edit_params['alpha']
    gap_cost = edit_params['gap']

    return controller.hirschberg(s_x, s_y, alphabet, gap_cost)
