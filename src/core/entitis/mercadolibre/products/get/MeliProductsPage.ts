export interface MeliProductsPage {
  seller_id: string | null;
  items: string[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    has_next: boolean;
  };
}
