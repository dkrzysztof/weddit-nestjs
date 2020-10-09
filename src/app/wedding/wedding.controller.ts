import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWeddingPlan } from './dto/create-wedding-plan.dto';
import { WeddingService } from './wedding.service';

@Controller('weddings')
export class WeddingController {
	constructor(private readonly weddingService: WeddingService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	createWeddingPlan(@Req() request, @Body() body: CreateWeddingPlan) {
		return this.weddingService.createWeddingPlan(request.user, body);
	}
}
