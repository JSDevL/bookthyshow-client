import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';
import { HomeComponent } from './home/home.component';
import { TheatresComponent } from './theatres/theatres.component';
import { AddCitiesComponent } from './theatres/add-cities/add-cities.component';
import { AddTheatresComponent } from './theatres/add-theatres/add-theatres.component';

@NgModule({
	declarations: [
		AppComponent,
		MoviesComponent,
		MovieListComponent,
		MovieSearchComponent,
		HomeComponent,
		TheatresComponent,
		AddCitiesComponent,
		AddTheatresComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
