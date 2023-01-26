const express = require('express');
const { validationAddContact, validationUpdateContact, validationUpdateStatusContact } = require('../../middlewares/middlewaresValidation');
const { listContacts, getContactById, addContact, updateContact, removeContact, updateStatusContact } = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json(data)
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const item = await getContactById(req.params.contactId);
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ 'message': "Not found" })
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
 try {
    const itemAdd = await addContact(req.body);
    res.status(200).json(itemAdd)
 } catch (error) {
    console.log(error.message)
 }
})

router.delete('/:contactId', async (req, res, next) => {
 try {
    await removeContact(req.params.contactId);
    res.status(200).json({ 'message': 'message: contact deleted' })
 } catch (error) {
    res.status(404).json({ 'message': 'message: Not found' })
 }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
try {
    const contact = await updateContact(req.params.contactId, req.body);
    res.status(200).json(contact)
} catch (error) {
    res.status(404).json({ message: 'Not found' })
}
})

router.patch('/:contactId/favorite', validationUpdateStatusContact, async (req, res, next) => {
 try {
    const {body, params} = req;
    const contact = await updateStatusContact(body, params);
    res.status(200).json(contact)
 } catch (error) {
    res.status(404).json({"message ":" Not found "})
 }
}) 

module.exports = router
