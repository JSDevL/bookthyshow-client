import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import * as _ from 'underscore';

/**
 * Services
 */

import { CitiesService } from '../theatres/cities.service';
import { MoviesService } from '../movies/movies.service';

/**
 * Models
 */

import { City } from '../theatres/city.model';
import { Movie } from '../movies/movies.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [CitiesService, MoviesService]
})
export class HomeComponent implements OnInit {

	// form
	@ViewChild('f')
	form: NgForm;
	// dependencies
	movies: Movie[] = [];
	cities: City[] = [];
	// generated
	availableMovies: Movie[] = [];
	searchedMovies: Movie[] = [];

	constructor(
		private router: Router,
		private http: Http,
		private citiesService: CitiesService,
		private moviesService: MoviesService
	) {}

	ngOnInit() {
		// get dependencies
		this.http.get(`/api/cities/`).subscribe( (response: Response) => {
			this.cities = <City[]>response.json();
			this.citiesService.citiesUpdated.next(this.cities);

			try {
				this.citySelect(this.cities[0]._id);
			} catch (err) {
				console.log('waiting for movies to load');
			}
		});

		this.http.get(`/api/movies/populated`).subscribe( (response: Response) => {
			this.availableMovies = this.movies = <Movie[]>response.json();
			this.moviesService.moviesUpdated.next(this.movies);

			try {
				this.citySelect(this.cities[0]._id);
			} catch (err) {
				console.log('waiting for cities to load');
			}
		});
	}

	citySelect(selectedCityID) {
		// reset search
		this.searchedMovies = [];
		this.form.controls.search.reset();

		this.form.setValue({
			'citySelect': selectedCityID,
			'search': ''
		});

		this.availableMovies = _.filter(this.movies, (movie: Movie) => {
			if ( _.find(movie.theatres, (t) => t.theatre.city.toString() === selectedCityID) ) {
				return true;
			} else {
				return false;
			}
		});
	}

	search(toSearch ) {
		if (toSearch) {
			this.searchedMovies = _.filter(this.availableMovies, (movie: Movie) => {
				return movie.Title.toLowerCase().search(toSearch.toLowerCase()) !== -1;
			});
		} else {
			this.searchedMovies = [];
		}
	}

	book(movie: Movie) {
		this.router.navigate(['/booking', 'date-time-select'], {
			queryParams: {
				city: this.form.value.citySelect,
				movie: movie._id
			}
		});
	}
}
