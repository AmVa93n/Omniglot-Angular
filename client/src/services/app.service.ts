import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = environment.apiUrl;

  constructor() { }

  // Method to fetch data using async/await and Axios
  async getLanguageStats(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(`${this.apiUrl}/api/langStats`);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error for higher-level handling
    }
  }
}
