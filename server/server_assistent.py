from flask import Flask, request, jsonify
import sqlite3
import hashlib
import secrets

DATABASE = 'your_database.db'


def query_db(query, args=(), one=False):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute(query, args)
    result = cur.fetchall()
    conn.close()
    return (result[0] if result else None) if one else result


def generate_token():
    return secrets.token_hex(16)
