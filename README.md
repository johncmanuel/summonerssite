# summonerssite

Website where gamers share and rate League of Legends memes and fanart with each other. CPSC 332 Project.

## Tech Stack

Front-end: React
Back-end: Express.js
Database: MySQL

## Setup

First, install MySQL and set it up for use. Afterwards, fill in the following information in `src/data-source.ts`:

```typescript

export const AppDataSource = new DataSource({
    // ...
    host: "localhost",
	port: <your port number>,
	username: "root",
	password: "password",
	database: <name of your database>,
    // ...
})

```

## Running the Project

First, run `npm run packages`

Then, run `npm run dev` to run the project locally.
