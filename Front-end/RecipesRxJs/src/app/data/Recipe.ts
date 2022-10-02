import { CategoryEnum } from './CategoryEnum';

export interface Recipe {
  id?: number;
  title?: string;
  ingredients?: string;
  category?: CategoryEnum;
  tags?: string;
  imageUrl?: string;
  cookingTime?: number;
  prepTime?: number | string;
  yield?: number;
  steps?: string;
  rating?: number;
}
