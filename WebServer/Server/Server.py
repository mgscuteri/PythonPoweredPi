import _thread
import http.server
import socketserver
import os
import sys
import time
import random
from flask import Flask, jsonify

#Globals
WebServerRunning = False
RestServerRunning = False
Run = True

tempDb = [
    {
        'id': 1,
        'name': u'Buy groceries',
    },
    {
        'id': 1,
        'name': u'Buy groceries',
    },
]

#Serves up the build folder (complied react project)
def LaunchWebServer():
    try:
        print("Launching Web Server")
        PORT = 5001
        currentDirectory = os.getcwd()
        webDirectory = os.path.join(currentDirectory, 'WebServer/Web/scripts/site/build')
        os.chdir(webDirectory)
        Handler = http.server.SimpleHTTPRequestHandler
        httpd = socketserver.TCPServer(("", PORT), Handler)
        print("Success! Serving Site at port : ", PORT)
        httpd.serve_forever()
    except:
        print("Failure! Exiting thread")
        return False

#Serves up REST endpoints
def LaunchRestServer():
    try:
        print("Launching REST Server")

        app = Flask(__name__)

        @app.route('/test',  methods=['GET'])
        def getTempDb():
            return jsonify({'tempDb': tempDb})

        @app.route('/random',  methods=['GET'])
        def getRandomNumber():
            rand = random.randint(1,101)
            return jsonify({'RandomNum': rand})
        
        app.run(debug=True, use_reloader=False)


        return True
    except:
        return False

#Main
if __name__ == '__main__':
    tup = ()
    while Run:
        if WebServerRunning is False:
            WebServerRunning = _thread.start_new_thread(LaunchWebServer, tup)
            time.sleep(2)
        if RestServerRunning is False:
            RestServerRunning = _thread.start_new_thread(LaunchRestServer, tup)
        time.sleep(5)


