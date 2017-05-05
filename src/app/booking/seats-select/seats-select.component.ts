import { Component, OnInit } from '@angular/core';
import _ from 'underscore';

/**
 * Services
 */

import { BookingService } from '../booking.service';

@Component({
	selector: 'app-seats-select',
	templateUrl: './seats-select.component.html',
	styleUrls: ['./seats-select.component.scss']
})
export class SeatsSelectComponent implements OnInit {

	rows: String[] = [];
	columns: Number[] = [];

	constructor(private bookingService: BookingService) {
		// generate seats grid
		this.columns = _.range(1, 20);
		for(const i of _.range(0, 15)){
			this.rows.push(String.fromCharCode(65 + i));
		}
	}

	changeSeatsLimit(event){
		this.bookingService.seatsLimitUpdated.next(parseInt(event.target.value));
		this.bookingService.selectedSeatsUpdated.next([]);
	}

	ngOnInit() {}
}
