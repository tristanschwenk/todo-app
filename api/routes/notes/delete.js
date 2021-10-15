const {
    PrismaClient
} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res) => {
    console.log(req.body.ids)
    const item = await prisma.notes.deleteMany({
        where: {
            id: {in : req.body.ids}
        }
    })
    res.status(200).json(item)
}