from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()


def get_stamp():
    text = ""
    with open("volume/log-output.txt") as f:
        text = f.readline().replace("\n", "")
    return text

def get_pingpongs():
    try:
        with open("persistentVolume/counter.txt", encoding="utf-8") as file:
            line = file.readline()
            value = int(line.strip())
            return value
    except:
        print("Value could not be read")
        return 0

@app.get("/", response_class=PlainTextResponse)
def get_samp():
    message = f"{get_stamp()}\nPing / Pongs: {get_pingpongs()}"
    return message

