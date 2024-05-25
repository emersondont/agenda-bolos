import { CakeType, FillingType } from '../types';
import db from './SQLIteDatabase';
import * as Crypto from 'expo-crypto';

db.transaction((tx) => {
  // tx.executeSql("DROP TABLE Cakes;");
  // console.log('apagando')
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS Cakes (
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
    )`
  );
  console.log('criada')
});

const create = (cake: Omit<CakeType, "id">) : Promise<CakeType> => {
  const UUID = Crypto.randomUUID();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Cakes (id, customer, price, deliveryDate, deliveryHour, fillings, batter, quantityFillings, quantityBatters, description) values (?,?,?,?,?,?,?,?,?,?);",
        [UUID, cake.customer, cake.price, cake.deliveryDate.toDateString(), cake.deliveryHour, cake.fillings, cake.batter, cake.quantityFillings, cake.quantityBatters, cake.description],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {resolve({id: UUID, ...cake})}
          else reject("Error inserting obj: " + JSON.stringify(cake));
        },
        (_, error) => {
          console.log('error', error)
          reject(error);
          return false;
        }
      );
    });
  });
};

const update = (cake: CakeType) : Promise<CakeType>  => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Cakes SET customer=?, price=?, deliveryDate=?, deliveryHour=?, fillings=?, batter=?, quantityFillings=?, quantityBatters=?, description=? WHERE id=?;",
        [cake.customer, cake.price, cake.deliveryDate.toDateString(), cake.deliveryHour, cake.fillings, cake.batter, cake.quantityFillings, cake.quantityBatters, cake.description, cake.id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(cake);
          else reject("Error updating obj: id=" + cake.id);
        },
        (_, error) => {
          console.log('error', error)
          reject(error);
          return false;
        }
      );
    });
  });
};

const all = (): Promise<CakeType[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Cakes;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

const remove = (id: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Cakes WHERE id=?;",
        [id],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export default {
  create,
  update,
  all,
  remove
};