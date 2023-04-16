import datetime
import hashlib
import sqlite3
import bcrypt
from flask import Flask, request, jsonify, g
import server_assistent
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
server_assistent.init_db()


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Invalid input"}), 400

    username = data['username']
    password = data['password']

    # Check if the user exists in the database by username
    user, success = server_assistent.query_db("SELECT * FROM users WHERE username=?", (username,), one=True)

    if success and user:
        # User found, compare the stored password hash with the provided password
        stored_hashed_password = user[2]  # Assuming the column name is 'hashedPassword'
        if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
            # Passwords match, generate token and return it with status code 200
            token = server_assistent.generate_token()
            return jsonify({"token": token}), 200
        else:
            # Passwords don't match, return error message
            return jsonify({"message": "Invalid username or password"}), 401
    else:
        # User not found or query failed, return error message
        return jsonify({"message": "Invalid username or password"}), 401


@app.route('/adduser', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']
    full_name = data['full_name']
    # profile_picture = data['profile_picture']
    date_of_birth = data['date_of_birth']
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()
    last_login = datetime.datetime.now()
    role = 'user'
    # profile_picture = 'C:\\Users\\lmaim\\Desktop\\bsc\\4th_year\\Final_progect\\alternative_final_project\\client\\assets\\profilePic.png'
    if validate_new_user(username, password, email, full_name, date_of_birth) is not True:
        return jsonify({'status': 'fail'}), 400
    result, success = server_assistent.query_db(
        'INSERT INTO users (username, hashedPassword, email, fullName, dateOfBirth, createdAt, updatedAt, lastLogin, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        (
            username, hashed_password, email, full_name, date_of_birth, created_at, updated_at, last_login,
            role))

    if success:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'fail'}), 500


@app.route('/open_call', methods=['POST'])
def open_call():
    data = request.get_json()
    email = data['email']
    fault_name = data['subject']
    fault_description = data['summary']

    user_id, success = server_assistent.query_db('SELECT id FROM users WHERE email=?', (email,),True)
    user_id = user_id[0]
    if success and user_id:
        group_id, success = server_assistent.query_db('SELECT group_id FROM group_members where user_id=?',
                                                      (user_id,),True)
        group_id = group_id[0]
        created_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        result, success = server_assistent.query_db('INSERT INTO faults (group_id, fault_name, fault_description,'
                                                    ' created_date, fixed) VALUES (?,?,?,?,?)',
                                                    (group_id, fault_name, fault_description, created_date, False))
        if success:
            return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'Failed to add user to group'}), 500


@app.route('/add_group', methods=['POST'])
def add_group():
    data = request.get_json()

    user_name = data['username']
    group_name = data['group_name']
    group_description = data['group_description']

    user_id_result, success = server_assistent.query_db('SELECT id FROM users WHERE username=?', (user_name,), True)
    if not success or user_id_result is None:
        return jsonify({'status': 'fail', 'message': 'User not found'}), 404

    user_id = user_id_result[0]
    group_id, success = server_assistent.query_db('INSERT INTO groups (group_name, group_details) VALUES (?, ?)',
                                                  (group_name, group_description,))
    if not success:
        return jsonify({'status': 'fail', 'message': 'Failed to create group'}), 500
    created_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    _, success = server_assistent.query_db('INSERT INTO group_members (group_id, user_id, user_join_to_group) '
                                           'VALUES (?,?,?)', (group_id, user_id, created_date))
    if success:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'fail', 'message': 'Failed to add user to group'}), 500


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
