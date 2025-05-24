export interface UserRegistration {
  name: string;
  family: string;
  username: string;
  password: string;
  country: string;
  city: string;
}

export interface Country {
  name: string;
  cities: string[];
}
