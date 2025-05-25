# Contributing to Relax API

The project is a  RESTful API built with NestJS, TypeScript, TypeORM, and PostgreSQL.

## Features

- **NestJS Framework**: Modern, efficient, and scalable Node.js framework
- **TypeScript**: Type-safe code development
- **PostgreSQL**: Robust relational database
- **TypeORM**: ORM for database interaction
- **Swagger**: API documentation
- **Jest**: Unit and e2e testing
- **ESLint & Prettier**: Code quality and formatting

## Prerequisites

- Node.js (v20 or later)
- npm 
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd relax-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create an `.env` file in the root directory as described in the [Environment variables reference](environment.md).

5. Start local PostgreSQL server:

```bash
docker compose up -d
```

6. Create tables in the PostgreSQL database

```bash
npm run migration:run
```

## Running the Application in development mode

```bash
npm run start:dev
```

The application will start in watch mode (server will automatically restart if you make changes in the files) at http://localhost:3000.

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## Testing

There are API tests in the `test/api` directory. To run the tests, use the following commands:

```bash
npm run test:api
```

Make sure the server is already running before running the tests. Both API and test share the same `.env` file when srarted locally.