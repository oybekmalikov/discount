import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMediaCreationAttr {
	name: string;
	file: string;
	tableName: string;
	tableId: number;
}
@Table({ tableName: "media", freezeTableName: true })
export class Media extends Model<Media, IMediaCreationAttr> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@Column({ type: DataType.STRING })
	declare file: string;
	@Column({ type: DataType.STRING })
	declare tableName: string;
	@Column({ type: DataType.INTEGER })
	declare tableId: number;
}
