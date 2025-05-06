import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStoreSubscribeDto } from "./dto/create-store_subscribe.dto";
import { UpdateStoreSubscribeDto } from "./dto/update-store_subscribe.dto";
import { StoreSubscribe } from "./models/store_subscribe.model";

@Injectable()
export class StoreSubscribesService {
	constructor(
		@InjectModel(StoreSubscribe)
		private readonly storeSubscribesModel: typeof StoreSubscribe
	) {}
	create(createStoreSubscribeDto: CreateStoreSubscribeDto) {
		return this.storeSubscribesModel.create(createStoreSubscribeDto);
	}

	findAll() {
		return this.storeSubscribesModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.storeSubscribesModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateStoreSubscribeDto: UpdateStoreSubscribeDto) {
		return this.storeSubscribesModel.update(updateStoreSubscribeDto, {
			where: { id },
		});
	}

	remove(id: number) {
		return this.storeSubscribesModel.destroy({ where: { id } });
	}
}
