import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Type } from "./models/type.model";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";

@Module({
	imports: [SequelizeModule.forFeature([Type])],
	controllers: [TypeController],
	providers: [TypeService],
})
export class TypeModule {}
