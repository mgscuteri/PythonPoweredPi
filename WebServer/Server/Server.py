import _thread
import http.server
import socketserver
import os
import sys
import time
import random
import asyncio
from aiohttp import web

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

#Serves up REST endpoints
def LaunchRestServer():
    try:
        print("Launching REST Server")
        
        currentDirectory = os.getcwd()
        reactBuildLocation = currentDirectory + '/WebServer/Web/scripts/site/build/'
        #Static Content Functions
        def getHomePage(request):
            return web.FileResponse(reactBuildLocation +'index.html')
        def getJsServiceWorker(request):
            return web.FileResponse(reactBuildLocation +'service-worker.js')
        def getJs(request):
            jsFilePath = reactBuildLocation + '/static/js/{}'.format(request.match_info['jsFileName'])
            return web.FileResponse(jsFilePath)
        def getCss(request):
            cssFilePath = reactBuildLocation + '/static/css/{}'.format(request.match_info['cssFileName'])
            return web.FileResponse(cssFilePath)
        def getMedia(request):
            mediaFilePath = reactBuildLocation + '/static/media/{}'.format(request.match_info['mediaFileName'])
            return web.FileResponse(mediaFilePath)

        #Rest Content Functions
        def getRandomNumber(request):
            return web.json_response(random.randint(1,100))

        app = web.Application()
        #Static Content Routing
        app.router.add_route('GET', '/', getHomePage)
        app.router.add_route('GET', '/service-worker.js', getJsServiceWorker)
        app.router.add_route('*', '/static/css/{cssFileName}', getCss)
        app.router.add_route('*', '/static/js/{jsFileName}', getJs)
        app.router.add_route('*', '/static/media/{mediaFileName}', getRandomNumber)

        #Rest Content
        app.router.add_route('GET', '/rand', getRandomNumber)

        print('5')
        loop = asyncio.get_event_loop()
        print('6')
        handler = app.make_handler()
        f = loop.create_server(handler, '0.0.0.0', 8080)
        srv = loop.run_until_complete(f)
        print('serving on', srv.sockets[0].getsockname())
        try:
            loop.run_forever()
        except KeyboardInterrupt:
            pass
        finally:
            srv.close()
            loop.run_until_complete(srv.wait_closed())
            loop.run_until_complete(app.finish())
        loop.close()

        return True
    except:
        return False

#Main
if __name__ == '__main__':
    RestServerRunning = LaunchRestServer()
    


