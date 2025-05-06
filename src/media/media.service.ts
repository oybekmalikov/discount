import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { Media } from "./models/media.model";

@Injectable()
export class MediaService {
	constructor(@InjectModel(Media) private readonly mediaModel: typeof Media) {}
	create(createMediaDto: CreateMediaDto) {
		return this.mediaModel.create(createMediaDto);
	}

	findAll() {
		return this.mediaModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.mediaModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateMediaDto: UpdateMediaDto) {
		return this.mediaModel.update(updateMediaDto, { where: { id } });
	}

	remove(id: number) {
		return this.mediaModel.destroy({ where: { id } });
	}
}
