import { Injectable, Inject } from '@nestjs/common';
import type { IGetProductsVisitRepository } from 'src/core/adapters/repositories/mercadolibre/metrics/products/visits/IGetProductsVisitRepository';
import { ProductVisits } from 'src/core/entitis/mercadolibre/metrics/products/visits/ProductVisits';

@Injectable()
export class MeliVisitsService {
  constructor(
    @Inject('IGetProductsVisitRepository')
    private readonly visitsRepo: IGetProductsVisitRepository,
  ) {}

  async getProductVisits(itemId: string): Promise<ProductVisits> {
    const total = await this.visitsRepo.getVisitsById(itemId);

    return {
      item_id: itemId,
      total: total ?? 0,
    };
  }
}
