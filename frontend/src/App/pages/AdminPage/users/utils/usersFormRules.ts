import { UpdateUserFormRules, CreateUserFormRules } from './usersFormRulesTypes';

export const updateUserFormRules: UpdateUserFormRules = {
	firstName: [{ required: true, max: 255 }],
	lastName: [{ required: true, max: 255 }],
	email: [{ required: true, type: 'email' }],
	isAdmin: [{ type: 'boolean' }]
};

export const createUserFormRules: CreateUserFormRules = {
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
			min: 6,
			max: 100
		}
	],
	firstName: [{ required: true, max: 255 }],
	lastName: [{ required: true, max: 255 }],
	isAdmin: [{ type: 'boolean' }]
};
