import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Discount } from "../../discounts/models/discount.model";

interface ITypeCreationAttr {
	name: string;
	description: string;
}
@Table({ tableName: "types", freezeTableName: true })
export class Type extends Model<Type, ITypeCreationAttr> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@Column({ type: DataType.STRING })
	declare description: string;
	@HasMany(() => Discount)
	discount: Discount[];
}
