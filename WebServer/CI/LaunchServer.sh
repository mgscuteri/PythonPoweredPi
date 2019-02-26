cd /home/pi/PythonPoweredPi/WebServer/Server
echo "Waiting for process to die.."
sleep 10s
echo launching server
python3 Server.py & 
echo "$!" > /home/pi/PythonPoweredPi/WebServer/CI/PythonPoweredPi.pid

