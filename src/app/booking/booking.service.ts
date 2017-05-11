import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Models
 */

import { City } from '../theatres/city.model';
import { Theatre } from '../theatres/theatre.model';
import { Movie } from '../movies/movies.model';
import { Seat } from './seats-select/seat.model';

@Injectable()
export class BookingService{

	/*** Cities */
	selectedCity: City;
	selectedCityUpdated = new Subject();
	/*** Movies */
	selectedMovie: Movie;
	selectedMovieUpdated = new Subject();
	/*** Theatres */
	selectedTheatre: Theatre;
	selectedTheatreUpdated = new Subject();
	/*** Class */
	selectedClass: String = 'GOLD';
	selectedClassUpdated = new Subject();
	/*** Seats */
	selectedSeats: Seat[] = [];
	selectedSeatsUpdated = new Subject();
	/*** Seats Limit */
	seatsLimit: Number = 5;
	seatsLimitUpdated = new Subject();

	constructor(){
		this.selectedCityUpdated.subscribe( (update: City) => {
			this.selectedCity = update;
		});

		this.selectedTheatreUpdated.subscribe( (update: Theatre) => {
			this.selectedTheatre = update;
		});

		this.selectedMovieUpdated.subscribe( (update: Movie) => {
			this.selectedMovie = update;
		});

		this.selectedClassUpdated.subscribe( (update: String) => {
			this.selectedClass = update;
		});

		this.selectedSeatsUpdated.subscribe( (update: Seat[]) => {
			this.selectedSeats = update;
		});

		this.seatsLimitUpdated.subscribe( (update: Number) => {
			this.seatsLimit = update;
		});
	}
}