const jwt = require('jsonwebtoken')
const { SECRET } = require('./serverConfiguration')

const creatingToken = (id, email) => {
    const payload = {
        id,
        email
    }
    return   jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

module.exports = creatingToken;