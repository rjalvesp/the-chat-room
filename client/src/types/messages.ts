import { Author } from "./authors";

export interface Message {
  _id?: string;
  authorId: string;
  text: string;
  created: string;
  authorInfo: Author;
}

export interface MessageBody {
  text: string;
}
