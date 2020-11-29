# Lame Recipes

A simple app to gather your recipes.

## Tech stack

- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [GraphQL with Apollo](https://graphql.org/)
- [React](https://reactjs.org/)
- [TypeORM (SQLite)](https://typeorm.io/)

## How to run and generate migrations

You must have `ts-node` installed globally to be able to perform TypeORM operations with ts files. There is a way to execute them targeting `.js` files, but I wan't to run it fully with Typescript, so I still need to figure it out a better way to do it. For now, just install `ts-node` in the global scope.

```shell
npm install -g ts-node
```

Now to execute existing migrations, just run:

```shell
npm run typeorm migration:run
```

To generate a new migration, just run:

```shell
npm run typeorm migration:generate -- -n migrationNameHere
```

## To start things up

```shell
# Install all dependencies
npm install
# run any pending migrations
npm run typeorm migration:run
# Execute dev server
npm run dev
```

## Milestones

I have a simple goal for this project. A webapp where my wife and I can upload our own recipes with pictures and a easy way to access them. But we want to make it a way where we can upload our own pictures and also sort them based on the number of ingredients involved.

### Milestone 1

- [x] App template from scratch with Typescript
- [x] Add persistent data storage (Was between Mongo and SQL. ended up sticking with SQLite for now. Believe me, it can handle)
- [x] Hook up graphQL server with Apollo
- [x] Add simple structure for resolving GraphQL resolvers (no pun intended)

### Milestone 2

- [ ] Add React app as frontend
- [ ] Serve React app from express

### Milestone 3

- [ ] Add final models and migrations
- [ ] Write some tests to make sure the business logic is legit

### Milestone 4

- TODO
