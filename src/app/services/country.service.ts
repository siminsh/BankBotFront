import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[] = [
    {
      name: 'United States',
      cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
    },
    {
      name: 'Canada',
      cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa']
    },
    {
      name: 'United Kingdom',
      cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool']
    },
    {
      name: 'Australia',
      cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
    },
    {
      name: 'Germany',
      cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne']
    }
  ];

  constructor() { }

  getCountries(): Observable<Country[]> {
    return of(this.countries);
  }

  getCitiesByCountry(countryName: string): Observable<string[]> {
    const country = this.countries.find(c => c.name === countryName);
    return of(country ? country.cities : []);
  }
}
