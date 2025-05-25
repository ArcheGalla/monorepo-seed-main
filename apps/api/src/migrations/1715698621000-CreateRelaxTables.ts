import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelaxTables1715698621000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types for transactions table
    await queryRunner.query(`
            CREATE TYPE relax_transactions_action_enum AS ENUM ('withdraw', 'deposit', 'rollback');
        `);

    await queryRunner.query(`
            CREATE TYPE relax_transactions_channel_enum AS ENUM ('web', 'mobile');
        `);

    await queryRunner.query(`
            CREATE TYPE relax_transactions_txtype_enum AS ENUM (
                'withdraw', 'fswithdraw', 'deposit', 'freespinspayout', 'fsdeposit', 'promopayout'
            );
        `);

    // Create relax_tokens table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.relax_tokens
            (
                id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                gameid character varying(1024) COLLATE pg_catalog."default" NOT NULL,
                created_at timestamp without time zone NOT NULL DEFAULT now(),
                ticket_claimed_at timestamp without time zone,
                countrycode character varying(2) COLLATE pg_catalog."default" NOT NULL,
                jurisdiction character varying(5) COLLATE pg_catalog."default" NOT NULL,
                customercurrency character varying(3) COLLATE pg_catalog."default" NOT NULL,
                ticket uuid NOT NULL,
                player uuid NOT NULL,
                cashiertoken uuid NOT NULL,
                CONSTRAINT "PK_afa08ac2e3b0cafa5e69767252a" PRIMARY KEY (id)
            );

            CREATE UNIQUE INDEX IF NOT EXISTS "IDX_302a7f1440bb85b1b0afb1fa7c"
                ON public.relax_tokens USING btree
                (cashiertoken ASC NULLS LAST);

            CREATE UNIQUE INDEX IF NOT EXISTS "IDX_857253eb45f80c4cc977086c9e"
                ON public.relax_tokens USING btree
                (ticket ASC NULLS LAST);
        `);

    // Create relax_transactions table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.relax_transactions
            (
                errorcode character varying COLLATE pg_catalog."default",
                errormessage character varying COLLATE pg_catalog."default",
                action relax_transactions_action_enum NOT NULL,
                gameid character varying COLLATE pg_catalog."default",
                customerid character varying COLLATE pg_catalog."default" NOT NULL,
                gamesessionid character varying COLLATE pg_catalog."default",
                gameref character varying COLLATE pg_catalog."default",
                channel relax_transactions_channel_enum,
                clientid character varying COLLATE pg_catalog."default",
                currency character varying(3) COLLATE pg_catalog."default" NOT NULL,
                cashiertoken character varying COLLATE pg_catalog."default",
                txid bigint NOT NULL,
                txtype relax_transactions_txtype_enum,
                ended boolean,
                jpcontribution json,
                buyfeature boolean,
                promocode character varying COLLATE pg_catalog."default",
                jackpotpayout json,
                promotionid character varying COLLATE pg_catalog."default",
                originaltxid bigint,
                created_at timestamp without time zone NOT NULL DEFAULT now(),
                id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                balance_before bigint NOT NULL,
                balance_after bigint NOT NULL,
                balance_diff bigint NOT NULL,
                amount bigint NOT NULL,
                CONSTRAINT "PK_741df5bf6419a3b683168476eb1" PRIMARY KEY (id)
            );

            CREATE INDEX IF NOT EXISTS "IDX_0f2e3468855e94bb11eefb815b"
                ON public.relax_transactions USING btree
                (txid ASC NULLS LAST)
                WHERE errorcode IS NULL;
        `);

    // Create relax_wallets table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.relax_wallets
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                currency character varying(3) COLLATE pg_catalog."default" NOT NULL,
                redeemable boolean NOT NULL DEFAULT false,
                updated_at timestamp without time zone NOT NULL DEFAULT now(),
                player_id uuid NOT NULL,
                balance bigint NOT NULL DEFAULT '0'::bigint,
                CONSTRAINT "PK_767708f001a4d92623949d7828b" PRIMARY KEY (id)
            );

            CREATE UNIQUE INDEX IF NOT EXISTS "IDX_a6aad303bab16b44f641a15857"
                ON public.relax_wallets USING btree
                (player_id ASC NULLS LAST, currency COLLATE pg_catalog."default" ASC NULLS LAST);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS public.relax_wallets CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.relax_transactions CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.relax_tokens CASCADE;`);

    // Drop enum types
    await queryRunner.query(`DROP TYPE IF EXISTS relax_transactions_txtype_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS relax_transactions_channel_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS relax_transactions_action_enum;`);
  }
}
