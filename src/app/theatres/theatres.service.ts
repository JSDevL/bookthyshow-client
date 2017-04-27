import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import _ from 'underscore';
import axios from 'axios';

/**
 * Models
 */

import { Theatre } from './theatre.model';

export class TheatresService {
	theatresUpdated = new EventEmitter<Theatre[]>();

	theatres: Theatre[] = [];
	socket;

	constructor() {
		this.socket = io.connect();

		this.socket.on('POST /api/theatres', (data: Theatre) => {
			this.theatres.push(data);
			this.theatresUpdated.emit(this.theatres);
		});

		this.socket.on('DELETE /api/theatres', (_id: String) => {
			this.theatres = _.reject(this.theatres, (movie: Theatre) => {
				return movie._id.toString() === _id;
			});
			this.theatresUpdated.emit(this.theatres);
		});

		axios.get(`/api/theatres/`).then( (response) => {
			this.theatres = response.data;
			this.theatresUpdated.emit(this.theatres);
		});
	}
}
