import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category-dto';
import { CategoryFilterDto } from './dto/category-filter-dto';
import { CategoryDto } from './dto/category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { TYPES } from '../../types';
import { ICategoryService } from './category.service.interface';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(
    @Inject(TYPES.CategoryService)
    private categoryService: ICategoryService,
  ) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 200, description: 'Успешное получение' })
  @ApiResponse({ status: 400, description: 'Ошибка обработки запроса' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @ApiOperation({ summary: 'Обновление категории' })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 200, description: 'Успешное получение' })
  @ApiResponse({ status: 400, description: 'Ошибка обработки запроса' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @Patch(':id')
  updateCategory(
    @Param('id') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, dto);
  }

  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 200, description: 'Успешное получение' })
  @ApiResponse({ status: 400, description: 'Ошибка обработки запроса' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @Delete(':id')
  deleteCategory(@Param('id') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }

  @ApiOperation({ summary: 'Получить категорию по идентификатору' })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 200, description: 'Успешное получение' })
  @ApiResponse({ status: 400, description: 'Ошибка обработки запроса' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @Get(':id')
  getById(@Param('id') categoryId): Promise<CategoryDto> {
    return this.categoryService.getCategoryById(categoryId);
  }

  @ApiOperation({ summary: 'Получить категорию по коду' })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 200, description: 'Успешное получение' })
  @ApiResponse({ status: 400, description: 'Ошибка обработки запроса' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @Get('/bySlug/:slug')
  getBySlug(@Param('slug') slug): Promise<CategoryDto> {
    return this.categoryService.getCategoryBySlug(slug);
  }

  @ApiOperation({ summary: 'Получить категории по фильтру' })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 200, description: 'Успешное получение' })
  @ApiResponse({ status: 400, description: 'Ошибка обработки запроса' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @Get()
  getByFilter(@Query() filterDto: CategoryFilterDto) {
    return this.categoryService.getCategoriesByFilter(filterDto);
  }
}
