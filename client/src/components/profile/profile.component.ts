import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { getLanguageName, langList, formatDate } from '../../utils'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  error = ''
  user: any;
  getLanguageName = getLanguageName
  formatDate = formatDate
  languages = Object.keys(langList).sort((a, b) => langList[a].localeCompare(langList[b]));
  countries: { name: { common: string } }[] = [];
  editedFields: string[] = []
  editForm!: FormGroup;
  preview: any
  file: File | null = null; // Store the file separately

  constructor(private accountService: AccountService, private fb: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.accountService.getProfile(); // Update the user when it's available
    } catch (error) {
      alert(error)
    }

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

    // Initialize form
    this.editForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      gender: [this.user.gender, Validators.required],
      birthdate: [this.user.birthdate, Validators.required],
      country: [this.user.country, Validators.required],
      profilePic: [null],
      lang_teach: this.fb.array(this.user.lang_teach),
      lang_learn: this.fb.array(this.user.lang_learn),
      professional: [this.user.professional],
      private: [this.user.private]
    });
  }

  editProfilePic() {
    document.getElementById('pfp')?.click();
  }

  handleEdit(field: string) {
    this.editedFields.push(field)
  };

  handleCancel(field: string) {
    const index = this.editedFields.indexOf(field)
    this.editedFields.splice(index, 1)
  };

  // Getter for FormArray
  get langTeach(): FormArray {
    return this.editForm.get('lang_teach') as FormArray;
  }

  get langLearn(): FormArray {
    return this.editForm.get('lang_learn') as FormArray;
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
      this.handleEdit('pfp')
    }
  }
}
