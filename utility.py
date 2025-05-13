import subprocess

def check_and_start_SQL():
    result = subprocess.run(["docker", "ps"], stdout=subprocess.PIPE)
    if b"mysql_container" not in result.stdout:
        subprocess.run(["docker-compose", "up", "-d"])