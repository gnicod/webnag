from pynag import Model
from flask_restful import reqparse, Resource, Api

class HostGroups(Resource):
    def get(self):
        hostgroups = Model.Hostgroup.objects.all
        format_hostgroups = []
        for hostg in hostgroups:
            h = {
                    "hostgroup_name":hostg.hostgroup_name,
                    }
            format_hostgroups.append(h)
        return {"hostgroups": format_hostgroups}

