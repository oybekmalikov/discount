import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from "sequelize-typescript";
import { Discount } from "../../discounts/models/discount.model";

interface ICategoryCreationAttr {
	name: string;
	description: string;
	parentId: number;
}
@Table({ tableName: "category", freezeTableName: true })
export class Category extends Model<Category, ICategoryCreationAttr> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@Column({ type: DataType.STRING })
	declare description: string;
	@ForeignKey(() => Category)
	@Column({ type: DataType.NUMBER })
	declare parentId: number;
	@BelongsTo(() => Category)
	declare parent?: Category;
	@HasMany(() => Category)
	declare children?: Category[];
	@HasMany(() => Discount)
	discount: Discount[];
}
