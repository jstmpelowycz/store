export interface Category {
  id: number;
  name: string;
}

export type CreateCategoryFields = Pick<Category, 'name'>;

export type UpdateCategoryFields = Partial<Pick<Category, 'name'>>;
