# <p align = "center"> Driven Bootcamp - Projeto RepoProvas </p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/72531277/178094665-f46c6a55-c821-42a0-bb9c-d5dd5f2d69fa.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Milene_Jannetti-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Milene_Jannetti/RepoProvas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

Back-end project developed for Driven Bootcamp. It was designed as a repository of educational tests, in which registered users can add new tests and visualize them by discipline or teacher.

***

## :computer:	 Technologies and Concepts

- REST APIs
- JWTs & refresh tokens
- Node.js and Express
- TypeScript
- PostgreSQL using PrismaClient

***

## :rocket: Routes

```yml
POST /signup
    - Route for signing up new users
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum"
    }
```
    
```yml 
POST /signin
    - Route for registered users to log in
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum"
    }
```
    
```yml 
POST /tests (authentication required)
    - Route for posting a new test to the repository
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name":"202201FirstTest",
        "pdfUrl":"https://www.url.com",
        "category":"any of 'Projeto','Prática' or 'Recuperação'",
        "discipline":"loremipsum",
        "teacher":"Lorem Ipsum"
    }
```

```yml
GET /tests/:teacherId (authentication required)
    - Route for returning all tests related to a teacher, ordered by category
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /tests/:termId/:disciplineId (authentication required)
    - Route for returning all tests related to a discipline of a term, ordered by category
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
```yml
GET /teachers (authentication required)
    - Route for listing all teachers, auxiliary for front-end implementation
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /terms (authentication required)
    - Route for listing all terms, auxiliary for front-end implementation
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /disciplines/:termId (authentication required)
    - Route for listing all disciplines of a term, auxiliary for front-end implementation
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## 🏁 Running the application

This Api can be used in two different ways: by cloning the project or by running in your preferred client, such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/).

To clone the project, run the following command:

```git
git clone https://github.com/MileneGJ/projeto19-drivenpass.git
```

Then, navigate to the project folder and run the following command:

```git
npm install
```

Finally, start the server:

```git
npm start
```

You can now access the API's endpoints by navigating to `http://localhost:5000/` or the deployed version on `https://drivenpass-backend.herokuapp.com/`

## Database

This project used as reference a postgres database created using Prisma. You can refer to <a href="https://github.com/MileneGJ/projeto20-repoprovas/blob/main/prisma/schema.prisma"><strong>this file</strong></a> to see the database structure