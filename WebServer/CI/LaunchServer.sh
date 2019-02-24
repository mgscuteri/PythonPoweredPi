cd /home/pi/PythonPoweredPi/WebServer/Server
echo $USER
python3 Server.py & 
echo "$!" > /home/pi/PythonPoweredPi/WebServer/CI/PythonPoweredPi.pid

