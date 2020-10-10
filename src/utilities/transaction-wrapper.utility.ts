import { BadRequestException } from '@nestjs/common';
import { getConnection, QueryRunner } from 'typeorm';

export const transactionWrapper = async (
	transactionBody: (queryRunner: QueryRunner) => any,
): Promise<any> => {
	const queryRunner = (await getConnection()).createQueryRunner();

	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		const result = await transactionBody(queryRunner);

		await queryRunner.commitTransaction();

		return result;
	} catch (err) {
		await queryRunner.rollbackTransaction();
		console.log('[ERROR]:', err.stack);
		throw new BadRequestException(err.message);
	} finally {
		await queryRunner.release();
	}
};
