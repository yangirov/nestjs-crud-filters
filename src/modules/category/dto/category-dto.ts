import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Expose } from 'class-transformer';

@Expose()
export class BaseCategoryDto {
  @ApiProperty({
    description: 'Unique name in English',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/[A-Za-z0-9]$/, {
    message: 'Latin characters only',
  })
  slug: string;

  @ApiProperty({
    description: 'Category name',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Category description',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Activity flag',
    type: Boolean,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}

@Expose()
export class CategoryDto extends BaseCategoryDto {
  @ApiProperty({
    description: 'Unique identifier',
    type: String,
  })
  @IsString()
  id!: string;
}
