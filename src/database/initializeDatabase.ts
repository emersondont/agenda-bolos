import { type SQLiteDatabase } from 'expo-sqlite'

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
  CREATE TABLE IF NOT EXISTS Cakes (
    id TEXT PRIMARY KEY,
    customer TEXT,
    price REAL,
    deliveryDate TEXT,
    deliveryHour TEXT,
    fillings TEXT,
    batter TEXT,
    quantityFillings INTEGER,
    quantityBatters INTEGER,
    description TEXT
  );
  `)
  await database.execAsync(`
  CREATE TABLE IF NOT EXISTS Fillings (
    id TEXT PRIMARY KEY,
    name TEXT
  );
  `)

}