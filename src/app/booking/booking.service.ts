import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Models
 */

import { Seat } from './seat.model';

@Injectable()
export class BookingService{
	// for seats limit
	seatsLimitUpdated = new Subject();
	seatsLimit: Number = 5;
	// for selected seats
	selectedSeatsUpdated = new Subject();
	selectedSeats: Seat[] = [];
	// for reserved seats
	reservedSeatsUpdated = new Subject();
	reservedSeats: Seat[] = [
		{
			row: 'A',
			col: 1
		},
		{
			row: 'B',
			col: 2
		}
	]

	constructor(){
		this.selectedSeatsUpdated.subscribe( (update: Seat[]) => {
			this.selectedSeats = update;
		});

		this.seatsLimitUpdated.subscribe( (update: Number) => {
			this.seatsLimit = update;
		});
	}
}