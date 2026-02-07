import { Category } from 'src/core/entitis/mercadolibre/categories/Category';

export interface IGetCategoriesTreeRepository {
  getTree(): Promise<Category[]>;
}
