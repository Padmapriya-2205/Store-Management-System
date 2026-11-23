import { Global, Module } from '@nestjs/common';
import { PostgresConnection } from './postgres.connection';

@Global()
@Module({
  providers: [PostgresConnection],
  exports: [PostgresConnection],
})
export class DatabaseModule {}
