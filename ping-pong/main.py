from fastapi import FastAPI

app = FastAPI()

counter = 0

@app.get("/pingpong")
def pingpong():
    global counter
    response = f"pong {counter}"
    counter += 1
    return {"message": response}