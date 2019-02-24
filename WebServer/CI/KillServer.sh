pid=$(cat /home/pi/PythonPoweredPi/WebServer/CI/PythonPoweredPi.pid)
echo $pid
if [ "$(ps -o comm= -p "$pid")" = "python3" ]; then 
	kill -9 "$pid"
	echo "Process Killed"
else 
	echo "Process is either already dead, or running on unexpected pid!"
fi