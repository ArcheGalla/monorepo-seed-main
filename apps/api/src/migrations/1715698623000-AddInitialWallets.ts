import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitialWallets1715698623000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert wallet with GC. currency
    await queryRunner.query(`
      INSERT INTO relax_wallets (
        id,
        player_id,
        balance,
        currency,
        redeemable
      ) VALUES (
        uuid_generate_v4(),
        '2d63516e-496c-4ac7-a8c3-233723735c59',
        100000,
        'GC.',
        true
      )
    `);

    // Insert wallet with SC. currency
    await queryRunner.query(`
      INSERT INTO relax_wallets (
        id,
        player_id,
        balance,
        currency,
        redeemable
      ) VALUES (
        uuid_generate_v4(),
        '2d63516e-496c-4ac7-a8c3-233723735c59',
        100000,
        'SC.',
        true
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the wallets we added
    await queryRunner.query(`
      DELETE FROM relax_wallets
      WHERE player_id = '2d63516e-496c-4ac7-a8c3-233723735c59'
      AND currency IN ('GC.', 'SC.')
    `);
  }
}
