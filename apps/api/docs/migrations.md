# TypeORM Migrations

This project uses TypeORM for database migrations. The following commands are available:

## Migration Commands

### Create a new migration

```bash
npm run migration:create -- src/migrations/MigrationName
```

This will create a new empty migration file with the specified name.

### Generate a migration based on entity changes

```bash
npm run migration:generate -- src/migrations/MigrationName
```

This will generate a migration file based on the differences between your entities and the database schema.

### Run migrations

```bash
npm run migration:run
```

This will execute all pending migrations.

### Revert the last migration

```bash
npm run migration:revert
```

This will revert the last executed migration.

## Configuration

The TypeORM migration configuration is in `typeorm.config.ts` at the root of the project. This file uses the same database connection settings as your main application.