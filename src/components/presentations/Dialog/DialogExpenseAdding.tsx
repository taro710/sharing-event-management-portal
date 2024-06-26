'use client';

import ExpenseAddingContainer from '@/components/containers/expense/ExpenseAddingContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { ExpenseData } from '@/domain/expense';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (expense: ExpenseData) => void;
};
const DialogExpenseAdding = ({ isOpen, closeDialog, handleSubmit }: Props) => (
    <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
      <ExpenseAddingContainer close={closeDialog} handleSubmit={handleSubmit} />
    </DialogWrapper>
  );

export default DialogExpenseAdding;
