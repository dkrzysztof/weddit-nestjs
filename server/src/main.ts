import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { logger: console });
	app.use(cookieParser());
	app.enableCors({
		origin: 'http://localhost:3000',
		methods: '*',
	});
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	await app.listen(process.env.PORT);
	console.info(`\x1b[33m[SERVER]:\x1b[32m`, `Server is running on port`, `${process.env.PORT}`);
}
bootstrap();
