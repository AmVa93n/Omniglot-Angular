import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { getLanguageName, getUserAge } from '../../utils'

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  matches: Array<any> = []
  matchType: any
  userType: any
  langId: any
  getLanguageName = getLanguageName
  getUserAge = getUserAge

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(params => {
        this.matchType = params.get('matchType') || '';
        this.userType = params.get('userType') || '';
        this.langId = params.get('langId') || '';
        this.fetchUsers()
      });
  }

  async fetchUsers() {
    try {
      if (this.matchType) {
        this.matches = await this.appService.getMatches(this.matchType);
      } 
      if (this.userType && this.langId) {
        if (this.userType === 'learners') {
          this.matches = await this.appService.getLearners(this.langId);
        } else {
          this.matches = await this.appService.getTeachers(this.langId);
        }
      }
    } catch (error) {
      console.error('Error fetching data in component:', error);
    }
  }
}
