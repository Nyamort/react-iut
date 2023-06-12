const note = require('./note/note.validator')
const {validationResult} = require("express-validator");
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).send('Note payload is invalid')
    }
    next()
}

module.exports = {
    note,
    validate
};