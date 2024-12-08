import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios, { AxiosHeaders, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

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
    return response
  }

  storeToken(token: string) {
    localStorage.setItem("authToken", token);
  };

  async authenticateUser() {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      try {
        // If the server verifies that JWT token is valid  ✅
        const response = await this.verify()
        this.userSubject.next(response.data); // Update the observable
      } catch (error) {
        // If the server sends an error response (invalid token) ❌
        console.error('Invalid Auth Token', error);
        this.userSubject.next(null); // Update the observable
      }
    } else {
      this.userSubject.next(null); // Update the observable
    }
  };

  async logout() {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
    await this.authenticateUser();
  };
}
