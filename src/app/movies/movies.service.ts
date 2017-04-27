import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import _ from 'underscore';
import axios from 'axios';

/**
 * Models
 */

import { Movie } from './movies.model';

export class MoviesService {
	moviesUpdated = new EventEmitter<Movie[]>();

	movies: Movie[] = [];
	socket;

	constructor() {
		this.socket = io.connect();

		this.socket.on('POST /api/movies', (data: Movie) => {
			this.movies.push(data);
			this.moviesUpdated.emit(this.movies);
		});

		this.socket.on('DELETE /api/movies', (_id: String) => {
			this.movies = _.reject(this.movies, (movie: Movie) => {
				return movie._id.toString() === _id;
			});
			this.moviesUpdated.emit(this.movies);
		});

		axios.get(`/api/movies/`).then( (response) => {
			this.movies = response.data;
			this.moviesUpdated.emit(this.movies);
		});
	}
}
