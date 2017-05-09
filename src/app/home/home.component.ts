import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import _ from 'underscore';

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
	form: HTMLFormElement;
	// dependencies
	movies: Movie[] = [];
	cities: City[] = [];
	// generated based on selected city and/or on search
	availableMovies: Movie[] = [];
	searchedMovies: Movie[] = [];

	constructor(
		private router: Router,
		private http: Http,
		private citiesService: CitiesService,
		private moviesService: MoviesService
	) {}

	ngOnInit() {
		this.http.get(`/api/cities/`).subscribe( (response) => {
			this.cities = response.json();
			this.citiesService.citiesUpdated.next(this.cities);
		});

		this.http.get(`/api/movies/populated`).subscribe( (response) => {
			this.availableMovies = this.movies = response.json();
			this.moviesService.moviesUpdated.next(this.movies);
		});
	}

	citySelect(){
		// reset search
		this.searchedMovies = [];
		this.form.controls.search.reset();

		const selectedCityID = this.form.value.citySelect;

		if(selectedCityID){
			this.availableMovies = _.filter(this.movies, (movie) => {
				return _.find(movie.theatres, (t) => {
					return t.theatre.city.toString() === selectedCityID;
				});
			});
		} else {
			this.availableMovies = this.movies;
		}
	}

	search(){
		const toSearch = this.form.value.search;

		if(toSearch){
			this.searchedMovies = _.filter(this.availableMovies, (movie) => {
				return movie.Title.toLowerCase().search(toSearch.toLowerCase()) !== -1;
			});
		} else {
			this.searchedMovies = [];
		}
	}

	book(movie: Movie){
		if(this.form.controls.citySelect.invalid){
			return alert('select city first');
		}

		this.router.navigate(['/booking', 'date-time-select'], {
			queryParams: {
				city: this.form.value.citySelect,
				movie: movie._id
			}
		});
	}
}
