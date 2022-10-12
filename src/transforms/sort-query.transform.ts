import { instanceToPlain, Transform } from 'class-transformer';
import { Category } from '../modules/category/category';
import { SortQuery } from '../modules/category/dto/category-filter-dto';

export default function TransformSortQuery(defaultSortingField = 'createdAt') {
  return Transform(({ value }) => {
    const result: SortQuery = {
      field: value,
      direction: 'DESC',
    };

    if (value.charAt(0) === '-') {
      result.field = value.substring(1);
      result.direction = 'ASC';
    }

    return instanceToPlain(new Category()).hasOwnProperty(result.field)
      ? result
      : { field: defaultSortingField, direction: 'ASC' };
  });
}
