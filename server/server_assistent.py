from flask import Flask, request, jsonify
import sqlite3
import hashlib
import secrets

DATABASE = 'server.db'


def query_db(query, args=(), one=False):
    try:
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        cur.execute(query, args)
        conn.commit()  # Add this line if your query modifies the database (INSERT, UPDATE, DELETE)

        result = cur.fetchall()
        conn.close()

        # Return a tuple containing the result and a boolean indicating success
        return result if not one else (result[0] if result else None), True

    except sqlite3.Error as error:
        print("An error occurred:", error)
        if conn:
            conn.close()

        # Return None and a boolean indicating failure
        return None, False


def generate_token():
    return secrets.token_hex(16)
