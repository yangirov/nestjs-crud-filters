import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { Attributes, FindOptions } from 'sequelize/types/model';
import { ICategoryRepository } from './category.repository.interface';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category) private categoriesRepository: typeof Category,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesRepository.create(dto);
  }

  async update(entity: Category, dto: UpdateCategoryDto) {
    return await entity.update(dto);
  }

  async delete(categoryId: string): Promise<number> {
    return await this.categoriesRepository.destroy({
      where: { id: categoryId },
    });
  }

  async findById(categoryId: string): Promise<Category | null> {
    return await this.categoriesRepository.findOne({
      where: {
        id: categoryId,
      },
    });
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return await this.categoriesRepository.findOne({
      where: {
        slug,
      },
    });
  }

  async findAndCountAll(
    filter: FindOptions<Attributes<Category>>,
  ): Promise<{ rows: Category[]; count: number }> {
    return await this.categoriesRepository.findAndCountAll(filter);
  }
}
