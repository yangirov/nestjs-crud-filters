import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  @Expose()
  id!: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @Expose()
  slug!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Expose()
  name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Expose()
  description?: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  @Expose()
  active!: boolean;
}
