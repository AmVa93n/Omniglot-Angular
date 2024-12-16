import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { getLanguageName } from '../../utils';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stats: any;
  getLanguageName = getLanguageName

  constructor(private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.stats = await this.appService.getLanguageStats();
    } catch (error) {
      console.error('Error fetching data in component:', error);
    }
  }
}
