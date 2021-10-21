const CronJob = require('cron').CronJob;
const {
    PrismaClient
} = require('@prisma/client')
const prisma = new PrismaClient()


const job = new CronJob('1 */10 * * * *', async ()=> {
    const done = await prisma.notes.deleteMany({
        where: {
            checked: true 
        }
    })
    console.log("deleted checked element:", done)
})

module.exports = job