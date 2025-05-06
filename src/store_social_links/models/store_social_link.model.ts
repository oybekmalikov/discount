import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { SocialMediaType } from "../../social_media_type/models/social_media_type.model";
import { Store } from "../../store/models/store.model";

interface IStoreSocialLinksCreationAttr {
	url: string;
	description: string;
	storeId: number;
	socialMediaTypeId: number;
}
@Table({ tableName: "store_social_links", freezeTableName: true })
export class StoreSocialLink extends Model<
	StoreSocialLink,
	IStoreSocialLinksCreationAttr
> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare urlL: string;
	@Column({ type: DataType.STRING })
	declare description: string;
	@ForeignKey(() => Store)
	@Column({ type: DataType.NUMBER })
	declare storeId: number;
	@ForeignKey(() => SocialMediaType)
	@Column({ type: DataType.NUMBER })
	declare socialMediaTypeId: number;
	@BelongsTo(() => SocialMediaType)
	socialmediatype: SocialMediaType;
	@BelongsTo(() => Store)
	store: Store;
}
