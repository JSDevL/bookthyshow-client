import { Component, OnInit } from '@angular/core';
import _ from 'underscore';

/**
 * Services
 */

import { SeatsService } from './seats.service';

@Component({
	selector: 'app-seats-select',
	templateUrl: './seats-select.component.html',
	styleUrls: ['./seats-select.component.scss'],
	providers: [SeatsService]
})
export class SeatsSelectComponent implements OnInit {

	rows: String[] = [];
	columns: Number[] = [];

	constructor(private seatsService: SeatsService) {
		// generate seats grid
		this.columns = _.range(1, 20);
		for(const i of _.range(0, 15)){
			this.rows.push(String.fromCharCode(65 + i));
		}
	}

	changeSeatsLimit(event){
		this.seatsService.seatsLimitUpdated.next(parseInt(event.target.value));
		this.seatsService.selectedSeatsUpdated.next([]);
	}

	ngOnInit() {}
}
