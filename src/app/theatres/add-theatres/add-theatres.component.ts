import { Component, OnInit } from '@angular/core';
import axios from 'axios';

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
	newTheatre: Theatre = {name: '', location: ''};

	cities: City[];
	theatres: Theatre[];

	constructor(private citiesService: CitiesService, private theatresService: TheatresService) { }

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (citiesUpdated) => {
			this.cities = citiesUpdated;
		});

		this.theatresService.theatresUpdated.subscribe( (theatresUpdated) => {
			this.theatres = theatresUpdated;
		});
	}

	addTheatre(newTheatre){
		axios.post(`/api/theatres/`, newTheatre);
	}

	deleteTheatre(theatre: Theatre){
		axios.delete(`/api/theatres/${theatre._id}`);
	}

}
