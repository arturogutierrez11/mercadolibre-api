export type MeliProductStatus = 'active' | 'paused' | 'closed';

export interface IMeliProductsRepository {
  getProducts(params: {
    status?: MeliProductStatus;

    offset?: number;
    limit?: number;

    useScan?: boolean;
    scrollId?: string;
  }): Promise<{
    seller_id: string;
    results: string[];

    scroll_id?: string;

    paging?: {
      limit?: number;
      offset?: number;
      total?: number;
    };
  } | null>;
}
