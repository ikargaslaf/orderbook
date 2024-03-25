import { Module } from '@nestjs/common';
import { ContractsModule } from './contracts/contracts.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './orders/orders-item.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV
          ? process.cwd() + '/config/' + process.env.NODE_ENV + '.env'
          : 'config/development.env'
        }`,
      ignoreEnvFile: (process.env.NODE_ENV || '').toLowerCase() == 'production',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'postgres',
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_USER"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_NAME"),
          entities: [OrderItem],
          synchronize: true,
        };
      }
    }),
    ContractsModule,
    OrdersModule
  ],
})
export class AppModule { }
