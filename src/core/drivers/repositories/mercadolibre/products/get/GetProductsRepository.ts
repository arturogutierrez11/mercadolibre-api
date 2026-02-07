import { Inject, Injectable } from '@nestjs/common';
import { IMeliProductsRepository } from 'src/core/adapters/repositories/mercadolibre/products/get/IMeliProductsRepository';
import { getMeliSellerId } from '../../getSeller/getMeliSellerId';
import type { IMeliHttpClient } from 'src/core/adapters/repositories/mercadolibre/http/IMeliHttpClient';

export type MeliProductStatus = 'active' | 'paused' | 'closed';

@Injectable()
export class MeliProductsRepository implements IMeliProductsRepository {
  constructor(
    @Inject('IMeliHttpClient')
    private readonly httpClient: IMeliHttpClient,
  ) {}

  async getProducts(params): Promise<any | null> {
    const sellerId = getMeliSellerId();

    const query = new URLSearchParams();

    if (params.status) query.append('status', params.status);
    if (params.offset !== undefined)
      query.append('offset', params.offset.toString());
    if (params.limit !== undefined)
      query.append('limit', params.limit.toString());

    const response = await this.httpClient.get(
      `/users/${sellerId}/items/search?${query.toString()}`,
    );

    if (!response) return null;

    return {
      seller_id: sellerId,
      ...response,
    };
  }
}
