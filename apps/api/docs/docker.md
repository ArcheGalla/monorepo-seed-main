# Docker Setup for Relax API

This document provides instructions for building and running the Relax API using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Building the Docker Image

To build the Docker image for the Relax API:

```bash
docker build -t relax-api .
```

## Running with Docker Compose

### Development Environment

The project includes a `docker-compose.yaml` file for the development environment that sets up PostgreSQL and pgAdmin:

```bash
docker compose up -d
```

### Production Environment

For production, use the `docker-compose.prod.yaml` file which includes both the database and the application:

```bash
docker compose -f docker-compose.prod.yaml up -d
```

This will:
1. Build the Relax API Docker image if it doesn't exist
2. Start a PostgreSQL container
3. Start the Relax API container
4. Run database migrations automatically on startup
5. Serve the application on the configured port (default: 3000)

## Environment Variables

The Docker setup uses environment variables from your `.env` file. Make sure this file is properly configured before running the containers.

## Accessing the API

Once the containers are running, you can access:

- The API at: http://localhost:3000/api/relax/...
- API documentation at: http://localhost:3000/api/
- Documentation pages at: http://localhost:3000/docs/

## Container Management

### Viewing Logs

```bash
# View logs for all containers
docker compose -f docker-compose.prod.yaml logs

# View logs for a specific container
docker compose -f docker-compose.prod.yaml logs relax-api
```

### Stopping Containers

```bash
docker compose -f docker-compose.prod.yaml down
```

### Stopping and Removing Volumes

```bash
docker compose -f docker-compose.prod.yaml down -v
```

## Troubleshooting

If you encounter issues with database connections, ensure:

1. The PostgreSQL container is running and healthy
2. The environment variables are correctly set
3. The database migrations have run successfully

You can check the migration status by viewing the container logs:

```bash
docker compose -f docker-compose.prod.yaml logs relax-api
```