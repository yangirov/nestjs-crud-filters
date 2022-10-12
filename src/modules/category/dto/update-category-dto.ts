import { BaseCategoryDto } from './category-dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(BaseCategoryDto) {}
