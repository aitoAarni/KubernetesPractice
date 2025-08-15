from fastapi import FastAPI, HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = FastAPI()

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "postgres-svc"),
    "database": os.getenv("DB_NAME", "mydb"),
    "user": os.getenv("DB_USER", "myuser"),
    "password": os.getenv("DB_PASSWORD", "mypassword"),
    "port": os.getenv("DB_PORT", "5432")
}

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.Error as e:
        
        raise HTTPException(status_code=500, detail="Database connection failed")

def init_database():
    """Initialize the database table if it doesn't exist"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Create table if it doesn't exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS counter (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) UNIQUE NOT NULL,
                value INTEGER NOT NULL DEFAULT 0
            )
        """)
        cursor.execute("""
            INSERT INTO counter (name, value) 
            VALUES ('ping_counter', 0) 
            ON CONFLICT (name) DO NOTHING
        """)
        
        conn.commit()
        
    except psycopg2.Error as e:
        print(e)
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def get_counter():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT value FROM counter WHERE name = 'ping_counter'")
        result = cursor.fetchone()
        
        if result:
            return result[0]
        else:
            return 0
            
    except psycopg2.Error as e:
        print(e)
        return 0
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def save_counter(counter_value: int):
    """Save the counter value to database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            UPDATE counter 
            SET value = %s 
            WHERE name = 'ping_counter'
        """, (counter_value,))
        
        conn.commit()
         
    except psycopg2.Error as e:
        print(e)
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail="Failed to save counter")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.on_event("startup")
async def startup_event():
    init_database()

@app.get("/")
def health_check():
    """Health check endpoint for Ingress and load balancer probes"""
    return {"status": "healthy", "service": "pingpong"}


@app.get("/pingpong")
def pingpong():
    counter = get_counter()
    counter += 1
    response = f"pong {counter}"
    save_counter(counter)
    return {"message": response}

@app.get("/pings")
def pings():
    counter = get_counter()
    return {"counter": str(counter)}