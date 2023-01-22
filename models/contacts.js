const fs = require("fs").promises;
const path = require('path');
const nanoid = require("nanoid");
const contactsPath = path.join(__dirname.split('contacts')[0], './contacts.json');

const readContacts = async() => {
  const js = await fs.readFile(contactsPath);
  return JSON.parse(js);
}

const listContacts = async () => {
  return await readContacts()
}

const getContactById = async (contactId) => {
  const contacts = await readContacts()
  return contacts.find(item => {
    return item.id === contactId
  })
}

const removeContact = async (contactId) => {
  const contacts = await readContacts()
  const indexContact = contacts.findIndex(element => String(contactId) === element.id)

  if (indexContact === -1) {
    return null
  }

  const filterContacts = contacts.filter((element, index)=> index !== indexContact)

  fs.writeFile(contactsPath, JSON.stringify(filterContacts));
  return true
}

const addContact = async (body) => {
  const contacts = await readContacts()

  const {name, email, phone} = body;
  const contactNew = {
    id: nanoid(),
    name,
    email,
    phone,
  }

  contacts.push(contactNew)
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactNew
}

const updateContact = async (contactId, body) => {
  const contacts = await readContacts()
  const id = contacts.findIndex(contact => contact.id === String(contactId))
  if (id === -1) {
    return null
  }

  contacts[id] = {...contacts[id], ...body}
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[id]
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
