import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { logger: console });
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT);
	console.info(`\x1b[33m[SERVER]:\x1b[32m`, `Server is running on port`, `${process.env.PORT}`);
}
bootstrap();