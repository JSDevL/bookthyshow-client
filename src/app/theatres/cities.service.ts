import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import * as _ from 'underscore';

/**
 * Models
 */

import { City } from './city.model';

@Injectable()
export class CitiesService {
	citiesUpdated = new Subject();

	cities: City[] = [];
	socket;

	constructor(private http: Http) {
		this.socket = io.connect();

		this.socket.on('POST /api/cities', (data: City) => {
			this.cities.push(data);
			this.citiesUpdated.next(this.cities);
		});

		this.socket.on('DELETE /api/cities', (_id: String) => {
			this.cities = _.reject(this.cities, (city: City) => {
				return city._id.toString() === _id;
			});
			this.citiesUpdated.next(this.cities);
		});

		this.http.get(`/api/cities/`).subscribe( (response) => {
			this.cities = response.json();
			this.citiesUpdated.next(this.cities);
		});
	}
}
