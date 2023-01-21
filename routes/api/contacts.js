const express = require('express')
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

router.post('/', async (req, res, next) => {
  const itemAdd = await addContact(req.body);
  console.log(itemAdd)
  if(!itemAdd) {
     res.json({"message": "missing required name field"})
     res.status(400)
     return
  }
  res.json({itemAdd})
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

router.put('/:contactId', async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400)
    res.json({ "message": "missing fields"})
    return
  }
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
