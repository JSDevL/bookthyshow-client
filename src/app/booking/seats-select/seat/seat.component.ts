import { Component, OnInit, Input } from '@angular/core';
import _ from 'underscore';

/**
 * Services
 */

import { BookingService } from '../../booking.service';

/**
 * Model
 */

import { Seat } from '../../seat.model';

@Component({
	selector: 'app-seat',
	templateUrl: './seat.component.html',
	styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {
	@Input() row: String;
	@Input() col: Number;
	selected: Boolean;
	reserved: Boolean;

	constructor(private bookingService: BookingService) {}

	ngOnInit() {
		this.selected = this.isSelected();
		this.bookingService.selectedSeatsUpdated.subscribe( () => {
			this.selected = this.isSelected();
		});

		this.reserved = this.isReserved();
		this.bookingService.reservedSeatsUpdated.subscribe( () => {
			this.reserved = this.isReserved();
		});
	}

	isSelected(): Boolean{
		return _.find(this.bookingService.selectedSeats, seat => seat.row === this.row && seat.col === this.col ) ? true : false;
	}

	isReserved(): Boolean{
		return _.find(this.bookingService.reservedSeats, seat => seat.row === this.row && seat.col === this.col ) ? true : false;
	}

	select(){
		if (this.selected){
			// if selected then unselect
			this.bookingService.selectedSeatsUpdated.next( _.reject(this.bookingService.selectedSeats, (seat) => {
				return seat.row === this.row && seat.col === this.col;
			}));
		} else if (this.bookingService.selectedSeats.length === this.bookingService.seatsLimit){
			// if seatLimit reached
			alert('cannot book more seats');
		} else if (this.reserved){
			// if seat already reserved
			alert('seat reserved');
		} else {
			// select and update service
			this.bookingService.selectedSeats.push({
				row: this.row,
				col: this.col
			});
			this.bookingService.selectedSeatsUpdated.next(this.bookingService.selectedSeats);
		}
	}
}
