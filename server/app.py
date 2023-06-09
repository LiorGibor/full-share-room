import datetime
import hashlib
import json
import sqlite3
import bcrypt
from flask import Flask, request, jsonify, g
import server_assistent
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
server_assistent.init_db()


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"message": "Invalid input"}), 400

    email = data["email"]
    password = data["password"]

    # Check if the user exists in the database by username
    user, success = server_assistent.query_db(
        "SELECT * FROM users WHERE email=?", (email,), one=True
    )

    if success and user:
        # User found, compare the stored password hash with the provided password
        # Assuming the column name is 'hashedPassword'
        stored_hashed_password = user[2]
        if bcrypt.checkpw(password.encode("utf-8"), stored_hashed_password):
            # Passwords match, generate token and return it with status code 200
            token = server_assistent.generate_token()
            return jsonify({"token": token}), 200
        else:
            # Passwords don't match, return error message
            return jsonify({"message": "Invalid username or password"}), 401
    else:
        # User not found or query failed, return error message
        return jsonify({"message": "Invalid username or password"}), 401


@app.route("/adduser", methods=["POST"])
def add_user():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    email = data["email"]
    full_name = data["full_name"]
    # profile_picture = data['profile_picture']
    date_of_birth = data["date_of_birth"]
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()
    last_login = datetime.datetime.now()
    role = "user"
    # profile_picture = 'C:\\Users\\lmaim\\Desktop\\bsc\\4th_year\\Final_progect\\alternative_final_project\\client\\assets\\profilePic.png'
    if (
        validate_new_user(username, password, email, full_name, date_of_birth)
        is not True
    ):
        return jsonify({"status": "fail"}), 400
    result, success = server_assistent.query_db(
        "INSERT INTO users (username, hashedPassword, email, fullName, dateOfBirth, createdAt, updatedAt, lastLogin, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            username,
            hashed_password,
            email,
            full_name,
            date_of_birth,
            created_at,
            updated_at,
            last_login,
            role,
        ),
    )

    if success:
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"status": "fail"}), 500


@app.route("/open_call", methods=["POST"])
def open_call():
    data = request.get_json()
    email = data["email"]
    fault_name = data["subject"]
    fault_description = data["summary"]

    user_id, success = server_assistent.query_db(
        "SELECT id FROM users WHERE email=?", (email,), True
    )
    user_id = user_id[0]
    if success and user_id:
        group_id, success = server_assistent.query_db(
            "SELECT group_id FROM group_members where user_id=?", (user_id,), True
        )
        group_id = group_id[0]
        created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        result, success = server_assistent.query_db(
            "INSERT INTO faults (group_id, fault_name, fault_description,"
            " created_date, fixed) VALUES (?,?,?,?,?)",
            (group_id, fault_name, fault_description, created_date, False),
        )
        if success:
            return jsonify({"status": "success"}), 200
        else:
            return (
                jsonify({"status": "fail", "message": "Failed to add user to group"}),
                500,
            )


@app.route("/delete_call", methods=["POST"])
def delete_call():
    data = request.get_json()
    fault_id = data["fault_id"]

    deleted_row, success = server_assistent.query_db(
        "DELETE FROM faults WHERE fault_id = ?", (fault_id,), True
    )
    if success:
        if deleted_row:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "no row deleted"}), 500
    else:
        return jsonify({"status": "fail", "message": "Failed to connect to DB"}), 500


@app.route("/add_group", methods=["POST"])
def add_group():
    data = request.get_json()

    user_name = data["email"]
    group_name = data["group_name"]
    group_description = data["group_description"]
    print(user_name, group_name, group_description)
    user_id_result, success = server_assistent.query_db(
        "SELECT id FROM users WHERE email=?", (user_name,), True
    )
    if not success or user_id_result is None:
        return jsonify({"status": "fail", "message": "User not found"}), 404

    user_id = user_id_result[0]
    group_id, success = server_assistent.query_db(
        "INSERT INTO groups (group_name, group_details) VALUES (?, ?)",
        (
            group_name,
            group_description,
        ),
    )
    if not success:
        return jsonify({"status": "fail", "message": "Failed to create group"}), 500
    created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    _, success = server_assistent.query_db(
        "INSERT INTO group_members (group_id, user_id, user_join_to_group) "
        "VALUES (?,?,?)",
        (group_id, user_id, created_date),
    )
    if success:
        return jsonify({"status": "success", "group_id": group_id}), 200
    else:
        return jsonify({"status": "fail"}), 500


@app.route("/enter_to_group", methods=["POST"])
def enter_to_group():
    data = request.get_json()

    user_email = data["email"]
    group_id = data["group_id"]

    # Get user_id from the database using the provided email
    user_id, success = server_assistent.query_db(
        "SELECT id FROM users WHERE email=?", (user_email,), True
    )
    user_id = user_id[0]

    if not success:
        return jsonify({"status": "error", "message": "Error fetching user_id"}), 500

    # Check if the user is already a member of the group
    group_member_id, success = server_assistent.query_db(
        "SELECT group_member_id FROM group_members WHERE group_id=? and user_id=?",
        (
            group_id,
            user_id,
        ),
        True,
    )

    if not success:
        return (
            jsonify({"status": "error", "message": "Error fetching group membership"}),
            500,
        )

    if group_member_id:
        return (
            jsonify(
                {"status": "error", "message": "User is already a member of the group"}
            ),
            400,
        )

    # Add user to the group
    created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    group_member_id, success = server_assistent.query_db(
        "INSERT INTO group_members (group_id, user_id, user_join_to_group) VALUES (?,?,?)",
        (group_id, user_id, created_date),
        True,
    )

    if success:
        return jsonify({"status": "success"}), 200
    else:
        return (
            jsonify({"status": "error", "message": "Error adding user to the group"}),
            500,
        )


@app.route("/id_from_email", methods=["POST"])
def id_from_email():
    data = request.get_json()

    user_email = data["email"]
    user_id, success = server_assistent.query_db(
        "SELECT id FROM users WHERE email=?", (user_email,), True
    )
    if success:
        if user_id:
            user_id = user_id[0]
            return jsonify({"status": "success", "user": user_id}), 200
        else:
            return (
                jsonify(
                    {"status": "fail", "message": "Failed to find this user email"}
                ),
                500,
            )
    else:
        return (
            jsonify({"status": "fail", "message": "Failed to find this user email"}),
            500,
        )


@app.route("/group_id_from_user_id", methods=["POST"])
def group_id_from_user_id():
    data = request.get_json()

    user_id = data["user_id"]
    group_id, success = server_assistent.query_db(
        "SELECT group_id FROM group_members WHERE user_id=?", (user_id,), True
    )
    if success:
        if group_id:
            group_id = group_id[0]
            return jsonify({"status": "success", "group": group_id}), 200
        else:
            return (
                jsonify({"status": "fail", "message": "Failed to find this user id"}),
                200,
            )
    else:
        return (
            jsonify({"status": "fail", "message": "Failed to find this user id"}),
            200,
        )


@app.route("/add_mission", methods=["POST"])
def add_mission():
    data = request.get_json()

    group_id = data["group_id"]
    mission_name = data["mission_name"]
    mission_description = data["mission_description"]
    # Add mission to the missions
    created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    mission_id, success = server_assistent.query_db(
        "INSERT INTO missions (group_id, mission_name, mission_description, created_date, completed) VALUES (?,?,?,?,?)",
        (group_id, mission_name, mission_description, created_date, False),
        True,
    )
    if success:
        if mission_id:
            return jsonify({"status": "success", "group": mission_id}), 200
        else:
            return (
                jsonify({"status": "fail", "message": "Failed to insert this mission"}),
                500,
            )
    else:
        return jsonify({"status": "fail", "message": "Failed to add to DB"}), 500


@app.route("/remove_mission", methods=["POST"])
def remove_mission():
    data = request.get_json()

    mission_id = data["mission_id"]

    deleted_row, success = server_assistent.query_db(
        "DELETE FROM missions WHERE mission_id = ?", (mission_id,), True
    )
    if success:
        if deleted_row:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "no row deleted"}), 500
    else:
        return jsonify({"status": "fail", "message": "Failed to connect to DB"}), 500


@app.route("/add_outcome", methods=["POST"])
def add_outcome():
    data = request.get_json()
    group_id = data["group_id"]
    user_id = data["user_id"]
    outcome_name = data["outcome_name"]
    # outcome_description = data['outcome_description']
    amount = data["amount"]
    # outcome_date = data['outcome_date']
    created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    outcome_id, success = server_assistent.query_db(
        "INSERT INTO outcomes (group_id, user_id, outcome_name,  amount,  "
        "created_date) VALUES (?,?,?,?,?)",
        (group_id, user_id, outcome_name, amount, created_date),
        True,
    )
    if success:
        if outcome_id:
            return jsonify({"status": "success", "outcome_id": outcome_id}), 200
        else:
            return (
                jsonify({"status": "fail", "message": "Failed to insert this outcome"}),
                500,
            )
    else:
        return jsonify({"status": "fail", "message": "Failed to add to DB"}), 500


@app.route("/remove_outcome", methods=["POST"])
def remove_outcome():
    data = request.get_json()

    outcome_id = data["outcome_id"]

    deleted_row, success = server_assistent.query_db(
        "DELETE FROM outcomes WHERE outcome_id = ?", (outcome_id,), True
    )
    if success:
        if deleted_row:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "no row deleted"}), 500
    else:
        return jsonify({"status": "fail", "message": "Failed to connect to DB"}), 500


@app.route("/add_bill", methods=["POST"])
def add_bill():
    data = request.get_json()
    group_id = data["group_id"]
    user_id = data["user_id"]
    bill_name = data["bill_name"]
    amount = data["amount"]
    bill_date = data["bill_date"]
    created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    bill_id, success = server_assistent.query_db(
        "INSERT INTO bills (group_id, user_id, bill_name, amount, bill_date, "
        "created_date) VALUES (?,?,?,?,?,?)",
        (group_id, user_id, bill_name, amount, bill_date, created_date),
        True,
    )
    if success:
        if bill_id:
            return jsonify({"status": "success", "bill_id": bill_id}), 200
        else:
            return (
                jsonify({"status": "fail", "message": "Failed to insert this bills"}),
                500,
            )
    else:
        return jsonify({"status": "fail", "message": "Failed to add to DB"}), 500


@app.route("/add_notification", methods=["POST"])
def add_notification():
    data = request.get_json()
    group_id = data["group_id"]
    user_id = data["user_id"]
    notification_name = data["notification_name"]
    created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    notification_id, success = server_assistent.query_db(
        "INSERT INTO notifications (group_id, user_id, notification_name, "
        "created_date) VALUES (?,?,?,?)",
        (group_id, user_id, notification_name, created_date),
        True,
    )
    if success:
        if notification_id:
            return (
                jsonify({"status": "success", "notification_id": notification_id}),
                200,
            )
        else:
            return (
                jsonify({"status": "fail", "message": "Failed to insert this bills"}),
                500,
            )
    else:
        return jsonify({"status": "fail", "message": "Failed to add to DB"}), 500


@app.route("/remove_bill", methods=["POST"])
def remove_bill():
    data = request.get_json()

    bill_id = data["bill_id"]

    deleted_row, success = server_assistent.query_db(
        "DELETE FROM bills WHERE bill_id = ?", (bill_id,), True
    )
    if success:
        if deleted_row:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "no row deleted"}), 500
    else:
        return jsonify({"status": "fail", "message": "Failed to connect to DB"}), 500


@app.route("/remove_notification", methods=["POST"])
def remove_notification():
    data = request.get_json()

    notification_id = data["notification_id"]

    deleted_row, success = server_assistent.query_db(
        "DELETE FROM notifications WHERE notification_id = ?", (notification_id,), True
    )
    if success:
        if deleted_row:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "no row deleted"}), 500
    else:
        return jsonify({"status": "fail", "message": "Failed to connect to DB"}), 500


@app.route("/missions_from_group_id", methods=["POST"])
def missions_from_group_id():
    data = request.get_json()
    group_id = data["group_id"]
    print("asdsad", group_id)
    table_data, success = server_assistent.query_db("PRAGMA table_info(missions)")
    column_names = [info[1] for info in table_data]
    rows, success = server_assistent.query_db(
        "SELECT * FROM missions WHERE group_id=?", (group_id,)
    )
    rows_as_dicts = [dict(zip(column_names, row)) for row in rows]

    json_data = json.dumps(rows_as_dicts)
    # return jsonify(json_data), 200
    return json_data, 200


@app.route("/outcomes_from_group_id", methods=["POST"])
def outcomes_from_group_id():
    data = request.get_json()
    group_id = data["group_id"]

    table_data, success = server_assistent.query_db("PRAGMA table_info(outcomes)")
    column_names = [info[1] for info in table_data]
    rows, success = server_assistent.query_db(
        "SELECT * FROM outcomes WHERE group_id=?", (group_id,)
    )
    rows_as_dicts = [dict(zip(column_names, row)) for row in rows]

    json_data = json.dumps(rows_as_dicts)
    return json_data, 200


@app.route("/notifications_from_group_id", methods=["POST"])
def notifications_from_group_id():
    data = request.get_json()
    group_id = data["group_id"]

    table_data, success = server_assistent.query_db("PRAGMA table_info(notifications)")
    column_names = [info[1] for info in table_data]
    rows, success = server_assistent.query_db(
        "SELECT * FROM notifications WHERE group_id=?", (group_id,)
    )
    rows_as_dicts = [dict(zip(column_names, row)) for row in rows]

    json_data = json.dumps(rows_as_dicts)
    return json_data, 200


@app.route("/faults_from_group_id", methods=["POST"])
def faults_from_group_id():
    data = request.get_json()
    group_id = data["group_id"]

    table_data, success = server_assistent.query_db("PRAGMA table_info(faults)")
    column_names = [info[1] for info in table_data]
    rows, success = server_assistent.query_db(
        "SELECT * FROM faults WHERE group_id=?", (group_id,)
    )
    rows_as_dicts = [dict(zip(column_names, row)) for row in rows]

    json_data = json.dumps(rows_as_dicts)
    return json_data, 200


@app.route("/user_name_from_id", methods=["POST"])
def user_name_from_id():
    data = request.get_json()
    user_id = data["user_id"]
    user_name, success = server_assistent.query_db(
        "SELECT fullName FROM users WHERE id=?", (user_id,), True
    )
    if success:
        if user_name:
            return jsonify({"status": "success", "user_name": user_name[0]}), 200
        else:
            return jsonify({"status": "fail"}), 400
    else:
        return jsonify({"status": "fail"}), 400


@app.route("/group_name_from_id", methods=["POST"])
def group_name_from_id():
    data = request.get_json()
    group_id = data["group_id"]
    group_name, success = server_assistent.query_db(
        "SELECT group_name FROM groups WHERE group_id=?", (group_id,), True
    )
    if success:
        if group_name:
            return jsonify({"status": "success", "group_name": group_name[0]}), 200
        else:
            return jsonify({"status": "fail"}), 400
    else:
        return jsonify({"status": "fail"}), 400


def validate_new_user(username, password, email, full_name, date_of_birth):
    if len(username) < 4:
        return jsonify({"status": "Username must be at least 4 characters"}), 400
    if len(password) < 8:
        return jsonify({"status": "Password must be at least 8 characters"}), 400
    if len(email) < 5:
        return jsonify({"status": "Email must be at least 5 characters"}), 400
    if "@" not in email:
        return jsonify({"status": "Email must contain @"}), 400
    if "." not in email:
        return jsonify({"status": "Email must contain ."}), 400
    if len(full_name) < 5:
        return jsonify({"status": "Full name must be at least 5 characters"}), 400
    if len(date_of_birth) < 5:
        return jsonify({"status": "Date of birth must be at least 5 characters"}), 400
    return True


@app.route("/members_from_group_id", methods=["POST"])
def members_from_group_id():
    data = request.get_json()
    group_id = data["group_id"]
    print("asdsad", group_id)
    table_data, success = server_assistent.query_db("PRAGMA table_info(users)")
    column_names = [info[1] for info in table_data]
    rows, success = server_assistent.query_db(
        "SELECT DISTINCT users.* FROM users JOIN group_members ON users.id = group_members.user_id AND group_members.group_id=?", (group_id,))
    rows_as_dicts = [dict(zip(column_names, row)) for row in rows]
    rows_as_dicts = [{key: value.decode("utf-8") if isinstance(value, bytes) else value} for row in rows_as_dicts for key, value in row.items()]

    json_data = json.dumps(rows_as_dicts)
    return json_data, 200


@app.route("/remove_user_from_group_by_id", methods=["POST"])
def remove_user_from_group():
    data = request.get_json()

    id = data["id"]

    deleted_row, success = server_assistent.query_db(
        "DELETE FROM group_members WHERE user_id = ?", (id,), True
    )
    if success:
        if deleted_row:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "no row deleted"}), 500
    else:
        return jsonify({"status": "fail", "message": "Failed to connect to DB"}), 500


@app.route("/get_user_details_by_id", methods=["POST"])
def get_user_details_by_id():
    data = request.get_json()
    user_id = data["id"]
    print("asdsad", user_id)
    table_data, success = server_assistent.query_db("PRAGMA table_info(users)")
    column_names = [info[1] for info in table_data]
    rows, success = server_assistent.query_db(
        "SELECT * FROM users WHERE users.id=?", (user_id,)
    )
    rows_as_dicts = [dict(zip(column_names, row)) for row in rows]
    rows_as_dicts = [{key: value.decode("utf-8") if isinstance(value, bytes) else value} for row in rows_as_dicts for key, value in row.items()]

    json_data = json.dumps(rows_as_dicts)
    return json_data, 200


@app.route("/add_user_to_group", methods=["POST"])
def add_user_to_group():
    #need to check if group exists and user isn't in other group
    data = request.get_json()
    user_id = data["user_id"]
    group_id = data["group_id"]
    print(user_id, group_id)
    created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    _, success = server_assistent.query_db(
        "INSERT INTO group_members (group_id, user_id, user_join_to_group) "
        "VALUES (?,?,?)",
        (group_id, user_id, created_date),
    )
    if success:
        return jsonify({"status": "success", "group_id": group_id}), 200
    else:
        return jsonify({"status": "fail"}), 500


@app.route("/add_event", methods=["POST"])
def add_event():
    data = request.get_json()
    user_creator_id = data["user_id"]
    event_name = data["event_name"]
    event_description = data["event_description"]
    event_date_string = data["event_date"]
    date_format = "%Y-%m-%d %H:%M:%S"
    event_date = datetime.datetime.strptime(event_date_string, date_format)
    created_date = datetime.datetime.now().strftime(date_format)
    event_id, success = server_assistent.query_db(
        "INSERT INTO events (user_creator_id, event_name, event_description, event_date, "
        "created_date) VALUES (?,?,?,?,?)",
        (user_creator_id, event_name, event_description, event_date, created_date),
        True,
    )
    if success:
        if event_id:
            return (
                jsonify({"status": "success", "event_id": event_id}),
                200,
            )
        else:
            return (
                jsonify({"status": "fail", "message": "Failed to insert this event"}),
                500,
            )
    else:
        return jsonify({"status": "fail", "message": "Failed to add to DB"}), 500


@app.route("/get_events", methods=["POST"])
def get_events():
    data = request.get_json()

    table_data, success = server_assistent.query_db("PRAGMA table_info(events)")
    column_names = [info[1] for info in table_data]
    curr_date = datetime.datetime.now()
    rows, success = server_assistent.query_db(
        "SELECT * FROM events WHERE event_date<=?", (curr_date,)
    )
    rows_as_dicts = [dict(zip(column_names, row)) for row in rows]

    json_data = json.dumps(rows_as_dicts)
    return json_data, 200


@app.route("/remove_event", methods=["POST"])
def remove_event():
    data = request.get_json()

    event_id = data["mission_id"]

    deleted_row, success = server_assistent.query_db(
        "DELETE FROM events WHERE event_id = ?", (event_id,), True
    )
    if success:
        if deleted_row:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "no row deleted"}), 500
    else:
        return jsonify({"status": "fail", "message": "Failed to connect to DB"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
