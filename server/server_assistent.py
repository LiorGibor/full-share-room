from flask import Flask, request, jsonify
import sqlite3
import hashlib
import secrets

DATABASE = 'server.db'

def get_db_connection():
    return sqlite3.connect(DATABASE)

def start_connection():
    conn = get_db_connection()
    return conn.cursor()

def finish_connection():
    conn = get_db_connection()
    conn.commit()
    conn.close()

def create_table(create_table_string):
    cur = start_connection()
    cur.execute(create_table_string)
    finish_connection()


def init_db():
    create_users_table()
    create_groups_table()
    create_group_members_table()
    create_faults_table()
    create_missions_table()
    create_bills_table()
    create_outcomes_table()
    create_notifications_table()


def create_users_table():
    create_table('''CREATE TABLE IF NOT EXISTS users (
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


def create_groups_table():
    create_table('''CREATE TABLE IF NOT EXISTS `groups` (
                        group_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        group_name TEXT NOT NULL,
                        group_details TEXT
                    )''')


def create_group_members_table():
    create_table('''CREATE TABLE IF NOT EXISTS group_members (
                    group_member_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    user_join_to_group INTEGER NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES groups (group_id),
                    FOREIGN KEY (user_id) REFERENCES users (id),

                    UNIQUE(group_id, user_id)
                )''')


def create_faults_table():
    create_table('''CREATE TABLE IF NOT EXISTS faults (
                    fault_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    fault_name TEXT NOT NULL,
                    fault_description TEXT,
                    created_date TIMESTAMP NOT NULL,
                    fixed BOOLEAN NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES groups (group_id)
                )''')


def create_missions_table():
    create_table('''CREATE TABLE IF NOT EXISTS missions (
                    mission_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    mission_name TEXT NOT NULL,
                    mission_description TEXT,
                    created_date TIMESTAMP NOT NULL,
                    completed BOOLEAN NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES groups (group_id)
                )''')



def create_bills_table():
    create_table('''CREATE TABLE IF NOT EXISTS bills (
                    bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    user_id INTEGER,
                    bill_name TEXT NOT NULL,
                    amount REAL NOT NULL,
                    bill_date TIMESTAMP,
                    created_date TIMESTAMP NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES group_members (group_id),
                    FOREIGN KEY (user_id) REFERENCES group_members (user_id)
                )''')


def create_outcomes_table():
    create_table('''CREATE TABLE IF NOT EXISTS outcomes (
                    outcome_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    outcome_name TEXT NOT NULL,
                    outcome_description TEXT,
                    amount REAL NOT NULL,
                    outcome_date TIMESTAMP,
                    created_date TIMESTAMP NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES group_members (group_id),
                    FOREIGN KEY (user_id) REFERENCES group_members (user_id)
                )''')



def create_notifications_table():
    create_table('''CREATE TABLE IF NOT EXISTS notifications (
                    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    notification_name TEXT NOT NULL,
                    created_date TIMESTAMP NOT NULL,

                    FOREIGN KEY (group_id) REFERENCES group_members (group_id),
                    FOREIGN KEY (user_id) REFERENCES group_members (user_id)
                )''')


def query_db(query, args=(), one=False):
    try:
        cur = start_connection()
        cur.execute(query, args)
        if query.strip().upper().startswith("INSERT"):
            last_row_id = cur.lastrowid
            conn.commit()
            conn.close()
            return last_row_id, True
        conn.commit()  # Add this line if your query modifies the database (INSERT, UPDATE, DELETE)

        result = cur.fetchall()
        if query.strip().upper().startswith("DELETE"):
            result =cur.rowcount
            return result, True
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
