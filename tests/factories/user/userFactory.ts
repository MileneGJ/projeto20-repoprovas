import {faker} from '@faker-js/faker'

export default async function userFactory () {
    const password = faker.internet.password()
    return {
        email:faker.internet.email(),
        password,
        confirmPassword:password
    }
}