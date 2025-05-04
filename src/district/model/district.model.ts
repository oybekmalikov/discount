import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Store } from "../../store/models/store.model";

interface IDistrictCreationAttr {
	name: string;
	regionId: number;
}
@Table({ tableName: "distirct", freezeTableName: true })
export class District extends Model<District, IDistrictCreationAttr> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@ForeignKey(() => Region)
	@Column({ type: DataType.INTEGER })
	regionId: number;
	@BelongsTo(() => Region)
	region: Region;
	@HasMany(() => Store)
	store: Store[];
}
