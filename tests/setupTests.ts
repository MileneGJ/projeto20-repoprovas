import prisma from "../src/database/database"

global.beforeEach (async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Tests" RESTART IDENTITY`;
})


global.afterAll(async () => {
    await prisma.$disconnect()
})
