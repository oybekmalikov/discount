import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { Favourite } from "../../favourites/models/favourite.model";
import { Review } from "../../reviews/models/review.model";
import { Store } from "../../store/models/store.model";
import { Type } from "../../type/models/type.model";

interface IDiscountCreationAttr {
	storeId: number;
	title: string;
	description: string;
	discountPrecent: number;
	startDate: Date;
	endDate: Date;
	categoryId: number;
	discountValue: number;
	specialLink: string;
	isActive: boolean;
	typeId: number;
}
@Table({ tableName: "discounts", freezeTableName: true })
export class Discount extends Model<Discount, IDiscountCreationAttr> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@ForeignKey(() => Store)
	@Column({ type: DataType.INTEGER })
	declare storeId: number;
	@Column({ type: DataType.STRING })
	declare title: string;
	@Column({ type: DataType.STRING })
	declare description: string;
	@Column({ type: DataType.DECIMAL })
	declare discountPrecent: number;
	@Column({ type: DataType.DATEONLY })
	declare startDate: Date;
	@Column({ type: DataType.DATEONLY })
	declare endDate: Date;
	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER })
	declare categoryId: number;
	@Column({ type: DataType.INTEGER })
	declare discountValue: number;
	@Column({ type: DataType.STRING })
	declare specialLink: string;
	@Column({ type: DataType.BOOLEAN })
	declare isActive: boolean;
	@ForeignKey(() => Type)
	@Column({ type: DataType.INTEGER })
	declare typeId: number;
	@BelongsTo(() => Store)
	store: Store;
	@BelongsTo(() => Category)
	category: Category;
	@BelongsTo(() => Type)
	type: Type;
	@HasMany(() => Review)
	review: Review[];
	@HasMany(() => Favourite)
	favourite: Favourite[];
}
