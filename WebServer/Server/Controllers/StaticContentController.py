import http.server
import socketserver
import os
import sys
import time
import random
import asyncio
from aiohttp import web

class StaticContentController:
    currentDirectory = ''
    reactBuildLocation = ''
    app = web.Application()

    def __init__(self, app, currentDirectory):
        self.app = app
        self.currentDirectory = currentDirectory
        self.reactBuildLocation = currentDirectory + '/WebServer/Web/scripts/site/dist/'
        app.router.add_route('GET', '/', self.getHomePage)
        app.router.add_route('GET', '/index_bundle.js', self.getJsBundle)
        app.router.add_route('*', '/media/{mediaFileName}', self.getMedia)
        app.router.add_route('GET', '/TheServer', self.getHomePage)
        app.router.add_route('GET', '/EmailList', self.getHomePage)
        app.router.add_route('GET', '/About', self.getHomePage)
        
    def getHomePage(self, request):
        return web.FileResponse(self.reactBuildLocation +'index.html')
    def getJsBundle(self, request):
        return web.FileResponse(self.reactBuildLocation +'index_bundle.js')
    def getMedia(self, request):
        mediaFilePath = self.reactBuildLocation + '/media/{}'.format(request.match_info['mediaFileName'])
        return web.FileResponse(mediaFilePath)
