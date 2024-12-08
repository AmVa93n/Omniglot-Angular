import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: any
  account_created: any

  constructor(private authService: AuthService) {}

  async handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement; // Cast to HTMLFormElement
    const formData = new FormData(form);
    const email = formData?.get('email');
    const password = formData?.get('password');
    const requestBody = { email, password };

    try {
      const { authToken } = await this.authService.login(requestBody)
      // If the POST request is successful store the authentication token,
      // after the token is stored authenticate the user
      // and at last navigate to the home page
      this.authService.storeToken(authToken);
      this.authService.authenticateUser();
      
    } catch (error: any) {
      // If the request resolves with an error, set the error message in the state
      this.error = error.response.data.message;
    }
    
  };
}
