// const fs = require('fs/promises')
const Joi = require('joi');
const fs = require("fs").promises;
const path = require('path');
const nanoid = require("nanoid");
// let uniqid = require('uniqid');
const contactsPath = path.join(__dirname.split('contacts')[0], './contacts.json');

const readContacts = async() => {
  const js = await fs.readFile(contactsPath);
  return JSON.parse(js);
}

const listContacts = async () => {
  return await readContacts()
}

const getContactById = async (contactId) => {
  const json = await readContacts()
  return json.find(item => {
    return item.id === contactId
  }) 
  
}

const removeContact = async (contactId) => {
  const json = await readContacts()
  const id = json.findIndex(element => String(contactId) === element.id)
  if (id === -1) {
    return null
  }
  const dalet = json.splice(id, 1);
  fs.writeFile(contactsPath, JSON.stringify(json));
  return dalet
}

const addContact = async (body) => {
  const schema = Joi.object({
    name: Joi.string()
          .required(),

    email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),

    phone : Joi.string()
          .required(),
  });

  const contact = schema.validate(body);
  if (contact.error) {
    return false
  }
  const json = await readContacts()

  const {name, email, phone} = contact.value;
  const contactNew = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  json.push(contactNew)
  fs.writeFile(contactsPath, JSON.stringify(json));
  return contactNew
}

const updateContact = async (contactId, body) => {
  const json = await readContacts()

  const schema = Joi.object({
    name: Joi.string()
          .optional(),
          

    email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .optional(),
          

    phone : Joi.string()
          .optional(),
          
  });

  const contact = schema.validate(body);
  if (contact.error) {
    return false
  }

  const {name, email, phone} = body;

  json.forEach(element => {
    if (element.id === String(contactId)) {
      element.name = name || element.name ;
      element.email = email || element.email;
      element.phone = phone || element.email;
    }
  });
  
  fs.writeFile(contactsPath, JSON.stringify(json));
  return contact
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
