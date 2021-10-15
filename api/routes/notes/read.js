const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req,res) => {
    const notes = await prisma.notes.findMany({include: {category:true}})
    res.status(200).json(notes)
}