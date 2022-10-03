import { CategoryEnum } from './CategoryEnum';

export interface Filter {
  title?: string;
  category?: CategoryEnum;
  rating?: number;
}
