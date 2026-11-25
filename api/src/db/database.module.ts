// Creates a single PostgreSQL connection for the whole API and exposes it
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
// All the tables of the data model, grouped into one object
// (the .js extension is required even though the file is .ts)
import * as schema from './schema.js';

// Token used to request the database
export const DRIZZLE = Symbol('DRIZZLE');

// Connection type: a Drizzle instance that knows our tables
// Lets TypeScript check columns and types in every query
export type Database = NodePgDatabase<typeof schema>;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      // Dependencies Nest passes to the factory: ConfigService to read the .env
      inject: [ConfigService],
      useFactory: (config: ConfigService): Database => {
        const pool = new pg.Pool({
          connectionString: config.getOrThrow<string>('DATABASE_URL'),
        });

        return drizzle({ client: pool, schema });
      },
    },
  ],
  // Exposes the token so other modules can inject it
  exports: [DRIZZLE],
})
export class DatabaseModule {}