const {
    PrismaClient
} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res) => {
    const categories = await prisma.category.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            notes: false
        }
    })
    res.status(200).json(categories)
}