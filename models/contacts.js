const Contact = require("../service/contactSchema");

const listContacts = async (_id) => {
  return await Contact.find({owner: _id },{__v: 0, owner: 0})
}
const getContactById = async (contactId, id) => {
 return Contact.findOne({ _id: contactId, owner: id}, {__v: 0, owner: 0})
}

const removeContact = async (contactId, id) => {
  return Contact.findByIdAndRemove({ _id: contactId , owner: id}, {__v: 0, owner: 0})
}

const addContact = async ({name, email, phone}, owner) => {
  return Contact.create({ name, email, phone, owner })
}

const updateContact = async (contactId, body, id) => {
  return Contact.findByIdAndUpdate({ _id: contactId, owner: id }, body, { new: true })
}
const updateStatusContact = async (favorite, contactId, id) => {
  return await Contact.findByIdAndUpdate(
      {_id:contactId, owner: id}, { favorite }, { new: true })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
