import { Inject, Injectable } from '@nestjs/common';
import { IMeliProductsRepository } from 'src/core/adapters/repositories/mercadolibre/products/get/IMeliProductsRepository';
import { getMeliSellerId } from '../../getSeller/getMeliSellerId';
import type { IMeliHttpClient } from 'src/core/adapters/repositories/mercadolibre/http/IMeliHttpClient';

export type MeliProductStatus = 'active' | 'paused' | 'closed';

/**
 * 🔹 Respuesta real de MercadoLibre
 */
type MeliSearchResponse = {
  scroll_id?: string;
  results?: string[];
  paging?: {
    total?: number;
    limit?: number;
    offset?: number;
  };
};

/**
 * 🔹 Respuesta normalizada interna
 */
export type MeliProductsNormalized = {
  seller_id: string;
  scroll_id?: string;
  results: string[];
  paging?: {
    total?: number;
    limit?: number;
    offset?: number;
  };
};

@Injectable()
export class MeliProductsRepository implements IMeliProductsRepository {
  constructor(
    @Inject('IMeliHttpClient')
    private readonly httpClient: IMeliHttpClient,
  ) {}

  async getProducts(params: {
    status?: MeliProductStatus;
    offset?: number;
    limit?: number;
    scrollId?: string;
    useScan?: boolean;
  }): Promise<MeliProductsNormalized | null> {
    const sellerId = getMeliSellerId();
    const query = new URLSearchParams();

    /**
     * 🔥 SCAN MODE (Recomendado para > 1000 items)
     */
    if (params.useScan) {
      query.append('search_type', 'scan');

      if (params.scrollId) {
        query.append('scroll_id', params.scrollId);
      }

      if (params.limit) {
        query.append('limit', params.limit.toString());
      }

      const response = await this.httpClient.get<MeliSearchResponse>(
        `/users/${sellerId}/items/search?${query.toString()}`,
      );

      if (!response) return null;

      return {
        seller_id: sellerId,
        scroll_id: response.scroll_id,
        results: response.results ?? [],
        paging: response.paging,
      };
    }

    /**
     * 🔵 NORMAL MODE (offset)
     * ⚠ MercadoLibre NO permite offset > 1000
     */
    if (params.status) query.append('status', params.status);
    if (params.offset !== undefined)
      query.append('offset', params.offset.toString());
    if (params.limit !== undefined)
      query.append('limit', params.limit.toString());

    const response = await this.httpClient.get<MeliSearchResponse>(
      `/users/${sellerId}/items/search?${query.toString()}`,
    );

    if (!response) return null;

    return {
      seller_id: sellerId,
      results: response.results ?? [],
      paging: response.paging,
    };
  }
}
