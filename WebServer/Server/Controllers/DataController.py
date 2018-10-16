import json
import http.server
import socketserver
import os
import sys
import time
import random
import asyncio
import pickle
from aiohttp import web

class DataController:
    currentDirectory = ''
    dataBaseDirectory = ''
    controllerPrefix = '/data'
    app = web.Application()

    def __init__(self, app, currentDirectory):
        self.app = app
        self.currentDirectory = currentDirectory
        self.dataBaseDirectory = self.currentDirectory + '/WebServer/Server/Data/dataBase.txt'
        app.router.add_route('GET', self.controllerPrefix + '/registrations', self.getRegistrations)
        app.router.add_route('GET', self.controllerPrefix + '/registrations/{id}', self.getRegistrationById)
        app.router.add_route('POST', self.controllerPrefix + '/registrations', self.addRegistration)
        app.router.add_route('DELETE', self.controllerPrefix + '/registrations/{id}', self.deleteRegistrationById)

    async def addRegistration(self, request):
        dataBase = self._getRegistrationDataBase()
        index = str(len(dataBase)+1)
        postBody = await request.read()
        postBodyParsed = json.loads(postBody)
        newRow = {"Name":postBodyParsed["Name"], "emailAddress": postBodyParsed["emailAddress"] }
        dataBase[index] = newRow
        dePickledDataBase = open(self.currentDirectory + '/WebServer/Server/Data/dataBase.txt', 'wb')
        pickler = pickle.Pickler(dePickledDataBase)
        pickler.dump(dataBase)
        dePickledDataBase.close()
        return web.json_response(dataBase)

    def getRegistrations(self, request):
        dataBase = self._getRegistrationDataBase()
        return web.json_response(dataBase)

    def getRegistrationById(self, request):
        dataBase = self._getRegistrationDataBase()
        requestedId = (request.match_info['id'])
        return dataBase[requestedId]

    def deleteRegistrationById(self, request):
        dataBase = self._getRegistrationDataBase()
        requestedId = (request.match_info['id'])
        del dataBase[requestedId]
        dePickledDataBase = open(self.currentDirectory + '/WebServer/Server/Data/dataBase.txt', 'wb')
        pickler = pickle.Pickler(dePickledDataBase)
        pickler.dump(dataBase)
        dePickledDataBase.close()
        return web.json_response(dataBase)

    def _getRegistrationDataBase(self):
        dataBaseFile = open(self.currentDirectory + '/WebServer/Server/Data/dataBase.txt', 'rb')
        dataBasePickler = pickle.Unpickler(dataBaseFile)
        dataBase = dataBasePickler.load()
        dataBaseFile.close()
        return dataBase
    
    