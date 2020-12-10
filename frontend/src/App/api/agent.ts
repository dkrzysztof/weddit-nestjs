import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { AccountApi } from './account/accountApi';
import { AdminApi } from './admin/adminApi';
import { LogsApi } from './logs/logsApi';
import { notification } from 'antd';
import { AuthApi } from './auth/authApi';
import store from 'App/state/store';
import { WeddingsApi } from './weddings/weddingsApi';
import GuestApi from './guests/guestApi';
import { BeverageApi } from './beverages/beveragesApi';
import { GuestTypesApi } from './guestTypes/guestTypesApi';
import { TaskListApi } from './taskLists/taskListsApi';
import { ErrorHandledResponse } from 'App/types/error';
import responseParser from './utils/responseParser';

const baseURL = `http://localhost:5002/`;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
	(config) => {
		const state = store.getState();
		if (state.session.info && state.session.info.token) {
			config.headers.Authorization = `Bearer ${state.session.info.token}`;
		}

		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

interface DetailedError {
	description: string;
	descriptionFormatter: string;
	errorCode: string;
	errorParameters: string[];
	isArchived: boolean;
}

export interface ErrorApi {
	statusCode: number;
	message: string;
	error: string;
}

axios.interceptors.response.use(undefined, (error: AxiosError<{ code: number; message: string[] }>) => {
	const { status, data } = error.response || {};
	const { message } = error;

	if (message.toUpperCase() === 'NETWORK ERROR') {
		throw {
			message: 'Błąd połączenia z serwerem',
			description: 'Nie można nawiązać połączenia z serwerem',
			code: 400
		} as ErrorHandledResponse;
	}

	if (status === 404) {
		notification['error']({
			message: 'Błąd',
			description: 'Nie znaleziono zasobu'
		});
		console.log('404: ' + error.response.statusText);
	}

	if (status === 403) {
		console.log('403: ' + error.response);
		if (error.config.url === 'auth/login') {
			throw {
				message: 'Błędny login lub hasło',
				code: 403,
				description: 'Podane login i hasło są nieprawidłowe'
			} as ErrorHandledResponse;
		}

		notification['error']({
			message: 'Błąd',
			description: 'Nie masz dostępu do tego zasobu'
		});
	}

	if (status === 401) {
		notification['error']({
			message: 'Błąd',
			description: 'Nie jesteś autoryzowany. Zaloguj się ponownie'
		});

		console.log('401: ' + error);
	}

	if (status === 500) {
		notification['error']({
			message: 'Błąd',
			description: 'Wystąpił błąd po stronie serwera. Spróbuj ponownie'
		});
		console.log(`500: ${error.response.data}`);
	}

	if (status === 400) {
		if (data.message) {
			let description: any = '';
			if (data.message && Array.isArray(data.message)) {
				description = data.message.join(' || \n');
			} else {
				description = data.message;
			}
		}
		if (data.code) {
			throw data.code;
		}
	}

	throw error.response;
});

const responseBodyAxios = (response: AxiosResponse) => {
	if (
		response.data &&
		typeof response.data === 'object' &&
		'data' in response.data &&
		Object.keys(response.data).length === 1
	) {
		return response.data.data;
	}

	responseParser(response);
	return response.data;
};
const responseBodyFetch = async (response: Response) => {
	const responseJsonObject = await response.json();
	if (response.ok) {
		return responseJsonObject;
	} else
		throw new Error(
			responseJsonObject.errors.detailedErrors + '\n' + responseJsonObject.errors.commonErrors.join('\n')
		);
};

const catchFetchError = async (eee) => {
	console.log(eee);
};

export const requests = {
	get: (url: string, params?: {}) =>
		axios
			.get(url, {
				params
			})
			.then(responseBodyAxios),
	post: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
		axios.post(url, body, config).then(responseBodyAxios),
	put: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
		axios.put(url, body, config).then(responseBodyAxios),
	delete: (url: string) => axios.delete(url).then(responseBodyAxios),
	fetch: (url: string, body: BodyInit | null, config?: RequestInit | undefined) =>
		fetch(`${baseURL}${url}`, { ...config, body, method: config.method })
			.then(responseBodyFetch)
			.catch(catchFetchError),
	download: (url: string, fileName: string) =>
		axios({
			url: url,
			method: 'GET',
			responseType: 'blob'
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		})
};

export default {
	Account: AccountApi,
	Auth: AuthApi,
	Admin: AdminApi,
	Logs: LogsApi,
	Guests: GuestApi,
	Wedding: WeddingsApi,
	TaskList: TaskListApi,
	Beverages: BeverageApi,
	GuestTypes: GuestTypesApi
};
