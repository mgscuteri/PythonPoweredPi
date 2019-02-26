cd /home/pi/PythonPoweredPi/WebServer/Server
echo launching server
python3 Server.py & 
echo "$!" > /home/pi/PythonPoweredPi/WebServer/CI/PythonPoweredPi.pid

