import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job/entities/job.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DATABASE_HOST') || 'localhost',
        port: parseInt(
          configService.get<string>('DATABASE_PORT') || '5432',
          10,
        ),
        username: configService.get<string>('DATABASE_USERNAME') || '',
        password: configService.get<string>('DATABASE_PASSWORD') || '',
        database: configService.get<string>('DATABASE_NAME') || '',
        entities: [Job, User],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),

    JobModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
