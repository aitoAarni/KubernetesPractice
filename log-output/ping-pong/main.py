from fastapi import FastAPI

app = FastAPI()

def get_counter():
    try:
        with open("persistentVolume/counter.txt", encoding="utf-8") as file:
            line = file.readline()
            value = int(line.strip())
            return value
            
    except:
        print("Error reading counter from file")
        return 0

def save_counter(counter: str):
    with open("persistentVolume/counter.txt", "w", encoding="utf-8") as file:
        file.write(str(counter))

@app.get("/pingpong")
def pingpong():
    counter = get_counter()
    counter += 1
    response = f"pong {counter}"
    save_counter(str(counter))
    return {"message": response}

@app.get("/pings")
def pings():
    counter = get_counter()
    save_counter(str(counter))
    return {"counter": str(counter)}