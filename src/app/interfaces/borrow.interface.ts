import { Model, Types } from "mongoose";

export interface Borrow {
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
};
export interface BorrowStatics extends Model<Borrow> {
    updatedCopiesAfterBorrow(bookId: string, quantity: number): any
}