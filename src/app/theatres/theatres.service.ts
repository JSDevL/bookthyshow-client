import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import _ from 'underscore';

/**
 * Models
 */

import { Theatre } from './theatre.model';

@Injectable()
export class TheatresService {
	theatresUpdated = new Subject();

	theatres: Theatre[] = [];
	socket;

	constructor(private http: Http) {
		this.socket = io.connect();

		this.socket.on('POST /api/theatres', (data: Theatre) => {
			this.theatres.push(data);
			this.theatresUpdated.next(this.theatres);
		});

		this.socket.on('DELETE /api/theatres', (_id: String) => {
			this.theatres = _.reject(this.theatres, (movie: Theatre) => {
				return movie._id.toString() === _id;
			});
			this.theatresUpdated.next(this.theatres);
		});

		http.get(`/api/theatres/`).subscribe( (response) => {
			this.theatres = response.json();
			this.theatresUpdated.next(this.theatres);
		});
	}
}
