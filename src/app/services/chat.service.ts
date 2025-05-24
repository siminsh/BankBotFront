import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { UserMessage } from '../models/user-message.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}/api/chat`;
  
  constructor(private http: HttpClient) { }

  sendMessage(message: UserMessage): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/send`, message);
  }

  getChatHistory(userId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/history/${userId}`);
  }
}
