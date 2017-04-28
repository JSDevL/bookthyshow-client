import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TheatresComponent } from './theatres/theatres.component';
import { MoviesToTheatreComponent } from './theatres/movies-to-theatre/movies-to-theatre.component';

// Route Configuration
export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'movies', component: MoviesComponent },
	{ path: 'theatres', component: TheatresComponent },
	{ path: 'movies-to-theatres', component: MoviesToTheatreComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
