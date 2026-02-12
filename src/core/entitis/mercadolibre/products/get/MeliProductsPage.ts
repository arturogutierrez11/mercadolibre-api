export interface MeliProductsPage {
  seller_id: string | null;
  items: string[];
  scroll_id?: string;
  pagination: {
    limit: number;
    offset: number;
    total: number;
    has_next: boolean;
  };
}
