import { Module } from '@nestjs/common';
import { GetCategoriesTreeService } from 'src/app/services/categories/GetCategoriesTreeService';
import { MeliHttpModule } from '../http/meli-http.module';
import { MeliCategoriesController } from 'src/app/controllers/categories/MeliCategories.Controller';
import { GetCategoriesTreeRepository } from 'src/core/drivers/repositories/mercadolibre/categories/GetCategoriesTreeRepository';

@Module({
  imports: [MeliHttpModule],
  controllers: [MeliCategoriesController],
  providers: [
    GetCategoriesTreeService,
    {
      provide: 'IGetCategoriesTreeRepository',
      useClass: GetCategoriesTreeRepository,
    },
  ],
  exports: [GetCategoriesTreeService],
})
export class MeliCategoriesModule {}
