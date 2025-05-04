import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { Store } from "./models/store.model";

@Injectable()
export class StoreService {
	constructor(@InjectModel(Store) private readonly storeModel: typeof Store) {}
	create(createStoreDto: CreateStoreDto) {
		return this.storeModel.create(createStoreDto);
	}

	findAll() {
		return this.storeModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.storeModel.findByPk(id), { where: { all: true } };
	}

	update(id: number, updateStoreDto: UpdateStoreDto) {
		return this.storeModel.update(updateStoreDto, { where: { id } });
	}

	remove(id: number) {
		return this.storeModel.destroy({ where: { id } });
	}
}
