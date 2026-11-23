import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import type { QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class PostgresConnection implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    console.log('DATABASE_URL:', connectionString);
    if (!connectionString) {
      throw new Error('DATABASE_URL must be set to connect to PostgreSQL');
    }

    this.pool = new Pool({ connectionString,
          options: '-c search_path=dev',
     });
    
  }

  query<Row extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: unknown[],
  ): Promise<QueryResult<Row>> {
    return this.pool.query<Row>(text, values);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
