import {
  getDoc,
  doc,
  updateDoc,
  deleteField,
  setDoc,
} from 'firebase/firestore';
import { useParams } from 'next/navigation';

import { ExpenseData } from '@/domain/expense';
import { database } from '@/firebase';

/*
 * Export type ExpenseData = {
 *   expenseId: number;
 *   expenseName: string;
 *   price: number;
 *   payerName: string;
 *   members: string[];
 * };
 */

export const useExpensePage = (currentExpenseData: ExpenseData[]) => {
  const eventId = useParams()?.eventId as string;

  const addExpense = async (data: ExpenseData) => {
    const newExpenseId = (() => {
      if (currentExpenseData.length === 0) return 1;
      const ids = currentExpenseData.map((expense) => expense.expenseId || 0);
      return Math.max(...ids) + 1;
    })();

    const docRef = doc(database, eventId, 'expense');
    try {
      await setDoc(
        docRef,
        {
          [newExpenseId]: { ...data, expenseId: newExpenseId },
        },
        { merge: true },
      );
      const afterAddExpenseData = [
        ...currentExpenseData,
        { ...data, expenseId: newExpenseId },
      ];
      return afterAddExpenseData;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  const updateExpense = async (data: ExpenseData) => {
    const docRef = doc(database, eventId, 'expense');
    try {
      if (!data.expenseId) return undefined;
      await updateDoc(docRef, { [data.expenseId]: data });

      const afterUpdateExpenseData = [...currentExpenseData].map((expense) => {
        if (expense.expenseId === data.expenseId) return data;
        return expense;
      });
      return afterUpdateExpenseData;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  const getExpenseList = async () => {
    const docRef = doc(database, eventId, 'expense');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const expenseList: ExpenseData[] = Object.values(data || {});
      return expenseList;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  const deleteExpense = async (expenseId?: number) => {
    const docRef = doc(database, eventId, 'expense');
    try {
      if (!expenseId) return undefined;
      await updateDoc(docRef, { [expenseId]: deleteField() });

      const afterDeleteExpenseData = [...currentExpenseData].filter(
        (expense) => expense.expenseId !== expenseId,
      );
      return afterDeleteExpenseData;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  return {
    addExpense,
    updateExpense,
    getExpenseList,
    deleteExpense,
  };
};
