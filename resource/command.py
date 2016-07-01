from pynag import Model
from flask_restful import reqparse, Resource, Api

class Commands(Resource):
    def get(self):
        commands = Model.Command.objects.all
        format_commands = []
        for command in commands:
            h = {
                    "command_line":command.command_line,
                    "command_name":command.command_name,
                    }
            format_commands.append(h)
        return {"commands": format_commands}

