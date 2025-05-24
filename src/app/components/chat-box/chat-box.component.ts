import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messages: ChatMessage[] = [];
  userId: string = 'user1';
  isLoading: boolean = false;

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserId$.subscribe(userId => {
      this.userId = userId;
      this.loadChatHistory();
    });
  }

  loadChatHistory(): void {
    this.isLoading = true;
    this.chatService.getChatHistory(this.userId)
      .subscribe({
        next: (messages) => {
          this.messages = messages.reverse(); // Display newest at the bottom
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching chat history:', error);
          this.isLoading = false;
        }
      });
  }

  onMessageSent(content: string): void {
    // Add user message to the UI immediately
    const userMessage: ChatMessage = {
      userId: this.userId,
      messageType: 'USER',
      content: content,
      timestamp: new Date().toISOString()
    };
    
    this.messages.push(userMessage);
    
    // Add a temporary bot message to indicate processing
    const tempBotMessage: ChatMessage = {
      userId: this.userId,
      messageType: 'BOT',
      content: 'Thinking...',
      timestamp: new Date().toISOString()
    };
    
    this.messages.push(tempBotMessage);
    
    // Send message to server
    this.chatService.sendMessage({ userId: this.userId, content: content })
      .subscribe({
        next: () => {
          // The server is processing the message asynchronously
          // We'll poll for updates to get the bot's response
          this.pollForResponse();
        },
        error: (error) => {
          console.error('Error sending message:', error);
          // Update the temporary message to show the error
          tempBotMessage.content = 'Sorry, there was an error processing your request.';
        }
      });
  }

  private pollForResponse(): void {
    // Set a timeout to check for new messages after a delay
    setTimeout(() => {
      this.loadChatHistory();
    }, 1000); // Poll after 1 second
  }
}
