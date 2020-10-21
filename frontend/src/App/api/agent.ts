import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { AccountApi } from './account/accountApi';
import { AdminApi } from './admin/adminApi';
import { LogsApi } from './logs/logsApi';
import { notification } from 'antd';
import { AuthApi } from './auth/authApi';
import store from 'App/state/store';

const baseURL = `http://localhost:5000/`;

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

axios.interceptors.response.use(undefined, (error: AxiosError) => {
	const { status, data } = error.response || {};
	console.log(data);

	if (status === 404) {
		notification['error']({
			message: 'Błąd',
			description: 'Nie znaleziono zasobu'
		});
		console.log('404: ' + error.response.statusText);
	}

	if (status === 403) {
		console.log('403: ' + error.response);
		notification['error']({
			message: 'Błąd',
			description: 'Nie masz dostępu do tego zasobu'
		});
	}

	if (status === 401) {
		// if (headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The token is expired"') {
		// 	console.log('TOKEN EXPIRED');
		// store.dispatch(devalidateSession());
		// }
		notification['error']({
			message: 'Błąd',
			description: 'Nie jesteś autoryzowany. Zaloguj się ponownie'
		});

		// wyślij refresh tokena pod logowanie
		// jesli znów 401, to znaczy że refresh token wygasł - trzeba zalogować ponownie.
		// if (error.config.url === '/auth/login') {
		// 	console.log('Wrong credentials');
		// }
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
		// mamy 2 typy 400-tek (teoretycznie)

		// zwykła 400 - zawiera obiekt errors, który zawiera obiekty detailedErrors oraz commonErrors

		// foramularzowa - nie zawiera obiektu errors ani detailedErrors ani commonErrors,
		// ale zawiera słownik o nazwach kluczy takich, jak pole jest nazwane, czyli np. mając w formularzu
		// inputy dla pól roles oraz firstName, to dostaniemy słowniki o kluczu roles oraz firstName, a dla nich mamy jako valuesy
		// już podaną arrayke detailedErrorów

		if (data.errors) {
			// 400-tka zwykła(nieformularzowa)

			let mainErrorObject = data.errors;
			if (mainErrorObject.detailedErrors) {
				let detailedErrors = mainErrorObject.detailedErrors as DetailedError[];
				detailedErrors.forEach((detailedError) => {
					notification['error']({
						message: 'Błąd',
						description: detailedError.description
					});
				});
			}

			if (mainErrorObject.commonErrors) {
				console.log(mainErrorObject.commonErrors);
			}
		} else if (data && Array.isArray(data)) {
			// 400-tka formularzowa

			Object.keys(data).forEach((key) => {
				let detailedErrorsForCurrentKey = data[key] as DetailedError[];
				detailedErrorsForCurrentKey.forEach((detailedErrorsForCurrentKey) => {
					notification['error']({
						message: 'Błąd',
						description: `${key}: ${detailedErrorsForCurrentKey.description}`
					});
				});
			});
		} else {
			notification['error']({
				message: 'Błąd',
				description: `Wystąpił błąd`
			});
		}
	}

	throw error.response;
});

const responseBodyAxios = (response: AxiosResponse) => {
	if (response.data && 'data' in response.data && Object.keys(response.data).length === 1) {
		return response.data.data;
	}

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
		fetch(`${baseURL}${url}`, { ...config, body, method: 'post' }).then(responseBodyFetch),
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
	Logs: LogsApi,
	Admin: AdminApi
};
