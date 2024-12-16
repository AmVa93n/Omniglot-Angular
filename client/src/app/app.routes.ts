import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { UserComponent } from '../components/user/user.component';
import { SignupComponent } from '../components/signup/signup.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ClassesComponent } from '../components/classes/classes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Root route
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users/match/:matchType', component: UsersComponent },
    { path: 'users/:userType/:langId', component: UsersComponent },
    { path: 'users/:userId', component: UserComponent},
    { path: 'account/profile', component: ProfileComponent},
    { path: 'account/classes', component: ClassesComponent},
    //{ path: 'account/decks', component: DecksComponent},
    //{ path: 'account/offers', component: OffersComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to root
];
