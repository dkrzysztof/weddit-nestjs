import { Rule } from 'antd/lib/form';

export interface UpdateUserFormRules {
	firstName: Rule[];
	lastName: Rule[];
	isAdmin: Rule[];
}

export interface CreateUserFormRules {
	email: Rule[];
	confirmPassword: Rule[];
	firstName: Rule[];
	lastName: Rule[];
	isAdmin: Rule[];
	password: Rule[];
}
