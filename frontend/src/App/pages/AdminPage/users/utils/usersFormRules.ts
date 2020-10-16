import { UpdateUserFormRules, CreateUserFormRules } from './usersFormRulesTypes';

export const updateUserFormRules: UpdateUserFormRules = {
	firstName: [{ required: true, max: 255 }],
	lastName: [{ required: true, max: 255 }],
	roles: [{ required: true, type: 'array' }]
};

export const createUserFormRules: CreateUserFormRules = {
	birthDate: [{ required: true }],
	confirmPassword: [
		{
			required: true
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Podane hasła są różne');
			}
		})
	],
	email: [{ required: true, type: 'email', max: 255 }],
	password: [
		{
			required: true,
			pattern: RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W]).{6,}$'),
			max: 100
		}
	],
	firstName: [{ required: true, max: 255 }],
	lastName: [{ required: true, max: 255 }],
	roleName: [{ required: true }]
};
