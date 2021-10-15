const router = require('express').Router()

/* //Middleware

const isLog = require('../../middleware/isLog')
const isAdmin = require('../../middleware/isAdmin') */

//SubRoutes
const create = require('./create')
const read = require('./read')
const one = require('./one')
const del = require('./delete')

router.post("/", create)
router.get("/", read)
router.get("/:id", one)
router.delete("/:id", del)

module.exports = router