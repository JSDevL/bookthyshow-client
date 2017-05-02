import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { CitiesService } from '../cities.service';
import { TheatresService } from '../theatres.service';
import { MoviesService } from '../../movies/movies.service';
import _ from 'underscore';

/**
 * Models
 */

import { City } from '../city.model';
import { Theatre } from '../theatre.model';
import { Movie } from '../../movies/movies.model';

@Component({
	selector: 'app-movies-to-theatre',
	templateUrl: './movies-to-theatre.component.html',
	styleUrls: ['./movies-to-theatre.component.css']
})
export class MoviesToTheatreComponent implements OnInit {
	cities: City[];
	theatres: Theatre[];
	movies: Movie[];

	selectedCityName: String;
	theatresGroupedByCityName: Object;

	binding: {
		theatre: String,
		movie: String,
		dates: String[],
		timings: String[]
	};

	constructor(
		private citiesService: CitiesService,
		private theatreService: TheatresService,
		private moviesService: MoviesService,
		private http: Http
	) {
		this.cities = [];
		this.theatres = [];
		this.movies = [];

		this.selectedCityName = '';
		this.theatresGroupedByCityName = {};

		this.binding = {
			theatre: '',
			movie: '',
			dates: [],
			timings: []
		}
	}

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (citiesUpdated: City[]) => {
			this.cities = citiesUpdated;
		});

		this.theatreService.theatresUpdated.subscribe( (updates: Theatre[]) => {
			this.theatres = updates;
			this.theatresGroupedByCityName = _.groupBy(this.theatres, (theatre) => {
				return theatre.city.name;
			});
		});

		this.moviesService.moviesUpdated.subscribe( (updates: Movie[]) => {
			this.movies = updates;
		});
	}

	removeDate(date: String){
		this.binding.dates = _.reject(this.binding.dates, function(dateToRemove){
			return dateToRemove === date;
		});
	}

	removeTime(time: String){
		this.binding.timings = _.reject(this.binding.timings, function(timeToRemove){
			return timeToRemove === time;
		});
	}

	bind(){
		this.http.post(`/api/theatres/${this.binding.theatre}/movies/${this.binding.movie}/`, {
			dates: this.binding.dates,
			timings: this.binding.timings
		}).subscribe( (response) => {}, (error) => {
			alert(error.message);
		});
	}
}
