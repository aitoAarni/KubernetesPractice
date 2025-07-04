import datetime
import string
import random
import time
import threading
from fastapi import FastAPI

chars = string.ascii_letters + string.digits + string.punctuation
hash = "".join([random.choice(chars) for i in range(0, random.randint(48, 64))]).strip()

def get_stamp():
    return f"{datetime.datetime.now()}: {hash}"

# if __name__ == "__main__":
app = FastAPI()

@app.get("/")
def get_samp():
    return {"message": get_stamp()}

def print_loop():
    while True:
        print(get_stamp())
        time.sleep(5)

@app.on_event("startup")
def start_background_task():
    thread = threading.Thread(target=print_loop, daemon=True)
    thread.start()