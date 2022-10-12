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

export class CategoryFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => Number(value) === 1 || value === 'true')
  active?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(9)
  @Type(() => Number)
  pageSize?: number = 2;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => (value <= 1 ? 0 : value - 1))
  page?: number = 1;

  @IsOptional()
  @TransformSortQuery()
  sort?: SortQuery;
}

export interface SortQuery {
  field: string;
  direction: string;
}
