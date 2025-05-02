import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserCreationAttr {
	name: string;
	phone: string;
	email: string;
	hashshed_password: string;
	location: string;
}
@Table({ tableName: "users", freezeTableName: true })
export class User extends Model<User, IUserCreationAttr> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;
	@Column({ type: DataType.STRING(50), allowNull: false })
	declare name: string;
	@Column({ type: DataType.STRING(20), unique: true, allowNull: false })
	declare phone: string;
	@Column({ type: DataType.STRING(100), unique: true, allowNull: false })
	declare email: string;
	@Column({ type: DataType.STRING })
	declare hashshed_password: string;
	@Column({ type: DataType.STRING })
	declare hashshed_refresh_token: string;
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	declare is_active: boolean;
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	declare is_owner: boolean;
	@Column({ type: DataType.STRING })
	declare location: string;
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4() })
	declare activation_link: string;
}
