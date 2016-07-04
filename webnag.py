from flask import Flask, render_template, jsonify
from flask_restful import reqparse, Resource, Api
from flask_restful_swagger import swagger
from pynag import Model
from resource import host,hostgroup,command,contact
import json

app = Flask(__name__)
api = swagger.docs(Api(app), apiVersion='0.1')

parser = reqparse.RequestParser()

Model.cfg_file = '/home/ovski/shinken/shinken.cfg'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html',title="webnag")

api.add_resource(host.Hosts, '/api/hosts', '/api/hosts/<hostname>')#, '/api/hosts/<hostname>/hostgroups','/api/hosts/<hostname>/services')
api.add_resource(hostgroup.HostGroups, '/api/hostgroups', '/api/hostgroups/<hostgroupname>')
api.add_resource(command.Commands, '/api/commands')
api.add_resource(contact.Contacts, '/api/contacts')

if __name__ == '__main__':
    app.run(debug=True)
