import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/providers/database.module';
import { Beverage } from '../../models/beverages.entity';
import { WeddingModule } from '../wedding/wedding.module';
import { weddingProvider } from '../wedding/wedding.provider';
import { BeveragesController } from './beverages.controller';
import { beveragesProvider } from './beverages.provider';
import { BeveragesService } from './beverages.service';

@Module({
	providers: [...beveragesProvider, ...weddingProvider, BeveragesService],
	controllers: [BeveragesController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([Beverage]), WeddingModule],
	exports: [BeveragesService],
})
export class BeveragesModule {}
