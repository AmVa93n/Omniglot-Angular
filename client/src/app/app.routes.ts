import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { UserComponent } from '../components/user/user.component';
import { SignupComponent } from '../components/signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Root route
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users/match/:matchType', component: UsersComponent },
    { path: 'users/:userType/:langId', component: UsersComponent },
    { path: 'users/:userId', component: UserComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to root
];
