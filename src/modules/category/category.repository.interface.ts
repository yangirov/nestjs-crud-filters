import { CreateCategoryDto } from './dto/create-category-dto';
import { Category } from './category';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { Attributes, FindOptions } from 'sequelize/types/model';

export interface ICategoryRepository {
  create(dto: CreateCategoryDto): Promise<Category>;

  update(entity: Category, dto: UpdateCategoryDto): Promise<Category>;

  delete(categoryId: string): Promise<number>;

  findById(categoryId: string): Promise<Category | null>;

  findBySlug(slug: string): Promise<Category | null>;

  findAndCountAll(
    filter: FindOptions<Attributes<Category>>,
  ): Promise<{ rows: Category[]; count: number }>;
}
