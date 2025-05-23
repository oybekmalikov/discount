import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from "sequelize-typescript";
import { Discount } from "../../discounts/models/discount.model";
import { District } from "../../district/model/district.model";
import { Region } from "../../region/models/region.model";
import { Status } from "../../status/models/status.model";
import { StoreSocialLink } from "../../store_social_links/models/store_social_link.model";
import { StoreSubscribe } from "../../store_subscribes/models/store_subscribe.model";
import { User } from "../../users/models/user.model";

interface IStoreCreationAttr {
	name: string;
	location: string;
	phone: string;
	ownerId: number;
	description: string;
	regionId: number;
	distictId: number;
	address: string;
	statusId: number;
	openTime: Date;
	closeTime: Date;
	weekDay: number;
}
@Table({ tableName: "store", freezeTableName: true })
export class Store extends Model<Store, IStoreCreationAttr> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@Column({ type: DataType.STRING })
	declare location: string;
	@Column({ type: DataType.STRING })
	declare phone: string;
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	declare ownerId: number;
	@Column({ type: DataType.STRING })
	declare description: string;
	@ForeignKey(() => Region)
	@Column({ type: DataType.INTEGER })
	declare regionId: number;
	@ForeignKey(() => District)
	@Column({ type: DataType.INTEGER })
	declare distictId: number;
	@Column({ type: DataType.STRING })
	declare address: string;
	@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER })
	declare statusId: number;
	@Column({ type: DataType.DATEONLY })
	declare openTime: Date;
	@Column({ type: DataType.DATEONLY })
	declare closeTime: Date;
	@Column({ type: DataType.INTEGER })
	declare weekDay: number;
	@BelongsTo(() => User)
	user: User;
	@BelongsTo(() => Region)
	region: Region;
	@BelongsTo(() => District)
	district: District;
	@BelongsTo(() => Status)
	status: Status;
	@HasMany(() => StoreSocialLink)
	storeSocialLink: StoreSocialLink[];
	@HasMany(() => Discount)
	discount: Discount[];
	@HasMany(() => StoreSubscribe)
	storeSubscribe: StoreSubscribe[];
}
