from fastapi import FastAPI
from fastapi.responses import PlainTextResponse
import requests

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

def get_pings():
    response = requests.get("http://pingpong-svc:5678/pings")
    json_data = response.json()
    return int(json_data["counter"])



@app.get("/", response_class=PlainTextResponse)
def get_samp():
    ping_counter = get_pings()
    message = f"{get_stamp()}\nPing / Pongs: {ping_counter}"
    return message

