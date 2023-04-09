import datetime
import hashlib
import sqlite3
import bcrypt
from flask import Flask, request, jsonify, g
import server_assistent

app = Flask(__name__)


def get_db():
    """Get a new database connection"""
    if 'db' not in g:
        g.db = sqlite3.connect('server.db')
    return g.db


@app.teardown_appcontext
def close_db(error):
    """Close the database connection at the end of the request"""
    db = g.pop('db', None)
    if db is not None:
        db.close()


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Invalid input"}), 400

    username = data['username']
    password = data['password']

    # Encrypt the password using SHA-256
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    # Check if the user exists in the database
    user = server_assistent.query_db("SELECT * FROM users WHERE name=? AND hashedPassword=?", (username, password_hash),
                                     one=True)

    if user:
        # User found, generate token and return it with status code 200
        token = server_assistent.generate_token()
        return jsonify({"token": token}), 200
    else:
        # User not found, return error message
        return jsonify({"message": "Invalid username or password"}), 401


@app.route('/adduser', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']
    full_name = data['full_name']
    profile_picture = data['profile_picture']
    date_of_birth = data['date_of_birth']
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()
    last_login = datetime.datetime.now()
    role = 'user'
    profile_picture = 'C:\\Users\\lmaim\\Desktop\\bsc\\4th_year\\Final_progect\\alternative_final_project\\client\\assets\\profilePic.png'
    if validate_new_user(username, password, email, full_name, date_of_birth) is not True:
        return validate_new_user(username, password, email, full_name, date_of_birth)
    db = get_db()
    db.execute(
        'INSERT INTO users (name, hashedPassword, email, fullName, profilePicture, dateOfBirth, createdAt, updatedAt, lastLogin, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        (
        username, hashed_password, email, full_name, profile_picture, date_of_birth, created_at, updated_at, last_login,
        role))
    db.commit()
    return jsonify({'status': 'success'}), 200


def validate_new_user(username, password, email, full_name, date_of_birth):
    if len(username) < 4:
        return jsonify({'status': 'Username must be at least 4 characters'}), 400
    if len(password) < 8:
        return jsonify({'status': 'Password must be at least 8 characters'}), 400
    if len(email) < 5:
        return jsonify({'status': 'Email must be at least 5 characters'}), 400
    if '@' not in email:
        return jsonify({'status': 'Email must contain @'}), 400
    if '.' not in email:
        return jsonify({'status': 'Email must contain .'}), 400
    if len(full_name) < 5:
        return jsonify({'status': 'Full name must be at least 5 characters'}), 400
    if len(date_of_birth) < 5:
        return jsonify({'status': 'Date of birth must be at least 5 characters'}), 400
    return True


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

