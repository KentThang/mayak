# Mayak

## Description

Mayak or маяк is a dashboard to centralize and track all my language learning efforts.

## Tech stack

frontend: typescript, react
backend: typescript, express, nodejs
db: sqlite (prisma) https://www.prisma.io/docs/prisma-orm/quickstart/sqlite

## Setup

1. npm install in both `/frontend` and `/backend`.
2. (add environment variables to `.env` file in `/backend`)
3. in `/backend` run `npx prisma generate` to generate the Prisma client.
4. in `/backend` run `npx prisma migrate dev --name init` to create the database file.

### Running the program

Run mayak by running `npm run dev` in the root folder.
Alternatively, run `npm run dev` in two separate terminals in both `/frontend` and `/backend`

## Other

image used:
https://pixabay.com/photos/lighthouse-ebb-beach-coast-beacon-6915406/
