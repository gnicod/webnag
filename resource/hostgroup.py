from pynag import Model
from flask_restful import reqparse, Resource, Api

def format_host(host):
    h = {
            "host_name":host.host_name,
            "alias":host.alias,
            "address":host.address,
            }
    return h

def format_service(service):
   s = {
           "command":service.check_command,
           "display_name":service.display_name,
           "shortname":service.get_shortname()
           }
   return s

def format_hostgroup(hostgroup):
    h = {
            "hostgroup_name":hostgroup.hostgroup_name,
            "hostgroup_members":hostgroup.hostgroup_members,
            "hosts":[format_host(h) for h in hostgroup.get_effective_hosts()],
            "services":[format_service(s) for s in hostgroup.get_effective_services()],
            "hostgroups":[h.hostgroup_name for h in hostgroup.get_effective_hostgroups()]
            }
    return h

def get_one_hostgroup(hostgroup):
    hostgroups = Model.Hostgroup.objects.filter(hostgroup_name=hostgroup)
    if len(hostgroups) > 0:
        hostgroup = hostgroups[0]
        print hostgroup
        return format_hostgroup(hostgroup)

class HostGroups(Resource):
    def get(self,hostgroupname=None):
        if hostgroupname :
            return {"hostgroup" : get_one_hostgroup(hostgroupname)}
        else:
            hostgroups = Model.Hostgroup.objects.all
            format_hostgroups = []
            for hostg in hostgroups:
                h = format_hostgroup(hostg)
                format_hostgroups.append(h)
            return {"hostgroups": format_hostgroups}

