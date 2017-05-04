import { Component, OnInit } from '@angular/core';

/**
 * Services
 */

import { MoviesService } from './movies.service';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss'],
	providers: [MoviesService]
})
export class MoviesComponent implements OnInit {
	constructor() {}

	ngOnInit() {
	}
}
