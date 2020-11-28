# Lame Recipes

That lame app you use to collect recipes.

## Tech stack

- Typescript
- Express
- GraphQL
- React
- TypeORM
- SQLite

## How to run and generate migrations

You must have `ts-node` installed globally to be able to perform TypeORM operations with ts files.

```shell
npm install -g ts-node
```

Now to execute migrations, just run:

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
