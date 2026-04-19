export type TProduct = {
  id: number;
  title: string;
  total_rating: number;
  manufacturer: string;
  thumbnail: string;
  category_name: string;
  isFavorite?: boolean;
};