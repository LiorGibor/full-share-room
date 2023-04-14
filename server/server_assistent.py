from flask import Flask, request, jsonify
import sqlite3
import hashlib
import secrets

DATABASE = 'server.db'


def init_db():
    create_users_table()
    create_groups_table()
    create_group_members_table()
    create_faults_table()
    create_missions_table()
    create_bills_table()
    create_outcomes_table()


def create_users_table():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT NOT NULL,
                            hashedPassword TEXT NOT NULL,
                            email TEXT NOT NULL,
                            fullName TEXT NOT NULL,
                            profilePicture TEXT,
                            dateOfBirth TEXT,
                            createdAt TIMESTAMP NOT NULL,
                            updatedAt TIMESTAMP NOT NULL,
                            lastLogin TIMESTAMP NOT NULL,
                            role TEXT NOT NULL
                        )''')

    conn.commit()
    conn.close()


def create_groups_table():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS `groups` (
                        group_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        group_name TEXT NOT NULL,
                        group_details TEXT
                    )''')

    conn.commit()
    conn.close()


def create_group_members_table():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS group_members (
                    group_member_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    user_join_to_group INTEGER NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES groups (group_id),
                    FOREIGN KEY (user_id) REFERENCES users (id),

                    UNIQUE(group_id, user_id)
                )''')

    conn.commit()
    conn.close()


def create_faults_table():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS faults (
                    fault_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    fault_name TEXT NOT NULL,
                    fault_description TEXT,
                    created_date TIMESTAMP NOT NULL,
                    fixed BOOLEAN NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES groups (group_id)
                )''')

    conn.commit()
    conn.close()


def create_missions_table():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS missions (
                    mission_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    mission_name TEXT NOT NULL,
                    mission_description TEXT,
                    created_date TIMESTAMP NOT NULL,
                    completed BOOLEAN NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES groups (group_id)
                )''')

    conn.commit()
    conn.close()


def create_bills_table():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS bills (
                    bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    group_member_id INTEGER,
                    bill_name TEXT NOT NULL,
                    amount REAL NOT NULL,
                    bill_date TIMESTAMP,
                    created_date TIMESTAMP NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES groups (group_id),
                    FOREIGN KEY (group_member_id) REFERENCES group_members (group_member_id)
                )''')

    conn.commit()
    conn.close()


def create_outcomes_table():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS outcomes (
                    outcome_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_member_id INTEGER NOT NULL,
                    outcome_name TEXT NOT NULL,
                    outcome_description TEXT,
                    amount REAL NOT NULL,
                    outcome_date TIMESTAMP,
                    created_date TIMESTAMP NOT NULL,

                    FOREIGN KEY (group_member_id) REFERENCES group_members (group_member_id)
                )''')

    conn.commit()
    conn.close()


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
