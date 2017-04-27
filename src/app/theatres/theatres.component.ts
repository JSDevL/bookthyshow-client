import { Component, OnInit, EventEmitter } from '@angular/core';
import axios from 'axios';
declare var $: any;

/**
 * Models
 */

import { City } from './city.model';
import { Theatre } from './theatre.model';

/**
 * Services
 */

import { CitiesService } from './cities.service';
import { TheatresService } from './theatres.service';

@Component({
	selector: 'app-theatres',
	templateUrl: './theatres.component.html',
	styleUrls: ['./theatres.component.css'],
	providers: [CitiesService, TheatresService]
})
export class TheatresComponent implements OnInit {
	cities: City[];
	theatres: Theatre[];

	citiesUpdated = new EventEmitter<City[]>();
	theatresUpdated = new EventEmitter<Theatre[]>();

	constructor(private citiesService: CitiesService, private theatreService: TheatresService,) {}

	ngOnInit() {
		axios.get('/api/cities').then( (response) => {
			this.cities = response.data;
			this.citiesUpdated.emit(this.cities);
		});

		axios.get('/api/theatres').then( (response) => {
			this.theatres = response.data;
			this.theatresUpdated.emit(this.theatres);
		});
	}

	switchTabs(event) {
		event.preventDefault();
		$(event.target).parent('li').addClass('active');
		$(event.target).parent('li').siblings('li').removeClass('active');

		const hash = event.target.href.split('#')[1];
		$(`#${hash}`).addClass('active');
		$(`#${hash}`).siblings().removeClass('active');
	}

}
