import { Category } from 'src/core/entitis/mercadolibre/categories/Category';

export interface IGetCategoriesTreeRepository {
  getTree(): Promise<Category[]>;
  getBranchById(categoryId: string): Promise<Category>;
}
