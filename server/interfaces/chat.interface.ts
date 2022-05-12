import { IMessage } from './message.interface';

export interface IChat {
  id: string,
  listingId: string,
  sellerId: string,
  buyerId: string,
  messages: IMessage[],
  createdAt: Date,
  updatedAt: Date
}
