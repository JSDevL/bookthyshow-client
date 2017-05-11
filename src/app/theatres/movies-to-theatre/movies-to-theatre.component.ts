import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { CitiesService } from '../cities.service';
import { TheatresService } from '../theatres.service';
import { MoviesService } from '../../movies/movies.service';
import * as _ from 'underscore';

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
	// inits
	cities: City[] = [];
	theatres: Theatre[] = [];
	movies: Movie[] = [];
	// selected inputs
	selectedCity: City;
	selectedTheatre: Theatre;
	selectedMovie: Movie;
	// generated
	theatresGroupedByCityID: any; // to filter theatres based on selectedCity
	// binding - generated if doesn't exist or assigned if exists
	binding: {
		theatre: String,
		movie: String,
		dates: String[],
		timings: String[]
	} = undefined;

	constructor(
		private citiesService: CitiesService,
		private theatreService: TheatresService,
		private moviesService: MoviesService,
		private http: Http
	) {}

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (updates: City[]) => {
			this.cities = updates;
		});

		this.theatreService.theatresUpdated.subscribe( (updates: Theatre[]) => {
			this.theatres = updates;
			this.theatresGroupedByCityID = _.groupBy(this.theatres, (theatre) => {
				return theatre.city._id;
			});
		});

		this.moviesService.moviesUpdated.subscribe( (updates: Movie[]) => {
			this.movies = updates;
		});
	}

	getSelectedCity(e) {
		this.selectedCity = _.find(this.cities, (city) => {
			return city._id.toString() === e.target.value;
		});
	}

	getSelectedTheatre(e) {
		this.selectedTheatre = _.find(this.theatres, (theatre) => {
			return theatre._id.toString() === e.target.value;
		});

		this.searchBinding();
	}

	getSelectedMovie(e) {
		this.selectedMovie = _.find(this.movies, (movie) => {
			return movie._id.toString() === e.target.value;
		});

		this.searchBinding();
	}

	searchBinding() {
		if (!this.selectedTheatre || !this.selectedMovie) {
			this.binding = undefined;
			return;
		}

		let isBound = false;
		for (let m of this.selectedTheatre.movies) {
			if (m.movie === this.selectedMovie._id) {
				isBound = true;
				this.binding = {
					theatre: this.selectedTheatre._id,
					movie: this.selectedMovie._id,
					dates: m.dates,
					timings: m.timings
				};
			}
		}

		if (isBound) {
			for (let i in this.selectedTheatre.movies) {
				if (this.selectedTheatre.movies[i].movie === this.selectedMovie._id) {
					this.selectedTheatre.movies[i] = this.binding;
				}
			}

			for (let i in this.selectedMovie.theatres) {
				if (this.selectedMovie.theatres[i].theatre === this.selectedTheatre._id) {
					this.selectedMovie.theatres[i] = this.binding;
				}
			}
		} else {
			this.binding = undefined;
		}
	}

	addBinding() {
		this.binding = {
			theatre: this.selectedTheatre._id,
			movie: this.selectedMovie._id,
			dates: [],
			timings: []
		}

		this.selectedMovie.theatres.push(this.binding);
		this.selectedTheatre.movies.push(this.binding);
	}

	save() {
		this.http.put(`/api/theatres/${this.selectedTheatre._id}/movies`, this.selectedTheatre.movies).subscribe( () => {
			this.http.put(`/api/movies/${this.selectedMovie._id}/theatres`, this.selectedMovie.theatres).subscribe( (response) => {
				if (response.status === 200) {
					alert('updated');
				}
			});
		});
	}

	delete() {
		this.selectedTheatre.movies = _.reject(this.selectedTheatre.movies, (m) => {
			return m.movie === this.selectedMovie._id;
		});

		this.selectedMovie.theatres = _.reject(this.selectedMovie.theatres, (t) => {
			return t.theatre === this.selectedTheatre._id;
		})

		this.save();

		this.searchBinding();
	}
}
