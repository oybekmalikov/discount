import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StoreSocialLink } from "../../store_social_links/models/store_social_link.model";

interface ISocialMediaTypeCreationAttr {
	basedURL: string;
	isActive: boolean;
}
@Table({ tableName: "social_media_type", freezeTableName: true })
export class SocialMediaType extends Model<
	SocialMediaType,
	ISocialMediaTypeCreationAttr
> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare basedURL: string;
	@Column({ type: DataType.BOOLEAN })
	declare isActive: boolean;
	@HasMany(() => StoreSocialLink)
	storesociallink: StoreSocialLink[];
}
