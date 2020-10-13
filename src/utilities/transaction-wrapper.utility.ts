import { BadRequestException } from '@nestjs/common';
import { getConnection, QueryRunner } from 'typeorm';
import * as chalk from 'chalk';

export const transactionWrapper = async (transactionBody: (queryRunner: QueryRunner) => any): Promise<any> => {
	const queryRunner = (await getConnection()).createQueryRunner();

	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		const result = await transactionBody(queryRunner);

		await queryRunner.commitTransaction();

		return result;
	} catch (err) {
		await queryRunner.rollbackTransaction();
		console.log(
			chalk.red.bold('[ERROR]:'),
			chalk.bgRed.bold(' ' + err.stack.substring(0, err.stack.indexOf(':')) + ' '),
			chalk.white(err.stack.substring(err.stack.indexOf(':'))),
		);
		throw new BadRequestException(err.message);
	} finally {
		await queryRunner.release();
	}
};
