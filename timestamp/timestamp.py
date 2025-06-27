import datetime
import string
import random
import time

chars = string.ascii_letters + string.digits + string.punctuation
hash = "".join([random.choice(chars) for i in range(0, random.randint(48, 64))]).strip()

while True:
    print(f"{datetime.datetime.now()}: {hash}")
    time.sleep(5)
