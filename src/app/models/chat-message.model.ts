export interface ChatMessage {
  id?: number;
  userId: string;
  messageType: 'USER' | 'BOT';
  content: string;
  timestamp: string;
}
