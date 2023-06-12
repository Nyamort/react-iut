const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const noteSql = require('./dbal/note.js')
const service = require('./service.js')
const paramConverter = require('./param-converter/converter')
const {validate, note: noteValidator} = require('./validation/validate')
const authentication = require('./auth/authentication')


router.use(authentication)
router.get('/', (req, res) => {
    const all = service.getNote(req.user.uuid)
    return res.send(all)
})


router.get('/:uuid', paramConverter('note', true), (req, res) => {
    return res.send(req.note);
})
router.post('/', noteValidator.post, validate, (req, res) => {
    const note = {
        uuid: crypto.randomUUID().toString(),
        name: req.body.name,
        content: req.body.content,
        category: req.body.category,
        user: req.user.uuid
    }
    service.postNote(note)
    return res.status(201).send(note)
})

router.put('/:uuid', noteValidator.put, validate, paramConverter('note', true), (req, res) => {
    const note = {uuid: req.note.uuid, name: req.body.name, content: req.body.content, category: req.body.category}
    service.putNote(note)
    return res.send(note)
})

router.delete('/:uuid', paramConverter('note', true), (req, res) => {
    service.deleteNote({uuid: req.params.uuid})
    return res.status(204).send("Note deleted")
})

module.exports = router
