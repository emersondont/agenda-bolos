import { useSQLiteContext } from "expo-sqlite";
import { FillingType } from "../types";
import * as Crypto from 'expo-crypto';

export function useFillingDatabase() {
  const database = useSQLiteContext()

  async function create(name: string) {
    const statement = await database.prepareAsync(`
      INSERT INTO Fillings (id, name) 
      VALUES ($id, $name);
    `);
  
    try {
      const UUID = Crypto.randomUUID();
      const result = await statement.executeAsync({
        $id: UUID,
        $name: name
      })
  
      const id = result.lastInsertRowId.toString()
  
      return { id }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function all() {
    try {
      const query = "SELECT * FROM Fillings;";
      const result = await database.getAllAsync<FillingType>(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async function remove(id: string) {
    const statement = await database.prepareAsync("DELETE FROM Fillings WHERE id = $id;");
    try {
      await statement.executeAsync({ $id: id });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync()
    }
  }

  return { create, all, remove}
}