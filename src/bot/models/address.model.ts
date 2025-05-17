import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAddressCreationAttr {
	user_id: number;
	last_state: string;
}
@Table({ tableName: "address", freezeTableName: true })
export class Address extends Model<Address, IAddressCreationAttr> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	declare id: number;
	@Column({ type: DataType.INTEGER })
	declare user_id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@Column({ type: DataType.STRING })
	declare address: string;
	@Column({ type: DataType.STRING })
	declare location: string;
	@Column({ type: DataType.STRING })
	declare last_state: string;
}
