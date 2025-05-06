import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Favourite } from "../../favourites/models/favourite.model";
import { Review } from "../../reviews/models/review.model";
import { Store } from "../../store/models/store.model";
import { StoreSubscribe } from "../../store_subscribes/models/store_subscribe.model";

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
	@HasMany(() => Store)
	store: Store[];
	@HasMany(() => Review)
	review: Review[];
	@HasMany(() => Favourite)
	favourite: Favourite[];
	@HasMany(() => StoreSubscribe)
	storeSubscribe: StoreSubscribe[];
}
