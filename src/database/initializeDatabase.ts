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
    icing TEXT,
    description TEXT
  );
  `)
  await database.execAsync(`
  CREATE TABLE IF NOT EXISTS Fillings (
    id TEXT PRIMARY KEY,
    name TEXT
  );
    INSERT INTO Fillings (id, name) VALUES ('1', 'Brigadeiro branco') ON CONFLICT(id) DO NOTHING;
  INSERT INTO Fillings (id, name) VALUES ('2', 'Brigadeiro preto') ON CONFLICT(id) DO NOTHING;
  INSERT INTO Fillings (id, name) VALUES ('3', 'Doce de leite') ON CONFLICT(id) DO NOTHING;
  INSERT INTO Fillings (id, name) VALUES ('4', 'Nata') ON CONFLICT(id) DO NOTHING;
  INSERT INTO Fillings (id, name) VALUES ('5', 'Nata com chocolate') ON CONFLICT(id) DO NOTHING;
  INSERT INTO Fillings (id, name) VALUES ('6', 'Coco') ON CONFLICT(id) DO NOTHING;
  INSERT INTO Fillings (id, name) VALUES ('7', 'Doce de ovos') ON CONFLICT(id) DO NOTHING;
  INSERT INTO Fillings (id, name) VALUES ('8', 'Ganache') ON CONFLICT(id) DO NOTHING;
  `)

}