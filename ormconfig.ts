module.exports = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'test',
	synchronize: false,
	logging: false,
	entities: [
		// 'src/**/*.entity.ts',
		'dist/**/*.entity.js',
	],
	migrationsTableName: 'migration',
	migrations: [
		// 'src/migration/*.ts',
		'dist/migration/*.js',
	],
	cli: {
		migrationsDir: './src/migration',
	},
	ssl: false,
};
