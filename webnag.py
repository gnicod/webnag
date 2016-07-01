from flask import Flask, render_template, jsonify
from flask_restful import reqparse, Resource, Api
from pynag import Model
from resource import host,hostgroup,command,contact
import json

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

Model.cfg_file = '/home/ovski/shinken/shinken.cfg'

@app.route('/')
def index():
    return render_template('index.html',title="webnag")

api.add_resource(host.Hosts, '/api/hosts')
api.add_resource(hostgroup.HostGroups, '/api/hostgroups')
api.add_resource(command.Commands, '/api/commands')
api.add_resource(contact.Contacts, '/api/contacts')

if __name__ == '__main__':
    app.run(debug=True)
