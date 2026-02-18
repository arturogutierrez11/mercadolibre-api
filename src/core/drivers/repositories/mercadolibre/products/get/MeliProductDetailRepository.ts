import { Inject, Injectable } from '@nestjs/common';
import type { IMeliHttpClient } from 'src/core/adapters/repositories/mercadolibre/http/IMeliHttpClient';
import { IMeliProductDetailRepository } from 'src/core/adapters/repositories/mercadolibre/products/get/IMeliProductDetailRepository';
import { MeliProductDetail } from 'src/core/entitis/mercadolibre/products/get/MeliProductDetail';

@Injectable()
export class MeliProductDetailRepository implements IMeliProductDetailRepository {
  constructor(
    @Inject('IMeliHttpClient')
    private readonly httpClient: IMeliHttpClient,
  ) {}

  async getProductDetail(itemId: string): Promise<MeliProductDetail | null> {
    if (!itemId) return null;

    const item = await this.httpClient.get<any>(`/items/${itemId}`);
    if (!item) return null;

    const descriptionResponse = await this.httpClient
      .get<any>(`/items/${itemId}/description`)
      .catch(() => null);

    const sellerSkuAttr = item.attributes?.find(
      (attr: any) => attr.id === 'SELLER_SKU',
    );

    const brandAttr = item.attributes?.find((attr: any) => attr.id === 'BRAND');

    return {
      id: item.id,
      categoryId: item.category_id,
      title: item.title,
      price: item.price,
      currency: item.currency_id,
      stock: item.available_quantity,
      soldQuantity: item.sold_quantity,
      status: item.status,
      condition: item.condition,
      permalink: item.permalink,
      thumbnail: item.thumbnail,
      pictures: item.pictures?.map((pic: any) => pic.secure_url) ?? [],
      sellerSku: sellerSkuAttr?.value_name ?? undefined,
      brand: brandAttr?.value_name ?? undefined,
      warranty: item.warranty,
      freeShipping: item.shipping?.free_shipping ?? false,
      health: item.health,
      lastUpdated: item.last_updated,
      description: descriptionResponse?.plain_text ?? undefined,
    };
  }
}
