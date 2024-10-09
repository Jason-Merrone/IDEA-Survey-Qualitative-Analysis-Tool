# App Setup

## Setting up Bun

You can install bun by running the install command found on this page: [Bun.sh](https://bun.sh/)

## Installing dependencies

_Prerequisites: You must have installed [bun](./app.md#setting-up-bun)._

Once you have installed bun, you can install the dependencies by running the following command:

```bash
bun install
```

## Setting up the environment

_Prerequisites: You must have installed [bun](./app.md#setting-up-bun)._

This app requires an environment variable to be set. You can set it by creating a `.env` file in the root of the project. Here is an example of what the `.env` file should look like for local development:

```bash
DATABASE_URL="mysql://root:password@localhost:3306/idea-ideas"
```

You will need to replace `password` with an actual password. This will be the password for the local postgres database. Since this is a local development environment, you can set the password to whatever you want. You can find a sample `.env` file in the root of the project at `.env.example`.

## Setting up the database

Details about setting up the database can be found in [Setting up the Database](./database.md#starting-the-database).

## Running the app

_Prerequisites: You must have installed [bun](./app.md#setting-up-bun), set up the [environment](./app.md#setting-up-the-environment), and set up the [database](./database.md#starting-the-database)._

You can run the app by running the following command:

```bash
bun dev
```

This will start the app on [http://localhost:3000](http://localhost:3000). You can view the app by navigating to that URL in your browser.
