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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
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

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 200, description: 'Success result' })
  @ApiResponse({ status: 400, description: 'Request processing error' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'Success result' })
  @ApiResponse({ status: 400, description: 'Request processing error' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @ApiParam({
    name: 'id',
    description: 'Category identifier',
  })
  @Patch(':id')
  updateCategory(
    @Param('id') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, dto);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Success result' })
  @ApiResponse({ status: 400, description: 'Request processing error' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @ApiParam({
    name: 'id',
    description: 'Category identifier',
  })
  @Delete(':id')
  deleteCategory(@Param('id') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, description: 'Success result' })
  @ApiResponse({ status: 400, description: 'Request processing error' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @ApiParam({
    name: 'id',
    description: 'Category identifier',
  })
  @Get(':id')
  getById(@Param('id') categoryId): Promise<CategoryDto> {
    return this.categoryService.getCategoryById(categoryId);
  }

  @ApiOperation({ summary: 'Get category by slug' })
  @ApiResponse({ status: 200, description: 'Success result' })
  @ApiResponse({ status: 400, description: 'Request processing error' })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  @ApiParam({
    name: 'slug',
    description: 'Category slug',
  })
  @Get('/bySlug/:slug')
  getBySlug(@Param('slug') slug): Promise<CategoryDto> {
    return this.categoryService.getCategoryBySlug(slug);
  }

  @ApiOperation({ summary: 'Get category by filter' })
  @ApiResponse({ status: 200, description: 'Success result' })
  @ApiResponse({ status: 400, description: 'Request processing error' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get()
  getByFilter(@Query() filterDto: CategoryFilterDto) {
    return this.categoryService.getCategoriesByFilter(filterDto);
  }
}
