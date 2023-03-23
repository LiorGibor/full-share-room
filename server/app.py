import datetime
import sqlite3
import bcrypt
from flask import Flask, request, jsonify

app = Flask(__name__)
app.debug = True
connect_to_db = sqlite3.connect('server.db')
db = connect_to_db.cursor()


@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    db.execute('SELECT hashedPassword FROM users WHERE username = ?', (username,))
    hashed_password_result = db.fetchone()
    if hashed_password_result is not None:
        stored_password = hashed_password_result[0]
        if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
            return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'Incorrect password'}), 401
    else:
        return jsonify({'status': 'user not found'}), 404
    
    

@app.route('/adduser', methods=['POST'])
def add_user():
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    full_name = request.form['full_name']
    profile_picture = request.form['profile_picture']
    date_of_birth = request.form['date_of_birth']
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()
    last_login = datetime.datetime.now()
    role = 'user'
    profile_picture = 'C:\\Users\\lmaim\\Desktop\\bsc\\4th_year\\Final_progect\\alternative_final_project\\client\\assets\\profilePic.png'
    if validate_new_user(username, password, email, full_name, date_of_birth) is not True:
        return validate_new_user(username, password, email, full_name, date_of_birth)
    db.execute('INSERT INTO users (username, hashedPassword, email, full_name, profile_picture, date_of_birth, created_at, updated_at, last_login, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
               , (username, hashed_password, email, full_name, profile_picture, date_of_birth, created_at, updated_at, last_login, role))
    connect_to_db.commit()
    connect_to_db.close()
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
    app.run(debug=True)
    
