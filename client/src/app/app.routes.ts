import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Root route
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to root
];
