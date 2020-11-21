import { AxiosResponse } from 'axios';
import { GetUserWeddings } from '../weddings/requests';
import { WeddingForGetUserWeddings } from '../weddings/requests/GetUserWeddingsRequest';

export default function responseParser(response: AxiosResponse) {
	switch (response.config.url) {
		case 'weddings':
			if (response.config.method === 'get') mapGetWeddingsResponse(response.data);

			break;

		default:
			break;
	}
}

/// PONIZEJ DEKLARACJE PARSERÓW ODPOWIEDZI SERWERA

function mapGetWeddingsResponse(data: GetUserWeddings) {
	data.data = data.data.map((x) => ({
		...x,
		dateOfWedding: new Date(x.dateOfWedding),
		size: Number.parseInt(x.size.toString())
	}));
}
