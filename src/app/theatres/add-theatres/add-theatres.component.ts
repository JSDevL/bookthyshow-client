import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

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

	constructor(private citiesService: CitiesService, private theatresService: TheatresService, private http: Http) { }

	ngOnInit() {
		this.citiesService.citiesUpdated.subscribe( (citiesUpdated: City[]) => {
			this.cities = citiesUpdated;
		});

		this.theatresService.theatresUpdated.subscribe( (theatresUpdated: Theatre[]) => {
			this.theatres = theatresUpdated;
		});
	}

	addTheatre(newTheatre){
		this.http.post(`/api/theatres/`, newTheatre).subscribe();
	}

	deleteTheatre(theatre: Theatre){
		this.http.delete(`/api/theatres/${theatre._id}`).subscribe();
	}

}
