import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../notifications/notifications.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NotificationsComponent, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any;
  notifications: any;

  constructor(private authService: AuthService, private appService: AppService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user; // Update the user when it's available
    });
    this.appService.notifications$.subscribe((notifications) => {
      this.notifications = notifications; // Update the notifications when it's available
    });
  }

  getUnread() {
    return this.notifications.filter((n: { read: boolean; }) => !n.read).length
  }

  logout() {
    this.authService.logout()
  }
}