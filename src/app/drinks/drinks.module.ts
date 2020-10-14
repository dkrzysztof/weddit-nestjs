import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from '../../models/drink.entity';
import { Wedding } from '../../models/wedding.entity';
import { DatabaseModule } from '../../providers/database.module';
import { WeddingModule } from '../wedding/wedding.module';
import { weddingProvider } from '../wedding/wedding.provider';
import { WeddingService } from '../wedding/wedding.service';
import { DrinksController } from './drinks.controller';
import { drinksProvider } from './drinks.provider';
import { DrinksService } from './drinks.service';

@Module({
	providers: [...drinksProvider, ...weddingProvider, DrinksService],
	controllers: [DrinksController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([Drink]), WeddingModule],
	exports: [DrinksService],
})
export class DrinksModule {}
