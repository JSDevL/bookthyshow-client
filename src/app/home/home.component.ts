import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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

	// inputs
	movies: Movie[] = [];
	cities: City[] = [];
	// generated based on selected city and/or on search
	availableMovies: Movie[] = [];
	searchedMovies: Movie[] = [];
	// flags
	searched: Boolean = false;

	constructor(
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

	onCitySelect(event){
		this.searched = false;

		const selectedCityID = event.target.value;

		if(!selectedCityID){
			return this.availableMovies = this.movies;
		}

		this.availableMovies = _.filter(this.movies, (movie) => {
			return _.find(movie.theatres, (t) => {
				return t.theatre.city.toString() === selectedCityID;
			});
		});
	}

	onSearch(event){
		this.searched = true;

		const toSearch = event.target.value;

		if(!toSearch){
			this.searched = false;
		}

		this.searchedMovies = _.filter(this.availableMovies, (movie) => {
			return movie.Title.toLowerCase().search(toSearch.toLowerCase()) !== -1;
		});
	}
}
