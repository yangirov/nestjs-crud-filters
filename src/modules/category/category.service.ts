import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { CategoryDto } from './dto/category-dto';
import { CategoryFilterDto } from './dto/category-filter-dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { literal, Op } from 'sequelize';
import { Pagination } from './pagination';
import { TYPES } from '../../types';
import { Category } from './category';
import { ICategoryRepository } from './category.repository.interface';
import { ICategoryService } from './category.service.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(TYPES.CategoryRepository)
    private categoriesRepository: ICategoryRepository,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<CategoryDto> {
    try {
      const category = await this.categoriesRepository.create(dto);
      return plainToClass(CategoryDto, instanceToPlain(category));
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }

  async updateCategory(
    categoryId: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    try {
      const category = await this.checkById(categoryId);
      const updatedCategory = await this.categoriesRepository.update(
        category,
        dto,
      );
      return plainToClass(CategoryDto, instanceToPlain(updatedCategory));
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }

  async deleteCategory(categoryId: string): Promise<boolean> {
    const category = await this.checkById(categoryId);
    const isDeleted = await this.categoriesRepository.delete(categoryId);
    return Boolean(isDeleted);
  }

  async getCategoryById(categoryId: string): Promise<CategoryDto> {
    const category = await this.checkById(categoryId);
    return this.getOne(category);
  }

  async getCategoryBySlug(slug: string): Promise<CategoryDto> {
    const category = await this.categoriesRepository.findBySlug(slug);
    return this.getOne(category);
  }

  async getCategoriesByFilter(
    filter: CategoryFilterDto,
  ): Promise<Pagination<CategoryDto>> {
    try {
      const textSearchLiteral = (column: string, q: string) =>
        literal(`unaccent(${column}) ILIKE ('%' || unaccent('${q}') || '%')`);

      const searchTextFilters = () => {
        if (filter.search) {
          return {
            [Op.or]: [
              {
                name: filter.name
                  ? textSearchLiteral('name', filter.search)
                  : {
                      [Op.not]: null,
                    },
              },
              {
                description: filter.description
                  ? textSearchLiteral('description', filter.search)
                  : {
                      [Op.not]: null,
                    },
              },
            ],
          };
        }

        return {
          name: filter.name
            ? textSearchLiteral('name', filter.name)
            : {
                [Op.not]: null,
              },
          description: filter.description
            ? textSearchLiteral('description', filter.description)
            : {
                [Op.not]: null,
              },
        };
      };

      const categories = await this.categoriesRepository.findAndCountAll({
        limit: filter.pageSize,
        offset: filter.page * filter.pageSize,
        order: [
          [filter.sort?.field || 'createdAt', filter.sort?.direction || 'DESC'],
        ],
        where: {
          ...searchTextFilters,
          active: filter.hasOwnProperty('active')
            ? {
                [Op.eq]: Boolean(filter.active),
              }
            : { [Op.eq]: true },
        },
      });

      return {
        count: categories?.count,
        rows: categories?.rows?.map((x: Category) =>
          plainToClass(CategoryDto, instanceToPlain(x)),
        ),
      };
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }

  private async checkById(categoryId: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) throw new NotFoundException(`Category not found`);

    return category;
  }

  private getOne<T>(category: T): CategoryDto {
    if (!category) throw new NotFoundException(`Category not found`);

    return plainToClass(CategoryDto, instanceToPlain(category));
  }
}
