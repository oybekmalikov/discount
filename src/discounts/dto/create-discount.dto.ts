export class CreateDiscountDto {
	storeId: number;
	title: string;
	description: string;
	discountPrecent: number;
	startDate: Date;
	endDate: Date;
	categoryId: number;
	discountValue: number;
	specialLink: string;
	isActive: boolean;
	typeId: number;
}
