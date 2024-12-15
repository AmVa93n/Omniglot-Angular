import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { getLanguageName, langList } from '../../utils';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  file: File | null = null; // Store the file separately
  signupForm!: FormGroup;
  countries: { name: { common: string } }[] = [];
  languages = Object.keys(langList).sort((a, b) => langList[a].localeCompare(langList[b]));

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

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

    // Subscribe to `professional` changes
    this.signupForm.get('professional')?.valueChanges.subscribe((isProfessional: boolean) => {
      if (isProfessional) {
        this.signupForm.get('private')?.setValue(false, { emitEvent: false });
        this.signupForm.get('private')?.disable({ emitEvent: false });
      } else {
        this.signupForm.get('private')?.enable({ emitEvent: false });
      }
    });

    // Subscribe to `private` changes
    this.signupForm.get('private')?.valueChanges.subscribe((isPrivate: boolean) => {
      if (isPrivate) {
        this.signupForm.get('professional')?.setValue(false, { emitEvent: false });
        this.signupForm.get('professional')?.disable({ emitEvent: false });
      } else {
        this.signupForm.get('professional')?.enable({ emitEvent: false });
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
      this.file = file; // Save the File object
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async handleSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      try {
          const formData = new FormData();
          for (let key in this.signupForm.value) {
            if (key === 'profilePic') continue
            const value = this.signupForm.value[key];
            // Handle arrays: Append each element as a separate FormData entry
            if (Array.isArray(value)) {
              value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
              });
            // Handle other data types
            } else {
              formData.append(key, value);
            }
          }
          if (this.file) formData.append('profilePic', this.file); // Add the actual file
          await this.authService.signup(formData)
          this.router.navigate(['/login']);
      } catch (error: any) {
          alert(error.response?.data?.message);
      }
      
    } else {
      alert('Some mandatory fields are missing');
    }
  }
}
