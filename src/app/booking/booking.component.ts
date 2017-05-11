import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import * as _ from 'underscore';

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
		private http: Http,
		private router: Router,
		private route: ActivatedRoute,
		private bookingService: BookingService
	) {}

	ngOnInit() {
		// if( !this.route.snapshot.queryParams.movie ){
		// 	this.router.navigate(['/']);
		// }

		this.http.get(`/api/movies/${this.route.snapshot.queryParams.movie}/`).subscribe( (result) => {
			this.bookingService.selectedMovieUpdated.next(result.json());
		});

		this.http.get(`/api/cities/${this.route.snapshot.queryParams.city}/`).subscribe( (result) => {
			this.bookingService.selectedCityUpdated.next(result.json());
		});
	}

}
