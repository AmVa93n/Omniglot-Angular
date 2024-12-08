import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { MatchesComponent } from '../components/matches/matches.component';
import { UserComponent } from '../components/user/user.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Root route
    { path: 'login', component: LoginComponent },
    { path: 'match/:matchType', component: MatchesComponent },
    { path: 'users/:userId', component: UserComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to root
];
