import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { Discount } from "../../discounts/models/discount.model";
import { User } from "../../users/models/user.model";

interface IFavouriteCreationAttr {
	userId: number;
	discountId: number;
}
@Table({ tableName: "favourites", freezeTableName: true })
export class Favourite extends Model<Favourite, IFavouriteCreationAttr> {
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	declare userId: number;
	@ForeignKey(() => Discount)
	@Column({ type: DataType.INTEGER })
	declare discountId: number;
	@BelongsTo(() => User)
	user: User;
	@BelongsTo(() => Discount)
	discount: Discount;
}
