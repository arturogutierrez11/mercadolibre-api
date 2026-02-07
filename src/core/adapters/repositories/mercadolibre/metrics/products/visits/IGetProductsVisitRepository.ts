export interface IGetProductsVisitRepository {
  getVisitsById(itemId: string): Promise<number | null>;
}
