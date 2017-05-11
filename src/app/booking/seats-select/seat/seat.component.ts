import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';

/**
 * Services
 */

import { SeatsService } from '../seats.service';

/**
 * Model
 */

import { Seat } from '../seat.model';

@Component({
	selector: 'app-seat',
	templateUrl: './seat.component.html',
	styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {
	@Input() row: String;
	@Input() col: Number;
	@Input() seatClass: String;
	selected: Boolean;
	reserved: Boolean;

	constructor(private seatsService: SeatsService) {}

	ngOnInit() {
		this.selected = this.isSelected();
		this.seatsService.selectedSeatsUpdated.subscribe( () => {
			this.selected = this.isSelected();
		});

		this.reserved = this.isReserved();
		this.seatsService.reservedSeatsUpdated.subscribe( () => {
			this.reserved = this.isReserved();
		});
	}

	isSelected(): Boolean{
		return _.find(this.seatsService.selectedSeats, seat => seat.row === this.row && seat.col === this.col ) ? true : false;
	}

	isReserved(): Boolean{
		return _.find(this.seatsService.reservedSeats, seat => seat.row === this.row && seat.col === this.col ) ? true : false;
	}

	select(){
		if (this.selected){
			// if selected then unselect
			this.seatsService.selectedSeatsUpdated.next( _.reject(this.seatsService.selectedSeats, (seat) => {
				return seat.row === this.row && seat.col === this.col;
			}));
		} else if (this.seatClass !== this.seatsService.selectedClass){
			// if attempting to select from other class
			alert('cannot select from this class');
		} else if (this.reserved){
			// if seat already reserved
			alert('seat reserved');
		} else if (this.seatsService.selectedSeats.length === this.seatsService.seatsLimit){
			// if seatLimit reached
			alert('cannot book more seats');
		} else {
			// select and update service
			this.seatsService.selectedSeats.push({
				row: this.row,
				col: this.col
			});
			this.seatsService.selectedSeatsUpdated.next(this.seatsService.selectedSeats);
		}
	}
}
