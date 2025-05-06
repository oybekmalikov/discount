import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { Discount } from "./models/discount.model";

@Injectable()
export class DiscountsService {
	constructor(
		@InjectModel(Discount) private readonly discountModel: typeof Discount
	) {}
	create(createDiscountDto: CreateDiscountDto) {
		return this.discountModel.create(createDiscountDto);
	}

	findAll() {
		return this.discountModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.discountModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateDiscountDto: UpdateDiscountDto) {
		return this.discountModel.update(updateDiscountDto, { where: { id } });
	}

	remove(id: number) {
		return this.discountModel.destroy({ where: { id } });
	}
}
