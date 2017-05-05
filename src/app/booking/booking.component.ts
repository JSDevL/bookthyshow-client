import { Component, OnInit } from '@angular/core';

/**
 * Services
 */

import { BookingService } from './booking.service';

@Component({
	selector: 'app-booking',
	templateUrl: './booking.component.html',
	styleUrls: ['./booking.component.scss'],
	providers: [BookingService]
})
export class BookingComponent implements OnInit {

	constructor(private bookingService: BookingService) {}

	ngOnInit() {
	}

}
