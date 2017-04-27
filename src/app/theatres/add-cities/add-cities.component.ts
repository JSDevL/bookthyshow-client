import { Component, OnInit } from '@angular/core';
import axios from 'axios';

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
	newCity: City = { name: '' };
	cities: City[];

	constructor(private citiesService: CitiesService) {}

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (citiesUpdated) => {
			this.cities = citiesUpdated;
		});
	}

	addCity(newCity: City) {
		axios.post('/api/cities', newCity);
	}

	removeCity(city: City){
		axios.delete(`/api/cities/${city._id}`);
	}
}
