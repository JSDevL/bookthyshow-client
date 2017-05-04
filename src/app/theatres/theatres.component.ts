import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
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
import { MoviesService } from '../movies/movies.service'; 

@Component({
	selector: 'app-theatres',
	templateUrl: './theatres.component.html',
	styleUrls: ['./theatres.component.scss'],
	providers: [CitiesService, TheatresService, MoviesService]
})
export class TheatresComponent implements OnInit {
	cities: City[];
	theatres: Theatre[];

	constructor(private citiesService: CitiesService,
		private theatresService: TheatresService,
		private moviesService: MoviesService,
		private http: Http) {}

	ngOnInit() {
		this.http.get('/api/cities').subscribe( (response: Response) => {
			this.citiesService.cities = response.json();
			this.citiesService.citiesUpdated.next(response.json());
		});

		this.http.get('/api/theatres').subscribe( (response: Response) => {
			this.theatresService.theatres = response.json();
			this.theatresService.theatresUpdated.next(response.json());
		});

		this.http.get('/api/movies').subscribe( (response: Response) => {
			this.moviesService.movies = response.json();
			this.moviesService.moviesUpdated.next(response.json());
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
