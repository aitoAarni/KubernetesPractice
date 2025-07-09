import datetime
import string
import random
import time

chars = string.ascii_letters + string.digits + string.punctuation
hash = "".join([random.choice(chars) for _ in range(0, random.randint(48, 64))]).strip()

def get_stamp():
    return f"{datetime.datetime.now()}: {hash}"


def print_loop():
    while True:
        with open("volume/log-output.txt", "w", encoding="utf-8") as f:
            f.write(get_stamp())
        time.sleep(5)

if __name__ == "__main__":
    print_loop()