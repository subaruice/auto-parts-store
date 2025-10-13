export interface Subcategory {
  categoryID: number;
  name: string;
  parent: number;
}

export interface Category {
  categoryID: number;
  name: string;
  parent: number;
  subcategories: Category[] | [];
}
