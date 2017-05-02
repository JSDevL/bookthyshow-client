import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

/**
 * Models
 */

import { City } from '../city.model';

/**
 * Services
 */

import { CitiesService } from '../cities.service';

@Component({
	selector: 'app-add-cities',
	templateUrl: './add-cities.component.html',
	styleUrls: ['./add-cities.component.css']
})
export class AddCitiesComponent implements OnInit {
	newCity: City;
	cities: City[];

	constructor(private citiesService: CitiesService, private http: Http) {
		this.newCity = new City();
		this.cities = [];
	}

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (update: City[]) => {
			this.cities = update;
		});
	}

	addCity(newCity: City) {
		this.http.post('/api/cities', newCity).subscribe();
	}

	removeCity(city: City){
		this.http.delete(`/api/cities/${city._id}`).subscribe(
			(response) => {},
			(error) => {
				alert(error.json().name);
			}
		);
	}
}
