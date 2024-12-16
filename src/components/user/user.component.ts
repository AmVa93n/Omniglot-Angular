import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { getLanguageName, getUserAge, stylizeText, getIcon, formatDate, drawStars } from '../../utils'

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  viewedUser: any
  userId: any
  getLanguageName = getLanguageName
  getUserAge = getUserAge
  stylizeText = stylizeText
  getIcon = getIcon
  formatDate = formatDate
  drawStars = drawStars

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId') || '';
        this.fetchUser()
      });
  }

  async fetchUser() {
    try {
      this.viewedUser = await this.appService.getUser(this.userId);
    } catch (error) {
      console.error('Error fetching data in component:', error);
    }
  }
}
