const router = require('express').Router()

/* //Middleware

const isLog = require('../../middleware/isLog')
const isAdmin = require('../../middleware/isAdmin') */

//SubRoutes
const create = require('./create')
const read = require('./read')
const del = require('./delete')

router.post("/", create)
router.get("/", read)
router.delete("/", del)

module.exports = router