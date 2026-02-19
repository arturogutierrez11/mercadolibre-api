import { Category } from 'src/core/entitis/mercadolibre/categories/Category';

export interface IGetCategoriesTreeRepository {
  getRootCategories(): Promise<{ id: string; name: string }[]>;
  getCategoryById(categoryId: string): Promise<Category>;
}
