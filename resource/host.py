from pynag import Model
from flask_restful import reqparse, Resource, Api

class Hosts(Resource):
    def get(self):
        hosts = Model.Host.objects.all
        format_hosts = []
        for host in hosts:
            h = {
                    "host_name":host.host_name,
                    "alias":host.alias,
                    "address":host.address
                    }
            format_hosts.append(h)
        return {"hosts": format_hosts}

