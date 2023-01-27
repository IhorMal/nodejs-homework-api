const Contact = require("../service/contactSchema");

const listContacts = async () => {
  return await Contact.find()
}
const getContactById = async (contactId) => {
 return Contact.findOne({ _id: contactId })
}

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId })
}

const addContact = async ({name, email, phone}) => {
  return Contact.create({ name, email, phone })
}

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
}
const updateStatusContact = async (favorite, contactId) => {
  return await Contact.findByIdAndUpdate(
      contactId, { favorite }, { new: true })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
