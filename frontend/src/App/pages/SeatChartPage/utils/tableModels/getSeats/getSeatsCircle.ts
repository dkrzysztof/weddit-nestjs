import Seat from '../../seatsFunctions/Seat';

function getSeatsCircle(number) {
	switch (number) {
		case 8:
			return [
				Seat(1, '0.50 0', '0.5 1'),
				Seat(2, '0.85 0.15', '0.15 0.85'),
				Seat(3, '1 0.5', '0 0.5'),
				Seat(4, '0.85 0.85', '0.15 0.15'),
				Seat(5, '0.50 1', '0.5 0'),
				Seat(6, '0.15 0.85', '0.85 0.15'),
				Seat(7, '0 0.5', '1 0.5'),
				Seat(8, '0.15 0.15', '0.85 0.85')
			];

		case 9:
			return [
				Seat(1, '0.5 0'),
				Seat(2, '0.82 0.12'),
				Seat(3, '0.99 0.41'),
				Seat(4, '0.93 0.75'),
				Seat(5, '0.67 0.97'),
				Seat(6, '0.33 0.97'),
				Seat(7, '0.07 0.75'),
				Seat(8, '0.01 0.41'),
				Seat(9, '0.18 0.11')
			];

		case 10:
			return [
				Seat(1, '0.5 0'),
				Seat(2, '0.79 0.09'),
				Seat(3, '0.98 0.35'),
				Seat(4, '0.98 0.65'),
				Seat(5, '0.79 0.91'),
				Seat(6, '0.5 1'),
				Seat(7, '0.2 0.9'),
				Seat(8, '0.02 0.65'),
				Seat(9, '0.03 0.34'),
				Seat(10, '0.21 0.09')
			];

		case 12:
			return [
				Seat(1, '0.5 0'),
				Seat(2, '0.75 0.07'),
				Seat(3, '0.93 0.25'),
				Seat(4, '1 0.5'),
				Seat(5, '0.93 0.75'),
				Seat(6, '0.75 0.93'),
				Seat(7, '0.5 1'),
				Seat(8, '0.25 0.93'),
				Seat(9, '0.07 0.75'),
				Seat(10, '0 0.5'),
				Seat(11, '0.07 0.25'),
				Seat(12, '0.25 0.06')
			];

		default:
			return [Seat(1, '0.2 0', '0.5 1'), Seat(2, '0.5 0', '0.5 1'), Seat(3, '0.8 0', '0.5 1')];
	}
}

export default getSeatsCircle;
