pid=$(cat /home/pi/PythonPoweredPi/WebServer/CI/DeploymentVars/PythonPoweredPi.pid)
echo PreviousPid: $pid
echo "Attempting to kill previous instance"

if [ "$(ps -o comm= -p "$pid")" = "python3" ]; then 
	echo "Previous instance found"
	kill -9 "$pid"
	echo "Waiting for process to die"
	sleep 10s
	echo "Previous instance succesfully shut down."
else 
	echo "failed to identify a running instance"
	raise error "Previous pid does not appear to be linked to a currently running python instance"
fi



