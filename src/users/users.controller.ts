import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { UserGuard } from "../common/guards/user.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}
	@UseGuards(UserGuard)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(+id);
	}
	@Get("activate/:link")
	activateUser(@Param("link") link: string) {
		return this.usersService.activateUser(link);
	}
	@HttpCode(HttpStatus.OK)
	@Post("new-otp")
	async newOtp(@Body() phoneUserDto: PhoneUserDto) {
		return this.usersService.newOtp(phoneUserDto);
	}
}
