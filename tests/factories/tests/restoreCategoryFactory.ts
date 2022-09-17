import prisma from "../../../src/database/database";

export default async function restoreCategoryFactory (name:string) {
    await prisma.categories.create({data:{name}})
}