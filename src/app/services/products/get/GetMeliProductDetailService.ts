import { Inject, Injectable } from '@nestjs/common';
import type { IMeliProductDetailRepository } from 'src/core/adapters/repositories/mercadolibre/products/get/IMeliProductDetailRepository';
import { MeliProductDetail } from 'src/core/entitis/mercadolibre/products/get/MeliProductDetail';

@Injectable()
export class GetMeliProductDetailService {
  constructor(
    @Inject('IMeliProductDetailRepository')
    private readonly meliProductDetailRepository: IMeliProductDetailRepository,
  ) {}

  async execute(itemId: string): Promise<MeliProductDetail | null> {
    if (!itemId) {
      throw new Error('ItemId is required');
    }

    const product =
      await this.meliProductDetailRepository.getProductDetail(itemId);

    if (!product) {
      return null;
    }

    return product;
  }
}
