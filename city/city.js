const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('inside message module')
})



module.exports = router