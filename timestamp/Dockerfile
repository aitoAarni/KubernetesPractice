FROM python:3.10-slim

WORKDIR /usr/src/app


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY timestamp.py .

EXPOSE 8000

CMD ["uvicorn", "timestamp.py", "--host", "127.0.0.1", "--port", "8000"]
