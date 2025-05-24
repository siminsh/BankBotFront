import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserRegistration } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserIdSubject = new BehaviorSubject<string>('user1'); // Default user
  currentUserId$ = this.currentUserIdSubject.asObservable();
  
  // Simulate a users database
  private users: UserRegistration[] = [];
  
  constructor() { }

  getCurrentUserId(): string {
    return this.currentUserIdSubject.value;
  }

  setCurrentUserId(userId: string): void {
    this.currentUserIdSubject.next(userId);
  }
  
  registerUser(user: UserRegistration): Observable<boolean> {
    // Check if username already exists
    if (this.users.some(u => u.username === user.username)) {
      return of(false);
    }
    
    // Add user to the array
    this.users.push(user);
    
    // In a real application, you would send this data to your backend API
    console.log('User registered:', user);
    
    return of(true);
  }
  
  getRegisteredUsers(): UserRegistration[] {
    return [...this.users];
  }
}
