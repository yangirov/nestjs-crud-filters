import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { TYPES } from '../../types';
import { CreateCategoryDto } from './dto/create-category-dto';
import { faker } from '@faker-js/faker';
import { getModelToken } from '@nestjs/sequelize';
import { Category } from './category';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { CategoryFilterDto } from './dto/category-filter-dto';

const mockContractModel = () => ({
  findAndCountAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
});

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;

  const id = faker.datatype.uuid();
  const testCategory: CreateCategoryDto = {
    slug: 'test-slug',
    name: 'test category',
    description: 'lorem ipsum dolor sit amet',
    active: true,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Category),
          useValue: mockContractModel,
        },
        {
          provide: TYPES.CategoryRepository,
          useClass: CategoryRepository,
        },
        {
          provide: TYPES.CategoryService,
          useClass: CategoryService,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(TYPES.CategoryService);
    categoryRepository = module.get<CategoryRepository>(
      TYPES.CategoryRepository,
    );

    categoryRepository.findById = jest
      .fn()
      .mockReturnValue({ id, ...testCategory });
  });

  it('createCategory', async () => {
    // Arrange
    categoryRepository.create = jest
      .fn()
      .mockImplementationOnce((dto: CreateCategoryDto) => ({
        id,
        ...testCategory,
      }));

    // Act
    const createdCategory = await categoryService.createCategory(testCategory);

    // Assert
    expect(createdCategory?.id).toEqual(id);
    expect(createdCategory?.active).toEqual(true);
  });

  it('updateCategory', async () => {
    // Arrange
    categoryRepository.update = jest
      .fn()
      .mockImplementationOnce((category: Category, dto: UpdateCategoryDto) => {
        return {
          id,
          ...category,
          ...dto,
        };
      });

    // Act
    const updatedCategory = await categoryService.updateCategory(id, {
      slug: 'test-slug-2',
    });

    // Assert
    expect(updatedCategory?.id).toEqual(id);
    expect(updatedCategory?.slug).toEqual('test-slug-2');
  });

  it('deleteCategory', async () => {
    // Arrange
    categoryRepository.delete = jest
      .fn()
      .mockImplementationOnce((categoryId: string) => 1);

    // Act
    const deletedCategory = await categoryService.deleteCategory(id);

    // Assert
    expect(deletedCategory).toEqual(true);
  });

  it('getCategoryById', async () => {
    // Act
    const findByIdCategory = await categoryService.getCategoryById(id);

    // Assert
    expect(findByIdCategory?.id).toEqual(id);
  });

  it('getCategoryBySlug', async () => {
    // Arrange
    categoryRepository.findBySlug = jest
      .fn()
      .mockReturnValue({ id, ...testCategory });

    // Act
    const findByIdCategory = await categoryService.getCategoryBySlug(
      'test-slug',
    );

    // Assert
    expect(findByIdCategory?.id).toEqual(id);
  });

  it('getCategoriesByFilter', async () => {
    // Arrange
    const filter: CategoryFilterDto = {
      description: '',
      search: '',
      name: 'мед',
      page: 1,
      pageSize: 5,
    };

    const items = {
      count: 2,
      rows: [
        {
          id: '1',
          slug: 'mead',
          name: 'Мёд',
        },
        {
          id: '2',
          slug: 'medovik',
          name: 'Медовик',
        },
      ],
    };

    categoryRepository.findAndCountAll = jest.fn().mockReturnValue(items);

    // Act
    const result = await categoryService.getCategoriesByFilter(filter);

    // Assert
    expect(result?.count).toEqual(2);
  });
});
