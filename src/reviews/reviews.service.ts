import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./models/review.model";

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(Review) private readonly reviewModel: typeof Review
	) {}
	create(createReviewDto: CreateReviewDto) {
		return this.reviewModel.create(createReviewDto);
	}

	findAll() {
		return this.reviewModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.reviewModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateReviewDto: UpdateReviewDto) {
		return this.reviewModel.update(updateReviewDto, { where: { id } });
	}

	remove(id: number) {
		return this.reviewModel.destroy({ where: { id } });
	}
}
