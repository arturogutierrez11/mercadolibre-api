export interface IMeliProductsRepository {
  getProducts(params: {
    status?: 'active' | 'paused' | 'closed';
    offset?: number;
    limit?: number;
  }): Promise<any>;
}
