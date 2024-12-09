import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private notificationsSubject = new BehaviorSubject<any>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private api = axios.create({
    baseURL: environment.apiUrl
  });

  constructor() { 
    // Add an interceptor to attach the token to each request
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.set('Authorization', `Bearer ${storedToken}`);
      }
      return config;
    });
  }

  async getLanguageStats(): Promise<any> {
    const response: AxiosResponse = await this.api.get('/api/langStats');
    return response.data;
  }

  async getNotifications(): Promise<any> {
    const response: AxiosResponse = await this.api.get('/api/notifications');
    this.notificationsSubject.next(response.data); // Update the observable
  }

  async readNotification(notificationId: string): Promise<any> {
    const response: AxiosResponse = await this.api.put(`/api/notification/${notificationId}`);
    return response.data;
  }

  async deleteNotification(notificationId: string): Promise<any> {
    const response: AxiosResponse = await this.api.delete(`/api/notification/${notificationId}`);
    return response.data;
  }

  async getMatches(matchType: string) {
    const response: AxiosResponse = await this.api.get(`/api/match/${matchType}`);
    return response.data;
  }

  async getLearners(langId: string) {
    const response: AxiosResponse = await this.api.get(`/api/learners/${langId}`);
    return response.data;
  }

  async getTeachers(langId: string) {
    const response: AxiosResponse = await this.api.get(`/api/teachers/${langId}`);
    return response.data;
  }

  async getUser(userId: string) {
    const response: AxiosResponse = await this.api.get(`/api/users/${userId}`);
    return response.data;
  }
}