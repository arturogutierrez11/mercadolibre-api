export interface CategoryPathNode {
  id: string;
  name: string;
}

export interface CategoryChild {
  id: string;
  name: string;
  totalItems?: number;
}

export interface Category {
  id: string;
  name: string;

  picture?: string;
  permalink?: string;
  totalItems?: number;

  pathFromRoot?: CategoryPathNode[];

  children: CategoryChild[];
}
