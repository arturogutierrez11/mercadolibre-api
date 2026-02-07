import { Inject, Injectable } from '@nestjs/common';
import { IGetProductsVisitRepository } from 'src/core/adapters/repositories/mercadolibre/metrics/products/visits/IGetProductsVisitRepository';
import { MeliHttpClient } from '../../../http/MeliHttpClient';

@Injectable()
export class GetProductsVisitRepository implements IGetProductsVisitRepository {
  constructor(
    @Inject('IMeliHttpClient')
    private readonly meliHttpClient: MeliHttpClient,
  ) {}

  async getVisitsById(itemId: string): Promise<number | null> {
    const response = await this.meliHttpClient.get<Record<string, number>>(
      `/visits/items?ids=${itemId}`,
    );

    if (!response) return null;

    return response[itemId] ?? null;
  }
}
