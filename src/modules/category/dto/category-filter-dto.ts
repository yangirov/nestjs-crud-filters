import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import TransformSortQuery from '../../../transforms/sort-query.transform';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Category name',
    type: String,
    example: 'mead',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Category description',
    type: String,
    example: 'some description',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    description:
      'Search by name or description. The passed filters by name and description are ignored',
    type: String,
    example: ['mead', 'some description'],
  })
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => Number(value) === 1 || value === 'true')
  @ApiPropertyOptional({
    description: 'Category is active',
    type: String,
    example: [0, 1, 'true', 'false'],
    default: true,
  })
  active?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(9)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page size',
    type: Number,
    example: 1,
    default: 2,
  })
  pageSize?: number = 2;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => (value <= 1 ? 0 : value - 1))
  @ApiPropertyOptional({
    description: 'Page number. 0 and 1 are the first page',
    type: Number,
    example: [0, 1, 2],
    default: 1,
  })
  page?: number = 1;

  @IsOptional()
  @TransformSortQuery()
  @ApiPropertyOptional({
    description:
      'Sorting by column name and direction. Accepts an optional sorting direction symbol in the form of a dash',
    type: String,
    example: ['-name', 'name', '-slug', 'slug'],
    default: 'createdAt',
  })
  sort?: SortQuery;
}

export interface SortQuery {
  field: string;
  direction: string;
}
