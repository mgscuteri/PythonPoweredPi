pid=$(cat /home/pi/PythonPoweredPi/WebServer/CI/PythonPoweredPi.pid)
echo PreviousPid: $pid
kill -9 "$pid"
