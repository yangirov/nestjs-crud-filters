import { BaseCategoryDto } from './category-dto';
import { Expose } from 'class-transformer';

@Expose()
export class CreateCategoryDto extends BaseCategoryDto {}
