import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { Status } from "./models/status.model";

@Injectable()
export class StatusService {
	constructor(
		@InjectModel(Status) private readonly statusModel: typeof Status
	) {}
	create(createStatusDto: CreateStatusDto) {
		return this.statusModel.create(createStatusDto);
	}

	findAll() {
		return this.statusModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.statusModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateStatusDto: UpdateStatusDto) {
		return this.statusModel.update(updateStatusDto, { where: { id } });
	}

	remove(id: number) {
		return this.statusModel.destroy({ where: { id } });
	}
}
