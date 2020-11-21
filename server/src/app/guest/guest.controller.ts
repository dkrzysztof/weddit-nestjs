import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { IPageQueryParams } from 'src/types/PageQueryParams';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddGuestDto } from './dto/add-guest.dto';
import { UpdateGuestDto } from './dto/update-geust.dto';
import { GuestService, File } from './guest.service';

@Controller()
export class GuestController {
	constructor(private readonly guestService: GuestService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async getAllGuests(@Req() request, @Param('idWedding') idWedding, @Query() query: IPageQueryParams) {
		return await this.guestService.getAllGuests(request.user, idWedding, query);
	}

	@Get('/short')
	@UseGuards(JwtAuthGuard)
	async getAllGuestsShort(@Req() request, @Param('idWedding') idWedding) {
		return await this.guestService.getAllGuestsShort(request.user, idWedding);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async addGuest(@Req() request, @Param('idWedding') idWedding, @Body() body: AddGuestDto): Promise<AddGuestDto> {
		return await this.guestService.addNewGuest(request.user, idWedding, body);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async updateGuest(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Param('id') idGuest: number,
		@Body() updateGuestDto: UpdateGuestDto,
	): Promise<UpdateGuestDto> {
		return await this.guestService.updateGuestDetails(user, idWedding, idGuest, updateGuestDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async deleteGuest(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Param('id') idGuest: number,
	): Promise<boolean> {
		return await this.guestService.deleteGuest(user, idWedding, idGuest);
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@Req() { user }, @UploadedFile() file: File, @Param('idWedding') idWedding: number) {
		return await this.guestService.uploadGuestsFromFile(user, idWedding, file);
	}
}
