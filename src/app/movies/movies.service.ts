import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import _ from 'underscore';

/**
 * Models
 */

import { Movie } from './movies.model';

@Injectable()
export class MoviesService {
	moviesUpdated = new Subject();

	movies: Movie[] = [];
	socket;

	constructor(private http: Http) {
		this.socket = io.connect();

		this.socket.on('POST /api/movies', (data: Movie) => {
			this.movies.push(data);
			this.moviesUpdated.next(this.movies);
		});

		this.socket.on('DELETE /api/movies', (_id: String) => {
			this.movies = _.reject(this.movies, (movie: Movie) => {
				return movie._id.toString() === _id;
			});
			this.moviesUpdated.next(this.movies);
		});

		this.http.get(`/api/movies/`).subscribe( (response) => {
			this.movies = response.json();
			this.moviesUpdated.next(this.movies);
		});
	}
}
