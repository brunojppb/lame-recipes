# Lame Recipes

A simple app to gather your recipes.

## Tech stack

- [Typescript](https://www.typescriptlang.org/)
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

### Milestone 3

- [ ] Integrate Cypress for end-to-end tests

### Milestone 4

- [ ] TODO
