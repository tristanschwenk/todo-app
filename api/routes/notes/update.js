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
      data: {
        ...req.body,
        updatedAt: new Date(),
      }
    })

    await prisma.category.update({
      where: {
        id: updateNote.categoryId
      },
      data: {
        updatedAt: new Date()
      }
    })

  res.json(updateNote)
}