const router = require('express').Router()
const moment = require('moment')

router.use(function timeLog(req, res, next) {
        console.log('Time: ', moment().format())
        next()
    })
    .get('/', (req, res) => {
        res.send('Hello Server')
    })

module.exports = router