/* const clickValidation = require('../../validation/click') */
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res) => {
  /* const {error} = clickValidation.validate(req.body) 

  if (error) return res.status(400).send(error.details[0].message)*/

  const newCategory = await prisma.category.create({
      data: {
        title: req.body.title,
        description:  req.body.description,
        color: req.body.color
      },
    })

  res.json(newCategory)
}