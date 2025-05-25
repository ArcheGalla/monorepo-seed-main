import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableUuidExtension1715698622000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable the uuid-ossp extension for uuid_generate_v4() function
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // We don't want to drop the extension in down migration
    // as it might be used by other parts of the application
  }
}
