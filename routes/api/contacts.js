const express = require('express');
const { authenticate } = require('../../middlewares/authenticate');
const { validationAddContact, validationUpdateContact, validationUpdateStatusContact } = require('../../middlewares/validationContacts');
const { listContacts, getContactById, addContact, updateContact, removeContact, updateStatusContact } = require('../../models/contacts');

const router = express.Router()


router.use(authenticate)

router.get('/', async (req, res, next) => {
  try {
    const {id} = req.user;
    const data = await listContacts(id);
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json(error.message.replace(/[^a-zа-яё0-9\s]/gi, ''))
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {id} = req.user;
    const item = await getContactById(req.params.contactId, id);
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json(error.message.replace(/[^a-zа-яё0-9\s]/gi, ''))
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
 try {
    const {id} = req.user
    const itemAdd = await addContact(req.body,id);
    res.status(200).json(itemAdd)
 } catch (error) {
    res.status(404).json(error.message.replace(/[^a-zа-яё0-9\s]/gi, ''))
 }
})

router.delete('/:contactId', async (req, res, next) => {
 try {
  const {id} = req.user
   const contact = await removeContact(req.params.contactId, id);
  if(contact){
    return res.status(200).json({ 'message': 'message: contact deleted' })
   }
    res.status(404).json({message: "Not Found"});
 } catch (error) {
    res.status(404).json(error.message.replace(/[^a-zа-яё0-9\s]/gi, ''))
 }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
try {
    const {id} = req.user
    const {params, body} = req
    const contact = await updateContact(params.contactId,body, id);
    res.status(200).json(contact)
} catch (error) {
    res.status(404).json(error.message.replace(/[^a-zа-яё0-9\s]/gi, ''))
}
})

router.patch('/:contactId/favorite', validationUpdateStatusContact, async (req, res, next) => {
 try {
    const {favorite} = req.body;
    const {contactId} = req.params;
    const {id} = req.user
    const contact = await updateStatusContact(favorite, contactId, id);
    res.status(200).json(contact)
 } catch (error) {
    res.status(404).json(error.message.replace(/[^a-zа-яё0-9\s]/gi, ''))
 }
}) 

module.exports = router
