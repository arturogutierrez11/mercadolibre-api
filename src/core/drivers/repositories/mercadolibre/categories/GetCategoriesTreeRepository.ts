import { Inject, Injectable } from '@nestjs/common';
import type { IMeliHttpClient } from 'src/core/adapters/repositories/mercadolibre/http/IMeliHttpClient';
import { IGetCategoriesTreeRepository } from 'src/core/adapters/repositories/mercadolibre/categories/IGetCategoriesTreeRepository';
import { Category } from 'src/core/entitis/mercadolibre/categories/Category';

@Injectable()
export class GetCategoriesTreeRepository implements IGetCategoriesTreeRepository {
  constructor(
    @Inject('IMeliHttpClient')
    private readonly meliHttpClient: IMeliHttpClient,
  ) {}

  // 🔹 TREE = nivel 1 + nivel 2 solamente
  async getTree(): Promise<Category[]> {
    const roots = await this.meliHttpClient.get<any[]>('/sites/MLA/categories');

    if (!roots) return [];

    const result: Category[] = [];

    for (const root of roots) {
      const category = await this.meliHttpClient.get<any>(
        `/categories/${root.id}`,
      );

      const children = (category.children_categories ?? []).map(
        (child: any) => ({
          id: child.id,
          name: child.name,
          hasChildren: true, // puede tener más niveles
          children: [], // no los cargamos acá
        }),
      );

      result.push({
        id: category.id,
        name: category.name,
        hasChildren: children.length > 0,
        children,
      });
    }

    return result;
  }

  // 🔹 BRANCH = árbol profundo completo desde ese nodo
  async getBranchById(categoryId: string): Promise<Category> {
    return this.getFullBranch(categoryId);
  }

  // 🔥 Recursión profunda SOLO para branch
  private async getFullBranch(categoryId: string): Promise<Category> {
    const category = await this.meliHttpClient.get<any>(
      `/categories/${categoryId}`,
    );

    if (!category) {
      throw new Error(`Category ${categoryId} not found`);
    }

    const children: Category[] = [];

    for (const child of category.children_categories ?? []) {
      const fullChild = await this.getFullBranch(child.id);
      children.push(fullChild);
    }

    return {
      id: category.id,
      name: category.name,
      hasChildren: children.length > 0,
      children,
    };
  }
}
