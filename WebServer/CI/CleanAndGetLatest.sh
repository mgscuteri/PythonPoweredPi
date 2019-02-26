cd /home/pi/PythonPoweredPi
git config --global user.email "pythonpoweredpi@gmail.com"
git config --global user.name "pythonpoweredpi"
git stash save --keep-index
git stash drop
git pull "http://pythonpoweredpi:ThePythonCodesTonight@github.com/mgscuteri/PythonPoweredPi.git" master