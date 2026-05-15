export type Category = string;

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  isFeatured?: boolean;
}

export type SortOption = "price-asc" | "price-desc" | "alphabetical";

export interface ProductFilters {
  search: string;
  category: Category | "All";
  sortBy: SortOption;
}
