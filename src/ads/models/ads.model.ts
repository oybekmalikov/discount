import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdsCreationAttr {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	targetUrl: string;
	placement: string;
	status: string;
	viewCount: number;
}
@Table({ tableName: "ads", freezeTableName: true })
export class Ads extends Model<Ads, IAdsCreationAttr> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare title: string;
	@Column({ type: DataType.STRING })
	declare description: string;
	@Column({ type: DataType.DATEONLY })
	declare startDate: Date;
	@Column({ type: DataType.DATEONLY })
	declare endDate: Date;
	@Column({ type: DataType.STRING })
	declare targetUrl: string;
	@Column({ type: DataType.STRING })
	declare placement: string;
	@Column({
		type: DataType.ENUM(
			"draft",
			"pending",
			"active",
			"paused",
			"expired",
			"rejected"
		),
	})
	declare status: string;
	@Column({ type: DataType.INTEGER })
	declare viewCount: number;
}
