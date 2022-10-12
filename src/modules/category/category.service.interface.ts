import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { CategoryFilterDto } from './dto/category-filter-dto';

export interface ICategoryService {
  createCategory(dto: CreateCategoryDto);

  updateCategory(categoryId: string, dto: UpdateCategoryDto);

  deleteCategory(categoryId: string);

  getCategoryById(categoryId: string);

  getCategoryBySlug(slug: string);

  getCategoriesByFilter(filter: CategoryFilterDto);
}
