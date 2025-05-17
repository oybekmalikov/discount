import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOtpCreationAttr {
	id: string;
	phone_number: string;
	otp: string;
	expirtion_time: Date;
}
@Table({ tableName: "otp", freezeTableName: true })
export class Otp extends Model<Otp, IOtpCreationAttr> {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
	})
	declare id: string;
	@Column({
		type: DataType.STRING(30),
	})
	declare phone_number: string;
	@Column({
		type: DataType.STRING(10),
	})
	declare otp: string;
	@Column({
		type: DataType.DATE,
	})
	declare expirtion_time: Date;
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	declare verified: boolean;
}
