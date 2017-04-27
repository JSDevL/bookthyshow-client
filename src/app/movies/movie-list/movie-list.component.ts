import { Component, OnInit } from '@angular/core';
import axios from 'axios';

/**
 * Models
 */

import { Movie } from '../movies.model';

/**
 * Services
 */

import { MoviesService } from '../movies.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
	movies: Movie[];

	constructor(private movieService: MoviesService) {}

	ngOnInit() {
		this.movieService.moviesUpdated.subscribe( (updatedMovies: Movie[]) => {
			this.movies = updatedMovies;
		});
	}

	deleteMovie(movie: Movie){
		axios.delete(`/api/movies/${movie._id}`);
	}

}