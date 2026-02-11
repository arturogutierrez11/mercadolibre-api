export type MeliProductStatus = 'active' | 'paused' | 'closed';

export interface IMeliProductsRepository {
  getProducts(params: {
    status?: MeliProductStatus;

    // 🔵 Modo clásico (offset)
    offset?: number;
    limit?: number;

    // 🔴 Modo scan (para >1000 items)
    useScan?: boolean;
    scrollId?: string;
  }): Promise<{
    seller_id: string;
    results: string[];

    paging?: {
      limit?: number;
      offset?: number;
      total?: number;
    };

    scroll_id?: string;
  } | null>;
}
