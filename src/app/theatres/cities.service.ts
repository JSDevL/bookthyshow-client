import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import _ from 'underscore';
import axios from 'axios';

/**
 * Models
 */

import { City } from './city.model';

export class CitiesService {
	citiesUpdated = new EventEmitter<City[]>();

	cities: City[] = [];
	socket;

	constructor() {
		this.socket = io.connect();

		this.socket.on('POST /api/cities', (data: City) => {
			this.cities.push(data);
			this.citiesUpdated.emit(this.cities);
		});

		this.socket.on('DELETE /api/cities', (_id: String) => {
			this.cities = _.reject(this.cities, (movie: City) => {
				return movie._id.toString() === _id;
			});
			this.citiesUpdated.emit(this.cities);
		});

		axios.get(`/api/cities/`).then( (response) => {
			this.cities = response.data;
			this.citiesUpdated.emit(this.cities);
		});
	}
}
