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
  ): Promise<MeliProductsPage> {
    /**
     * 🔥 MercadoLibre no permite offset > 1000
     * Entonces si superamos 1000 usamos SCAN mode
     */
    const useScan = offset >= 1000;

    const raw = await this.productsRepo.getProducts({
      status,
      offset: useScan ? undefined : offset,
      limit,
      useScan,
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
