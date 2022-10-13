import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './modules/category/category';
import { HealthModule } from './modules/health/health.module';
import { CategoryModule } from './modules/category/category.module';
import { LoggerModule } from 'nestjs-pino';
import { CategoryController } from './modules/category/category.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Category],
      autoLoadModels: true,
    }),
    CategoryModule,
    HealthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'SOME BACKEND',
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: {
          targets: [
            {
              level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
              target: 'pino-loki',
              options: {
                batching: true,
                interval: 5,
                hostname: process.env.LOKI_URL,
              },
            },
            {
              target: 'pino-pretty',
              options: {},
              level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            },
          ],
        },
      },
      forRoutes: [CategoryController],
      exclude: [{ method: RequestMethod.ALL, path: 'health' }],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
