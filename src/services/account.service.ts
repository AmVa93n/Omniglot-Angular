import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
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

  async getProfile(): Promise<any> {
    const response: AxiosResponse = await this.api.get('/account/profile');
    return response.data;
  }

  async updateProfile(): Promise<any> {
    const response: AxiosResponse = await this.api.put('/account/profile');
    return response.data;
  }

  async deleteProfile(): Promise<any> {
    const response: AxiosResponse = await this.api.delete('/account/profile');
    return response.data;
  }

  async getClasses(): Promise<any> {
    const response: AxiosResponse = await this.api.get('/account/classes');
    return response.data;
  }
}
