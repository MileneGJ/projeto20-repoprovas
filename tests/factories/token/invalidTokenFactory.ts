import { faker } from "@faker-js/faker"

export default async function invalidTokenFactory() {
    return faker.datatype.uuid()
}