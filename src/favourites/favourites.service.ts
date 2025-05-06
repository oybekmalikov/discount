import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";
import { UpdateFavouriteDto } from "./dto/update-favourite.dto";
import { Favourite } from "./models/favourite.model";

@Injectable()
export class FavouritesService {
	constructor(
		@InjectModel(Favourite) private readonly favouriteModel: typeof Favourite
	) {}
	create(createFavouriteDto: CreateFavouriteDto) {
		return this.favouriteModel.create(createFavouriteDto);
	}

	findAll() {
		return this.favouriteModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.favouriteModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
		return this.favouriteModel.update(updateFavouriteDto, { where: { id } });
	}

	remove(id: number) {
		return this.favouriteModel.destroy({ where: { id } });
	}
}
