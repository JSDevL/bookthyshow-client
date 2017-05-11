import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

/**
 * Models
 */

import { Theatre } from '../../theatres/theatre.model';
import { Movie } from '../../movies/movies.model';

/**
 * Services
 */

import { BookingService } from '../booking.service';

interface Binding{
	theatre: Theatre;
	dates: String[];
	timings: String[];
}

@Component({
	selector: 'app-date-time-select',
	templateUrl: './date-time-select.component.html',
	styleUrls: ['./date-time-select.component.scss']
})
export class DateTimeSelectComponent implements OnInit {

	// inputs
	bindings: Binding[] = [];
	// selections
	selectedDate: Date = new Date();
	// generated
	availableDates: Date[] = [];
	availableBindings: Binding[] = [];

	constructor(private bookingService: BookingService) { }

	ngOnInit() {
		this.bookingService.selectedMovieUpdated.subscribe( (update: Movie) => {
			this.bindings = update.theatres;
			// generate availableDates array
			const availableDatesInString = <String[]>_.flatten(_.pluck(update.theatres, 'dates'));
			this.availableDates = this.uniqSortedDates(availableDatesInString, 'dates');
			// default date
			this.selectDate(<Date>this.availableDates[0]);
		});
	}

	selectDate(date){
		this.selectedDate = date;
		this.availableBindings = _.filter(this.bindings, (binding: Binding) => {
			if( _.find(binding.dates, (d: String) => new Date(<string>d).toDateString() === this.selectedDate.toDateString() ) ){
				return true;
			} else {
				return false;
			}
		});
	}

	uniqSortedDates(datesInString: String[], type: String): Date[]{
		if(type === 'dates'){
			return _.sortBy( _.map( _.uniq(datesInString), (date: String) => new Date(<string>date)), (date: Date) => date );
		} else {
			return _.sortBy( _.map( _.uniq(datesInString), (t: String) => {
				const time = new Date();
				time.setHours(parseInt(t.split(':')[0]));
				time.setMinutes(parseInt(t.split(':')[1]));
				time.setSeconds(0);
				return time;
			}), (date: Date) => date );
		}
	}
}
