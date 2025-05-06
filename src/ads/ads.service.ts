import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
import { Ads } from "./models/ads.model";

@Injectable()
export class AdsService {
	constructor(@InjectModel(Ads) private readonly adsModel: typeof Ads) {}
	create(createAdDto: CreateAdDto) {
		return this.adsModel.create(createAdDto);
	}

	findAll() {
		return this.adsModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.adsModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateAdDto: UpdateAdDto) {
		return this.adsModel.update(updateAdDto, { where: { id } });
	}

	remove(id: number) {
		return this.adsModel.destroy({ where: { id } });
	}
}
