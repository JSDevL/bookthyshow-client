import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import _ from 'underscore';

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
	selectedCityID: String;

	cities: City[] = [];
	theatres: Theatre[] = [];

	searchedCityID: String;

	constructor(private citiesService: CitiesService, private theatresService: TheatresService, private http: Http) {
		this.newTheatre = new Theatre();
	}

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (citiesUpdated: City[]) => {
			this.cities = citiesUpdated;
		});

		this.theatresService.theatresUpdated.subscribe( (theatresUpdated: Theatre[]) => {
			this.theatres = theatresUpdated;
		});
	}

	addTheatre(newTheatre){
		this.http.post(`/api/theatres/`, newTheatre).subscribe( (response: Response) => {
			const newTheatre = response.json()
			if(response.status === 200){
				this.http.put(`/api/cities/${this.selectedCityID}`, newTheatre).subscribe( (response) => {
					if(response.status === 200){
						for(let city of this.cities){
							if(city._id === this.selectedCityID){
								city.theatres.push(newTheatre);
							}
						}
					}
				});
			}
		});
	}

	deleteTheatre(theatre: Theatre){
		this.http.delete(`/api/theatres/${theatre._id}`).subscribe();
	}

}
