import { Module } from '@nestjs/common';
import { GetProductsVisitRepository } from 'src/core/drivers/repositories/mercadolibre/metrics/products/visits/GetProductsVisitRepository';
import { MeliVisitsController } from 'src/app/controllers/metrics/products/visits/meli-visits.controller';
import { MeliVisitsService } from 'src/app/services/metrics/products/visits/meli-visitsService';
import { MeliHttpModule } from 'src/app/modules/http/meli-http.module';

@Module({
  imports: [MeliHttpModule],
  controllers: [MeliVisitsController],
  providers: [
    MeliVisitsService,
    {
      provide: 'IGetProductsVisitRepository',
      useClass: GetProductsVisitRepository,
    },
  ],
})
export class MeliVisitsModule {}
