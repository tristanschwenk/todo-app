/* const clickValidation = require('../../validation/click') */
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res) => {
  /* const {error} = clickValidation.validate(req.body) 

  if (error) return res.status(400).send(error.details[0].message)*/

  const newNotes = await prisma.notes.create({
      data: {
        text: req.body.text,
        categoryId: req.body.categoryId
      },
    })

    await prisma.category.update({
      where: {
        id: newNotes.categoryId
      },
      data: {
        updatedAt: new Date()
      }
    })

  res.json(newNotes)
}