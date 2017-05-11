import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as _ from 'underscore';

/**
 * Models
 */

import { City } from '../city.model';
import { Theatre } from '../theatre.model';

/**
 * Services
 */

import { CitiesService } from '../cities.service';
import { TheatresService } from '../theatres.service';

@Component({
	selector: 'app-add-theatres',
	templateUrl: './add-theatres.component.html',
	styleUrls: ['./add-theatres.component.css']
})
export class AddTheatresComponent implements OnInit {
	newTheatre: Theatre;

	cities: City[];
	theatres: Theatre[];

	searchedCityName: String;
	theatresGroupedByCityName: Object;

	constructor(private citiesService: CitiesService, private theatresService: TheatresService, private http: Http) {
		this.newTheatre = new Theatre();
		this.cities = [];
		this.theatres = [];

		this.searchedCityName = '';
		this.theatresGroupedByCityName = {};
	}

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (citiesUpdated: City[]) => {
			this.cities = citiesUpdated;
		});

		this.theatresService.theatresUpdated.subscribe( (theatresUpdated: Theatre[]) => {
			this.theatres = theatresUpdated;
			this.theatresGroupedByCityName = _.groupBy(this.theatres, (theatre) => {
				return theatre.city.name;
			});
		});
	}

	addTheatre(newTheatre){
		this.http.post('/api/theatres', newTheatre).subscribe( (response: Response) => {});
	}

	deleteTheatre(theatre: Theatre){
		this.http.delete(`/api/theatres/${theatre._id}`).subscribe( (response: Response) => {});
	}

}
