import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Store } from "../../store/models/store.model";

interface IStatusCreationAttr {
	name: string;
	description: string;
}
@Table({ tableName: "status", freezeTableName: true })
export class Status extends Model<Status, IStatusCreationAttr> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@Column({ type: DataType.STRING })
	declare description: string;
	@HasMany(() => Store)
	store: Store[];
}
