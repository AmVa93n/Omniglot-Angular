import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { getLanguageName, getUserAge } from '../../utils'

@Component({
  selector: 'app-matches',
  imports: [CommonModule, RouterLink],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent implements OnInit {
  matches: Array<any> = []
  matchType: any
  getLanguageName = getLanguageName
  getUserAge = getUserAge

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(params => {
        this.matchType = params.get('matchType') || '';
        this.fetchMatches()
      });
  }

  async fetchMatches() {
    try {
      this.matches = await this.appService.getMatches(this.matchType);
    } catch (error) {
      console.error('Error fetching data in component:', error);
    }
  }
}
