const express = require('express');
const { validationAddContact, validationUpdateContact } = require('../../middlewares/middlewaresValidation');
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
 const list = await listContacts();
  res.status(200)
  res.json({list})
})

router.get('/:contactId', async (req, res, next) => {
  const item = await getContactById(req.params.contactId);
  if (!item) {
    res.status(404); 
    res.json({ message: "Not found" })
    return
  }
  res.status(200)
  res.json({item})
})

router.post('/', validationAddContact, async (req, res, next) => {
  const itemAdd = await addContact(req.body);
  res.json({...itemAdd})
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
if (!contact) {
  res.status(404)
  res.json({ message: 'message: Not found' })
  return
}
  res.status(200)
  res.json({ message: 'message: contact deleted' })
  
})

router.put('/:contactId',  validationUpdateContact, async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (!contact) {
    res.status(404)
    res.json({ message: 'Not found' })
    return
  }
  res.status(200)
  res.json({ ...contact})
})

module.exports = router
