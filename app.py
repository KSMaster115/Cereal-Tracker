from flask import Flask
from flask import render_template, request, jsonify
from flask_mysqldb import MySQL
import bcrypt
from utility import check_and_start_SQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = "172.18.0.2"
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'rootpassword'
app.config['MYSQL_DB'] = 'cerealtrackerDB'

mysql = MySQL(app)

@app.route("/", methods=["GET","POST"])
def index():
    check_and_start_SQL()
    return render_template("index.html")

@app.route("/register", methods=["GET","POST"])
def register():
    return render_template("register.html")

@app.route("/registration", methods=["POST"])
def registration():   
    data = request.json
    username = data.get("newusername")
    password = data.get("newpassword")

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = BINARY %s", (username,))
    data = cur.fetchall()
    if not data:
        hashedpassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        cur.execute("INSERT INTO users (username, password_hash) VALUES (%s, %s)", (username, hashedpassword.decode('utf-8')))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': f"User {username} successfully registered!"})
    else:
        cur.close()
        return jsonify({'message': f"{username} taken. Please try another username."})
    
@app.route("/loginsubmit", methods = ["POST"])
def loginchecker():
    data = request.json
    username = data.get("loginusername")
    password = data.get("loginpassword")

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = BINARY %s", (username,))
    data = cur.fetchall()
    if data:
        if bcrypt.checkpw(password.encode(), data[0][2].encode()):
            cur.close()
            return jsonify({'message': "Successfully Logged In!"}),  200
        else:
            cur.close()
            return 401
    else:
        cur.close()
        return 401

if __name__ == "__main__":
    app.run(debug=True) # remember change debug to false once everything is done