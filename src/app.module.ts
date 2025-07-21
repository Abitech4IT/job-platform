import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job/entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '@adeshina',
      database: 'job-platform-db',
      entities: [Job],
      synchronize: true,
      logging: true,
    }),
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
