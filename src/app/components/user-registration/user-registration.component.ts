import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CountryService } from '../../services/country.service';
import { UserRegistration, Country } from '../../models/user-registration.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  countries: Country[] = [];
  cities: string[] = [];
  registrationSuccess = false;
  registrationError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private countryService: CountryService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      family: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCountries();
    
    // When country changes, update cities
    this.registrationForm.get('country')?.valueChanges.subscribe(countryName => {
      if (countryName) {
        this.loadCities(countryName);
      } else {
        this.cities = [];
      }
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  loadCities(countryName: string): void {
    this.countryService.getCitiesByCountry(countryName).subscribe(cities => {
      this.cities = cities;
      // Reset city selection when country changes
      this.registrationForm.patchValue({ city: '' });
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData: UserRegistration = this.registrationForm.value;
      
      this.userService.registerUser(userData).subscribe(success => {
        if (success) {
          this.registrationSuccess = true;
          this.registrationError = false;
          this.registrationForm.reset();
          // Reset form state
          setTimeout(() => {
            this.registrationSuccess = false;
          }, 3000);
        } else {
          this.registrationError = true;
          this.registrationSuccess = false;
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
