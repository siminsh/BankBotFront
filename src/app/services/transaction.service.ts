import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/api/transactions`;
  
  constructor(private http: HttpClient) { }

  getRecentTransactions(userId: string, months: number = 3): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/recent/${userId}?months=${months}`);
  }

  getTransactionsByPeriod(userId: string, startDate: string, endDate: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}/${userId}?startDate=${startDate}&endDate=${endDate}`
    );
  }
}
