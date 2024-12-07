import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-navbar',
  imports: [NotificationsComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any;
  unread: any;

  constructor(private authService: AuthService, private appService: AppService) {}

  ngOnInit(): void {
    this.user = this.authService.user; // Access the shared data
    this.unread = this.appService.unread
  }
}