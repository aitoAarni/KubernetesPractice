import datetime
import string
import random
import time
import os

chars = string.ascii_letters + string.digits + string.punctuation
hash = "".join([random.choice(chars) for _ in range(0, random.randint(48, 64))]).strip()

def get_stamp():
    return f"{datetime.datetime.now()}: {hash}"


def print_loop():
    message = os.getenv("MESSAGE", "no message set")
    try:
        with open("config/information.txt", "r", encoding="utf-8") as file:
            file_content = file.read().strip()
    except Exception as e:
        file_content = f"(error reading file: {e})"


    text = f"file content: {file_content}\nenv variable: MESSAGE={message}\n"

    while True:

        
        with open("volume/log-output.txt", "w", encoding="utf-8") as f:
            f.write(text + get_stamp())
        time.sleep(5)

if __name__ == "__main__":
    print_loop()