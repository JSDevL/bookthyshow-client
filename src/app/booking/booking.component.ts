import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private bookingService: BookingService
	) {}

	ngOnInit() {
		// if( !this.route.snapshot.queryParams.movie ){
		// 	this.router.navigate(['/']);
		// }

		this.bookingService.selectedMovie = this.route.snapshot.queryParams.movie;
	}

}
