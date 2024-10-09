# Database Setup

## Starting the Database

_Prerequisites: You must have installed [bun](./app.md#setting-up-bun) and have set up the [environment](./app.md#setting-up-the-environment)._

While developing locally, you can set up a database to test with by following the steps below. You will need to have docker installed on your machine.

1. Run the following command to start a postgres database:

```bash
bun db:start
```

2. Setup the schema of the database by running the following command:

```bash
bun db:push
```

## Prisma Studio

Prisma Studio is a tool that allows you to view and manage your database. To start Prisma Studio for this project, run the following command:

_Prerequisites: You must have installed [bun](./app.md#setting-up-bun), have set up the [environment](./app.md#setting-up-the-environment), and started the [database](./database.md#starting-the-md)._

```bash
bun db:studio
```

This will start Prisma studio on [http://localhost:5555/](http://localhost:5555/). You can view the studio by navigating to that URL in your browser.
