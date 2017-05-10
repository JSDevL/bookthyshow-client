import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';
import { HomeComponent } from './home/home.component';
import { TheatresComponent } from './theatres/theatres.component';
import { AddCitiesComponent } from './theatres/add-cities/add-cities.component';
import { AddTheatresComponent } from './theatres/add-theatres/add-theatres.component';
import { MoviesToTheatreComponent } from './theatres/movies-to-theatre/movies-to-theatre.component';
import { BookingComponent } from './booking/booking.component';
import { SeatsSelectComponent } from './booking/seats-select/seats-select.component';
import { SeatComponent } from './booking/seats-select/seat/seat.component';
import { DateTimeSelectComponent } from './booking/date-time-select/date-time-select.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'movies', component: MoviesComponent },
	{ path: 'theatres', component: TheatresComponent },
	{ path: 'movies-to-theatres', component: MoviesToTheatreComponent },
	{
		path: 'booking',
		component: BookingComponent,
		children: [
			{
				path: '', // default to date and time select
				component: DateTimeSelectComponent
			},
			{
				path: 'date-time-select',
				component: DateTimeSelectComponent
			},
			{
				path: 'seats-select',
				component: SeatsSelectComponent
			}
		]
	}
];

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
		MoviesToTheatreComponent,
		BookingComponent,
		SeatsSelectComponent,
		SeatComponent,
		DateTimeSelectComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(routes, { useHash: true })
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
