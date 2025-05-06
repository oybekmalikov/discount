import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStoreSocialLinkDto } from "./dto/create-store_social_link.dto";
import { UpdateStoreSocialLinkDto } from "./dto/update-store_social_link.dto";
import { StoreSocialLink } from "./models/store_social_link.model";

@Injectable()
export class StoreSocialLinksService {
	constructor(
		@InjectModel(StoreSocialLink)
		private readonly storeSocialLinkModel: typeof StoreSocialLink
	) {}
	create(createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
		return this.storeSocialLinkModel.create(createStoreSocialLinkDto);
	}

	findAll() {
		return this.storeSocialLinkModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.storeSocialLinkModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateStoreSocialLinkDto: UpdateStoreSocialLinkDto) {
		return this.storeSocialLinkModel.update(updateStoreSocialLinkDto, {
			where: { id },
		});
	}

	remove(id: number) {
		return this.storeSocialLinkModel.destroy({ where: { id } });
	}
}
