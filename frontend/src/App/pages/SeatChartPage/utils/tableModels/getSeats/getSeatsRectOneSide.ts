import Seat from '../../seatsFunctions/Seat';

function getSeatsRectOneSide(number) {
	switch (number) {
		case 2:
			return [Seat(1, '0.3 0', '0.5 1'), Seat(2, '0.7 0', '0.5 1')];
		case 3:
			return [Seat(1, '0.2 0', '0.5 1'), Seat(2, '0.5 0', '0.5 1'), Seat(3, '0.8 0', '0.5 1')];
		case 4:
			return [
				Seat(1, '0.14 0', '0.5 1'),
				Seat(2, '0.38 0', '0.5 1'),
				Seat(3, '0.62 0', '0.5 1'),
				Seat(4, '0.86 0', '0.5 1')
			];
			break;
		case 5:
			return [
				Seat(1, '0.1 0', '0.5 1'),
				Seat(2, '0.3 0', '0.5 1'),
				Seat(3, '0.5 0', '0.5 1'),
				Seat(4, '0.7 0', '0.5 1'),
				Seat(5, '0.9 0', '0.5 1')
			];
			break;

		default:
			return [Seat(1, '0.2 0', '0.5 1'), Seat(2, '0.5 0', '0.5 1'), Seat(3, '0.8 0', '0.5 1')];
	}
}

export default getSeatsRectOneSide;
