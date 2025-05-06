import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
import { User } from "../../users/models/user.model";

interface IStoreSubscribesCreationAttr {
	userId: number;
	storeId: number;
}
@Table({ tableName: "store_subscribes", freezeTableName: true })
export class StoreSubscribe extends Model<
	StoreSubscribe,
	IStoreSubscribesCreationAttr
> {
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	declare userId: number;
	@ForeignKey(() => Store)
	@Column({ type: DataType.INTEGER })
	declare storeId: number;
	@BelongsTo(() => User)
	user: User;
	@BelongsTo(() => Store)
	store: Store;
}
