import {faker} from '@faker-js/faker'

export default async function loginUserFactory () {
    const password = faker.internet.password()
    return {
        email:faker.internet.email(),
        password
    }
}