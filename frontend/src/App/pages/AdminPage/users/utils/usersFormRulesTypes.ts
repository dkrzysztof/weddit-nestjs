import { Rule } from 'antd/lib/form';

export interface UpdateUserFormRules {
	firstName: Rule[];
	lastName: Rule[];
	roles: Rule[];
}

export interface CreateUserFormRules {
	email: Rule[];
	confirmPassword: Rule[];
	firstName: Rule[];
	lastName: Rule[];
	birthDate: Rule[];
	roleName: Rule[];
	password: Rule[];
}
