import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Models
 */

import { Seat } from './seat.model';

@Injectable()
export class SeatsService{
	/*** Class */
	selectedClass: String = 'GOLD';
	/*** Seats */
	selectedSeats: Seat[] = [];
	selectedSeatsUpdated = new Subject();
	/*** Seats Limit */
	seatsLimit: Number = 5;
	seatsLimitUpdated = new Subject();
	/*** Reserved Seats */
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
	reservedSeatsUpdated = new Subject();

	constructor(){
		this.selectedSeatsUpdated.subscribe( (update: Seat[]) => {
			this.selectedSeats = update;
		});

		this.seatsLimitUpdated.subscribe( (update: Number) => {
			this.seatsLimit = update;
		});
	}
}