import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { TYPES } from '../../types';

@Module({
  providers: [
    {
      provide: TYPES.CategoryService,
      useClass: CategoryService,
    },
    {
      provide: TYPES.CategoryRepository,
      useClass: CategoryRepository,
    },
  ],
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
})
export class CategoryModule {}
