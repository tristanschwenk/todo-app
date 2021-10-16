/* const clickValidation = require('../../validation/click') */
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res) => {
  /* const {error} = clickValidation.validate(req.body) 

  if (error) return res.status(400).send(error.details[0].message)*/

  const updateNote = await prisma.notes.update({
      where: {
          id: parseInt(req.params.id)
      },
      data: req.body,
    })

  res.json(updateNote)
}