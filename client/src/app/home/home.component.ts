import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stats: any;

  constructor(private dataService: AppService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.stats = await this.dataService.getLanguageStats();
    } catch (error) {
      console.error('Error fetching data in component:', error);
    }
  }
}
