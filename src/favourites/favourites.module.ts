import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FavouritesController } from "./favourites.controller";
import { FavouritesService } from "./favourites.service";
import { Favourite } from "./models/favourite.model";

@Module({
	imports: [SequelizeModule.forFeature([Favourite])],
	controllers: [FavouritesController],
	providers: [FavouritesService],
})
export class FavouritesModule {}
