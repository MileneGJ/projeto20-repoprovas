import prisma from "../src/database/database";

async function main() {
    await prisma.terms.upsert({
        where:{number:1},
        update:{},
        create:{number:1}})
    await prisma.terms.upsert({
        where:{number:2},
        update:{},
        create:{number:2}})
    await prisma.terms.upsert({
        where:{number:3},
        update:{},
        create:{number:3}})
    await prisma.terms.upsert({
        where:{number:4},
        update:{},
        create:{number:4}})
    await prisma.terms.upsert({
        where:{number:5},
        update:{},
        create:{number:5}})
    await prisma.terms.upsert({
        where:{number:6},
        update:{},
        create:{number:6}})

    await prisma.categories.upsert({
        where:{name:"Projeto"},
        update:{},
        create:{name:"Projeto"}})
    await prisma.categories.upsert({
        where:{name:"Prática"},
        update:{},
        create:{name:"Prática"}})
    await prisma.categories.upsert({
        where:{name:"Recuperação"},
        update:{},
        create:{name:"Recuperação"}})

    await prisma.teachers.upsert({
        where:{name:"Diego Pinho"},
        update:{},
        create:{name:"Diego Pinho"}})
    await prisma.teachers.upsert({
        where:{name:"Bruna Hamori"},
        update:{},
        create:{name:"Bruna Hamori"}})

    await prisma.disciplines.upsert({
        where:{name:"HTML e CSS"},
        update:{},
        create:{termId:1,name:"HTML e CSS"}})
    await prisma.disciplines.upsert({
        where:{name:"JavaScript"},
        update:{},
        create:{termId:2,name:"JavaScript"}})
    await prisma.disciplines.upsert({
        where:{name:"React"},
        update:{},
        create:{termId:3,name:"React"}})
    await prisma.disciplines.upsert({
        where:{name:"Humildade"},
        update:{},
        create:{termId:1,name:"Humildade"}})
    await prisma.disciplines.upsert({
        where:{name:"Planejamento"},
        update:{},
        create:{termId:2,name:"Planejamento"}})
    await prisma.disciplines.upsert({
        where:{name:"Autoconfiança"},
        update:{},
        create:{termId:3,name:"Autoconfiança"}})

    const exists1 = await prisma.teachersDisciplines.findFirst({
        where:{AND:[{teacherId:1},{disciplineId:1}]}})
    if(!exists1){
        await prisma.teachersDisciplines.create({data:{teacherId:1,disciplineId:1}})
    }
    const exists2 = await prisma.teachersDisciplines.findFirst({
        where:{AND:[{teacherId:1},{disciplineId:2}]}})
    if(!exists2){
        await prisma.teachersDisciplines.create({data:{teacherId:1,disciplineId:2}})
    }
    const exists3 = await prisma.teachersDisciplines.findFirst({
        where:{AND:[{teacherId:1},{disciplineId:3}]}})
    if(!exists3){
        await prisma.teachersDisciplines.create({data:{teacherId:1,disciplineId:3}})
    }
    const exists4 = await prisma.teachersDisciplines.findFirst({
        where:{AND:[{teacherId:2},{disciplineId:4}]}})
    if(!exists4){
        await prisma.teachersDisciplines.create({data:{teacherId:2,disciplineId:4}})
    }
    const exists5 = await prisma.teachersDisciplines.findFirst({
        where:{AND:[{teacherId:2},{disciplineId:5}]}})
    if(!exists5){
        await prisma.teachersDisciplines.create({data:{teacherId:2,disciplineId:5}})
    }
    const exists6 = await prisma.teachersDisciplines.findFirst({
        where:{AND:[{teacherId:2},{disciplineId:6}]}})
    if(!exists6){
        await prisma.teachersDisciplines.create({data:{teacherId:2,disciplineId:6}})
    }
}

main()
    .catch(e=>{
        console.log(e);
        process.exit(1);
    })
    .finally(()=>{
        prisma.$disconnect();
    })