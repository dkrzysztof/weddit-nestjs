import { LoginFormRules } from './loginPageFormRulesTypes';

export const loginFormRules: LoginFormRules = {
	email: [
		{
			required: true,
			message: 'Email jest wymagany!'
		}
	],
	password: [
		{
			required: true,
			message: 'Hasło jest wymagane!'
		}
	]
};
