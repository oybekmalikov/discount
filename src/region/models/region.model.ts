import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../district/model/district.model";
import { Store } from "../../store/models/store.model";

interface IRegionCReationAttr {
	name: string;
}
@Table({ tableName: "region", freezeTableName: true })
export class Region extends Model<Region, IRegionCReationAttr> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;
	@Column({ type: DataType.STRING })
	declare name: string;
	@HasMany(() => District)
	distircts: District[];
	@HasMany(() => Store)
	store: Store[];
}
