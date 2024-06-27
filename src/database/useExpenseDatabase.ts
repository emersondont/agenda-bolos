import { useSQLiteContext } from "expo-sqlite";
import * as Crypto from 'expo-crypto';
import { ExpenseType } from "../types";

export function useExpensesDatabase() {
  const database = useSQLiteContext()

  async function create(expense: Omit<ExpenseType, "id">) {
    const statement = await database.prepareAsync(`
      INSERT INTO Expenses (id, product, price, quantity, paymentDate) 
      VALUES ($id, $product, $price, $quantity, $paymentDate);
    `);

    try {
      const UUID = Crypto.randomUUID();
      await statement.executeAsync({
        $id: UUID,
        $product: expense.product,
        $price: expense.price,
        $quantity: expense.quantity,
        $paymentDate: expense.paymentDate.toISOString()
      });

      return { id: UUID };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function update(expense: ExpenseType) {
    const statement = await database.prepareAsync(`
      UPDATE Expenses 
      SET product = $product, price = $price, quantity = $quantity, paymentDate = $paymentDate 
      WHERE id = $id;
    `);

    try {
      await statement.executeAsync({
        $id: expense.id,
        $product: expense.product,
        $price: expense.price,
        $quantity: expense.quantity,
        $paymentDate: expense.paymentDate.toISOString()
      });
      return expense;
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getByMonth({month, year}: {month: number, year: number}) {
    const monthStr = `${year}-${month < 10 ? `0${month}` : month}`;
    try {
      const query = `SELECT * FROM Expenses WHERE strftime('%Y-%m', paymentDate) = ? ORDER BY paymentDate;`;
      const result = await database.getAllAsync<ExpenseType>(query, [monthStr]);
      return result;
    } catch (error) {
      throw error;
    } 
  }

  async function remove(id: string) {
    const statement = await database.prepareAsync("DELETE FROM Expenses WHERE id = $id;");
    try {
      await statement.executeAsync({ $id: id });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  return { create, update, getByMonth, remove };
}