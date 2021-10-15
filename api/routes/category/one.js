const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req,res) => {
    const categories = await prisma.category.findUnique({where:{id: parseInt(req.params.id)},include: {notes:true}})
    res.status(200).json(categories)
}