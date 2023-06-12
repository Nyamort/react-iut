const {body} = require("express-validator");

const post = [
    body('name').trim().escape().notEmpty().isLength({min: 5}),
    body('content').trim().escape().notEmpty(),
    body('category').isIn(['personal', 'work', 'secret']),
];


const put = post;


module.exports = {
    post,
    put
}
