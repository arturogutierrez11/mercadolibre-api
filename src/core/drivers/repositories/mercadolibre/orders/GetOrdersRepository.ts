import { Inject, Injectable } from '@nestjs/common';
import {
  IGetOrdersRepository,
  GetOrdersParams,
  OrdersPage,
} from 'src/core/adapters/repositories/mercadolibre/orders/IGetOrdersRepository';
import type { IMeliHttpClient } from 'src/core/adapters/repositories/mercadolibre/http/IMeliHttpClient';
import { getMeliSellerId } from '../getSeller/getMeliSellerId';
import { MeliOrderMapper } from './mapper/MeliOrderMapper';

@Injectable()
export class GetOrdersRepository implements IGetOrdersRepository {
  constructor(
    @Inject('IMeliHttpClient')
    private readonly meliHttpClient: IMeliHttpClient,
  ) {}

  async getOrders(params: GetOrdersParams): Promise<OrdersPage> {
    const sellerId = getMeliSellerId();

    const query =
      `/orders/search?seller=${sellerId}` +
      `&order.status=${params.status ?? 'paid'}` +
      `&limit=${params.limit}` +
      `&offset=${params.offset}`;

    const response = await this.meliHttpClient.get<any>(query);

    return {
      results: (response.results ?? []).map(MeliOrderMapper.toEntity),
      paging: {
        total: response.paging?.total ?? 0,
        offset: response.paging?.offset ?? params.offset,
        limit: response.paging?.limit ?? params.limit,
      },
    };
  }
}
