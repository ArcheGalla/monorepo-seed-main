import { ValueTransformer } from 'typeorm';

// The standard "integer" type in PostgreSQL is much smaller than JavaScript's safe integer limit.
// That's why it is okay to have bigint in Postres but still cast it to JS integer.
// The TypeORM plays safe with PostgreSQL bigints and converts them to strings just in case.
// That's why we need to cast them back to JS integers with this transformer.

export const numberTransformer: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string) => parseInt(databaseValue, 10),
};
