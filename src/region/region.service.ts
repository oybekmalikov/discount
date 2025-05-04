import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./models/region.model";

@Injectable()
export class RegionService {
	constructor(
		@InjectModel(Region) private readonly regionModel: typeof Region
	) {}
	create(createRegionDto: CreateRegionDto) {
		return this.regionModel.create(createRegionDto);
	}

	findAll() {
		return this.regionModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.regionModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateRegionDto: UpdateRegionDto) {
		return this.regionModel.update(updateRegionDto, { where: { id } });
	}

	remove(id: number) {
		return this.regionModel.destroy({ where: { id } });
	}
}
