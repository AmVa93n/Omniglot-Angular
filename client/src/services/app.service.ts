import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = environment.apiUrl;
  public notifications: object[] = []; // Shared state
  public unread: number = 0; // Shared state

  constructor() { }

  async getLanguageStats(): Promise<any> {
    const response: AxiosResponse = await axios.get(`${this.apiUrl}/api/langStats`);
    return response.data;
  }

  async getNotifications(): Promise<any> {
    const response: AxiosResponse = await axios.get(`${this.apiUrl}/api/notifications`);
    const { notifications, unread } = response.data
    this.notifications = notifications
    this.unread = unread
  }
}