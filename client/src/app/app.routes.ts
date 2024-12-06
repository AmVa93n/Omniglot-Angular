import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Root route
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to root
];
