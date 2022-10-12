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
    description: 'Уникальное название на англ. в системе',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/[A-Za-z0-9]$/, {
    message: 'Только латинские символы',
  })
  slug: string;

  @ApiProperty({
    description: 'Название категории',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Описание категории',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Флаг активности',
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
    description: 'Уникальный идентификатор',
    type: String,
  })
  @IsString()
  id!: string;
}
