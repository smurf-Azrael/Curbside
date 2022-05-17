import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/SharedErrorMessages';
import { IListingStatus } from '../interfaces/listing.interface';
import { ITransaction } from '../interfaces/transaction.interface';
import listingQueries from '../queries/listing.queries';
import transactionQueries from '../queries/transaction.queries';

const deleteTransaction = async (userId: string, listingId: string): Promise<ITransaction> => {
  try {
    const listing = await listingQueries.getListingById(listingId);
    if (listing.userId !== userId) {
      throw new CustomError('Unauthorized', 400);
    }
    const transaction: ITransaction = await transactionQueries.deleteTransaction(userId, listingId);
    if (transaction) {
      await listingQueries.updateListing(listingId, { ...listing, photoUrls: listing.photoUrls.toString(), status: IListingStatus.available });
    }
    return transaction;
  } catch (error) {
    console.log('/models/transaction.model deleteTransaction ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};

export default {
  deleteTransaction
};
