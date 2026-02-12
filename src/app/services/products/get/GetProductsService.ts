import { Inject, Injectable } from '@nestjs/common';
import type { IMeliProductsRepository } from 'src/core/adapters/repositories/mercadolibre/products/get/IMeliProductsRepository';
import { MeliProductStatus } from 'src/core/drivers/repositories/mercadolibre/products/get/GetProductsRepository';
import { MeliProductsPage } from 'src/core/entitis/mercadolibre/products/get/MeliProductsPage';

@Injectable()
export class GetProductsService {
  constructor(
    @Inject('IMeliProductsRepository')
    private readonly productsRepo: IMeliProductsRepository,
  ) {}

  async getProducts(
    status: MeliProductStatus = 'active',
    offset = 0,
    limit = 50,
    forceScan = false,
    scrollId?: string,
  ): Promise<MeliProductsPage> {
    const useScan = forceScan || offset >= 1000;

    const raw = await this.productsRepo.getProducts({
      status,
      offset: useScan ? undefined : offset,
      limit,
      useScan,
      scrollId,
    });

    if (!raw) {
      return {
        seller_id: '',
        items: [],
        pagination: {
          limit,
          offset,
          total: 0,
          has_next: false,
        },
      };
    }

    if (useScan) {
      return {
        seller_id: raw.seller_id,
        items: raw.results ?? [],
        scroll_id: raw.scroll_id,
        pagination: {
          limit,
          offset: 0,
          total: raw.paging?.total ?? 0,
          has_next: (raw.results?.length ?? 0) > 0,
        },
      };
    }
    const total = raw.paging?.total ?? 0;

    return {
      seller_id: raw.seller_id,
      items: raw.results ?? [],
      pagination: {
        limit,
        offset,
        total,
        has_next: offset + limit < total,
      },
    };
  }
}
