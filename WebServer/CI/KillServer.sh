pid=$(cat /home/pi/PythonPoweredPi/WebServer/CI/PythonPoweredPi.pid)
echo PreviousPid: $pid
if [ "$(ps -o comm= -p "$pid")" = "python3" ]; then 
	kill -9 "$pid"
	echo "Process Successfully Killed"
else 
	echo "Process is either already dead, or not running on pid: $pid"
fi