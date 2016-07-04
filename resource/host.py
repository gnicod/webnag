from pynag import Model
from flask_restful import reqparse, Resource, Api
from flask_restful_swagger import swagger

def format_host(host):
    h = {
            "host_name":host.host_name,
            "alias":host.alias,
            "address":host.address,
            "contacts":host.get_effective_contacts(),
            "hostgroups":[hg.hostgroup_name for hg in host.get_effective_hostgroups()],
            "contact_groups":host.contact_groups,
            "services":[format_service(s) for s in host.get_effective_services()]
            #"status":host.get_current_status() #not shinken compatible
            }
    return h

def format_service(service):
   s = {
           "command":service.check_command,
           "display_name":service.display_name,
           "shortname":service.get_shortname()
           }
   return s

def get_all_hosts():
    hosts = Model.Host.objects.all
    format_hosts = []
    for host in hosts:
        print host
        try:
            h = format_host(host)
            format_hosts.append(h)
        except Exception as e:
            print e
    return format_hosts

def get_one_host(hostname):
    hosts = Model.Host.objects.filter(host_name=hostname)
    if len(hosts) > 0:
        host = hosts[0]
        return format_host(host)

class Hosts(Resource):
    @swagger.operation(
            notes='get a todo item by ID',
            nickname='get',
            # Parameters can be automatically extracted from URLs (e.g. <string:id>)
            # but you could also override them here, or add other parameters.
            parameters=[
                {
                    "name": "todo_id_x",
                    "description": "The ID of the TODO item",
                    "required": True,
                    "allowMultiple": False,
                    "dataType": 'string',
                    "paramType": "path"
                    },
                {
                    "name": "a_bool",
                    "description": "The ID of the TODO item",
                    "required": True,
                    "allowMultiple": False,
                    "dataType": 'boolean',
                    "paramType": "path"
                    }
                ])
    def get(self,hostname=None):
        if hostname:
            return {"host" : get_one_host(hostname)}
        else:
            return {"hosts": get_all_hosts()}
