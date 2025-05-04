import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./model/district.model";

@Injectable()
export class DistrictService {
	constructor(
		@InjectModel(District) private readonly districtModel: typeof District
	) {}
	create(createDistrictDto: CreateDistrictDto) {
		return this.districtModel.create(createDistrictDto);
	}

	findAll() {
		return this.districtModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.districtModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateDistrictDto: UpdateDistrictDto) {
		return this.districtModel.update(updateDistrictDto, { where: { id } });
	}

	remove(id: number) {
		return this.districtModel.destroy({ where: { id } });
	}
}
