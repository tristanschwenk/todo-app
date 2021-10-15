const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req,res) => {
    const item = await prisma.category.delete({where:{id: parseInt(req.params.id)}})
    // const notes = await prisma.notes.deleteMany({where:{categoryId: req.params.id}})
    res.status(200).json(item)
}