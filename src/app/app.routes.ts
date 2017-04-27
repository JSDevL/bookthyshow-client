import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TheatresComponent } from './theatres/theatres.component';

// Route Configuration
export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'movies', component: MoviesComponent },
	{ path: 'theatres', component: TheatresComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
