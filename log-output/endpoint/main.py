from fastapi import FastAPI

app = FastAPI()


def get_stamp():
    text = ""
    with open("volume/log-output.txt") as f:
        text = f.readline().replace("\n", "")
    return text

@app.get("/")
def get_samp():
    return {"message": get_stamp()}

