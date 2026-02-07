import { Module } from '@nestjs/common';
import { GetOrdersService } from 'src/app/services/orders/GetOrdersService';
import { MeliHttpModule } from '../http/meli-http.module';
import { MeliOrdersController } from 'src/app/controllers/orders/MeliOrders.Controller';
import { GetOrdersRepository } from 'src/core/drivers/repositories/mercadolibre/orders/GetOrdersRepository';

@Module({
  imports: [MeliHttpModule],
  controllers: [MeliOrdersController],
  providers: [
    GetOrdersService,
    {
      provide: 'IGetOrdersRepository',
      useClass: GetOrdersRepository,
    },
  ],
  exports: [GetOrdersService],
})
export class MeliOrdersModule {}
