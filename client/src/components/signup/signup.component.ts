import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { getLanguageName, langList } from '../../utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  getLanguageName = getLanguageName
  error = ''
  preview: any
  signupForm!: FormGroup;
  countries: { name: { common: string } }[] = [];
  languages = Object.keys(langList).sort((a, b) => langList[a].localeCompare(langList[b]));

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    // Initialize form
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['male', Validators.required],
      birthdate: [null, Validators.required],
      country: ['', Validators.required],
      profilePic: [null],
      lang_teach: this.fb.array([]),
      lang_learn: this.fb.array([]),
      professional: [false],
      private: [false]
    });

    // Subscribe to changes in the 'professional' control
    this.signupForm.get('professional')?.valueChanges.subscribe((value) => {
      if (value) {
        this.signupForm.get('private')?.disable();
      } else {
        this.signupForm.get('private')?.enable();
      }
    });

    // Subscribe to changes in the 'private' control
    this.signupForm.get('private')?.valueChanges.subscribe((value) => {
      if (value) {
        this.signupForm.get('professional')?.disable();
      } else {
        this.signupForm.get('professional')?.enable();
      }
    });

    // Fetch countries
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();
      this.countries = countries.sort((a: {name: {common: string}}, b: {name: {common: string}}) =>
        a.name.common.localeCompare(b.name.common)
      );
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  // Getter for FormArray
  get langTeach(): FormArray {
    return this.signupForm.get('lang_teach') as FormArray;
  }

  get langLearn(): FormArray {
    return this.signupForm.get('lang_learn') as FormArray;
  }

  // Add or remove language from FormArray
  handleCheckbox(list: FormArray, language: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    if (isChecked) {
      list.push(this.fb.control(language));
    } else {
      const index = list.controls.findIndex(control => control.value === language);
      list.removeAt(index);
    }
  }

  handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(): void {
    if (this.signupForm.valid) {
      try {
          const formData = new FormData();
          for (let key in this.signupForm.value) {
            formData.append(key, this.signupForm.value[key])
          }
          this.authService.signup(formData)
      } catch (error: any) {
          alert(error.response?.data?.message);
      }
      
    } else {
      alert('Form is invalid');
    }
  }
}
