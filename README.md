# [Lame Recipes](https://lamerecipes.com)
![Docker Build and Deploy](https://github.com/brunojppb/lame-recipes/workflows/Build%20and%20Deploy/badge.svg?branch=master)

A simple app to gather your recipes.

## Tech stack

- JavaScript
- [Express](https://expressjs.com/)
- [GraphQL with Apollo](https://graphql.org/)
- [React](https://reactjs.org/)
- [Sequelize (with SQLite)](https://sequelize.org/)

## How generate migrations

```shell
npx sequelize-cli migration:generate --name migration-name-here
```

## To start things up

```shell
# Install all dependencies
npm install
# run any pending migrations
npm run migratedb
# Execute dev server
npm run dev
```

## Milestones

I have a simple goal for this project. A webapp where my wife and I can upload our own recipes with pictures and a easy way to access them. But we want to make it a way where we can upload our own pictures and also sort them based on the number of ingredients involved.

### Milestone 1

- [x] App template from scratch
- [x] Add persistent data storage (Was between Mongo and SQL. ended up sticking with SQLite for now. Believe me, it can handle)
- [x] Hook up graphQL server with Apollo
- [x] Add simple structure for resolving GraphQL resolvers (no pun intended)

### Milestone 2

- [x] Add models and database migrations structure
- [x] Add React app as frontend
- [x] Serve React app from express in production

### Milestone 4

- [x] Add authentication layer
- [x] Add custom directives for authentication
- [x] Protect auth routes on the frontend
- [x] User signup
- [x] User Sign in
- [x] Create recipes from client
- [x] List client recipes

### Milestone 5

- [x] Docker support for production deployment
- [x] Github actions for docker build
- [x] Automatic deployment pipeline via Github Actions


### Milestone X

- [ ] Integrate Cypress for end-to-end tests
- [ ] Global error handler on Apollo Server for better message formatting
- [ ] Better error handling on the frontend
- [ ] Search for recipes
- [ ] Add tags to Recipe model
- [ ] Add prep time to Recipe model