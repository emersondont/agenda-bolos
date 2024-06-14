import { useSQLiteContext } from "expo-sqlite";
import { CakeType } from "../types";
import * as Crypto from 'expo-crypto';

export function useCakeDatabase() {
  const database = useSQLiteContext()

  async function create(cake: Omit<CakeType, "id">){
    const statement = await database.prepareAsync(`
    INSERT INTO Cakes (id, customer, price, deliveryDate, deliveryHour, fillings, batter, quantityFillings, quantityBatters, icing, description) 
    VALUES ($id, $customer, $price, $deliveryDate, $deliveryHour, $fillings, $batter, $quantityFillings, $quantityBatters, $icing, $description);
    `)

    var description = ''
    if (cake.description)
      description = cake.description

    try {
      const UUID = Crypto.randomUUID();
      await statement.executeAsync({
        $id: UUID,
        $customer: cake.customer,
        $price: cake.price,
        $deliveryDate: cake.deliveryDate.toISOString(),
        $deliveryHour: cake.deliveryHour,
        $fillings: cake.fillings,
        $batter: cake.batter,
        $quantityFillings: cake.quantityFillings,
        $quantityBatters: cake.quantityBatters,
        $icing: cake.icing,
        $description: description
      })

      return { id: UUID }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function update(cake: CakeType){
    const statement = await database.prepareAsync(`
      UPDATE Cakes 
      SET customer = $customer, price = $price, deliveryDate = $deliveryDate, deliveryHour = $deliveryHour, fillings = $fillings, batter = $batter, quantityFillings = $quantityFillings, quantityBatters = $quantityBatters, icing = $icing, description = $description 
      WHERE id = $id;
    `);

    var description = '';
    if (cake.description)
      description = cake.description;

    try {
      const result = await statement.executeAsync({
        $id: cake.id,
        $customer: cake.customer,
        $price: cake.price,
        $deliveryDate: cake.deliveryDate.toISOString(),
        $deliveryHour: cake.deliveryHour,
        $fillings: cake.fillings,
        $batter: cake.batter,
        $quantityFillings: cake.quantityFillings,
        $quantityBatters: cake.quantityBatters,
        $icing: cake.icing,
        $description: description
      });
      console.log('changes: ', result.changes)
      return cake
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function all() {
    try {
      const query = "SELECT * FROM Cakes;";
      const result = await database.getAllAsync<CakeType>(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function getUpcomingCakes() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to 00:00:00
  
    try {
      const query = `SELECT * FROM Cakes WHERE deliveryDate >= ? ORDER BY deliveryDate;`;
      const result = await database.getAllAsync<CakeType>(query, [today.toISOString()]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function getByMonth({month, year} : {month: number, year: number}){
    const monthStr = `${year}-${month < 10 ? `0${month}` : month}`;
    try {
      const query = `SELECT * FROM Cakes WHERE strftime('%Y-%m', deliveryDate) = ?;`;
      const result = await database.getAllAsync<CakeType>(query, [monthStr]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function remove(id: string) {
    const statement = await database.prepareAsync("DELETE FROM Cakes WHERE id = $id;");
    try {
      await statement.executeAsync({ $id: id });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync()
    }
  }

  return { create, update, all, getUpcomingCakes, getByMonth, remove}
}