export interface ITransaction {
  id: string,
  listingId: string,
  sellerId: string,
  buyerId: string,
  createdAt: Date
}

export interface ITransactionDTO {
  id? :string,
  listingId: string,
  sellerId: string,
  buyerId: string,
}
