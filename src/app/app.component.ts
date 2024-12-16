import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.authService.authenticateUser(); // Fetch the data
      await this.appService.getNotifications();
    } catch (error) {
      console.error('Error during app initialization:', error);
    }
  }
}