import { MeliProductDetail } from 'src/core/entitis/mercadolibre/products/get/MeliProductDetail';

export interface IMeliProductDetailRepository {
  getProductDetail(itemId: string): Promise<MeliProductDetail | null>;
}
