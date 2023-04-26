export type ChatMessage = {
  from: MessageFrom;
  senderId: string;
  receiverId: string;
  content: string;
}