export interface Category {
  id: string;
  name: string;
}

export type CreateCategoryFields = Pick<Category, 'name'>;

export type UpdateCategoryFields = Partial<Pick<Category, 'name'>>;
