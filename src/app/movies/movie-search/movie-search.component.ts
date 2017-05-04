import { Component, OnInit } from '@angular/core';
import axios from 'axios';

import { Movie } from '../movies.model';

@Component({
	selector: 'app-movie-search',
	templateUrl: './movie-search.component.html',
	styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
	searched: Movie;

	constructor() {}

	ngOnInit() {}

	search(searchInput: HTMLInputElement){
		if(searchInput.value.length){
			axios.get(`http://www.omdbapi.com/?t=${searchInput.value}`).then( response => {
				if(!response.data.error){
					this.searched = response.data;
				}
			});
		}
	}

	postMovie(){
		axios.post('/api/movies', this.searched);
	}
}
