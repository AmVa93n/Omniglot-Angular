import { Injectable } from '@angular/core';
import axios, { AxiosHeaders, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any = null; // Shared state

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

  async login(requestBody: object) {
    const response: AxiosResponse = await this.api.post('/auth/login', requestBody);
    return response.data;
  }

  async signup(requestBody: object) {
    const response: AxiosResponse = await this.api.post('/auth/signup', requestBody);
    return response.data;
  }

  async verify(): Promise<any> {
    const response: AxiosResponse = await this.api.get('/auth/verify');
    this.user = response.data;
  }
}
