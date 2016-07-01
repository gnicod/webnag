from pynag import Model
from flask_restful import reqparse, Resource, Api

class Contacts(Resource):
    def get(self):
        contacts = Model.Contact.objects.all
        format_contacts = []
        for contact in contacts:
            h = {
                    "contact_name":contact.contact_name,
                    "alias":contact.alias,
                    "address":contact.address,
                    "email":contact.email
                    }
            format_contacts.append(h)
        return {"contacts": format_contacts}


