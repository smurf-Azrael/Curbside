import { NextFunction, Request, Response } from 'express';
import transactionModel from '../models/transaction.model';
const deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.uid;
    const listingId = req.params.listingId;
    const transaction = await transactionModel.deleteTransaction(userId, listingId);
    res.status(200).send({ data: { listing: transaction.id } });
  } catch (error) {
    next(error);
  }
};

export default {
  deleteTransaction
};
