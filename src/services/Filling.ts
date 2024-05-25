import { FillingType } from '../types';
import db from './SQLIteDatabase';
import * as Crypto from 'expo-crypto';

db.transaction((tx) => {
  // tx.executeSql("DROP TABLE Fillings;");
  // console.log('apagando')
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS Fillings (id TEXT PRIMARY KEY, name TEXT);"
  );
  console.log('criada')
});

const create = (name: string) => {
  const UUID = Crypto.randomUUID();
  console.log('Your UUID: ' + UUID);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO Fillings (id, name) values (?,?);",
        [UUID, name],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {resolve('insertId')}
          else reject("Error inserting obj: " + JSON.stringify(name)); // insert falhou
        },
        (_, error) => {
          console.log('error', error)
          reject(error); // erro interno em tx.executeSql
          return false; // Add this line to return a boolean value
        }
      );
    });
  });
};

const all = (): Promise<FillingType[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM Fillings;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error); // erro interno em tx.executeSql
          return false; // Add this line to return a boolean value
        }
      );
    });
  });
};

const remove = (id: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM Fillings WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => {
          reject(error); // erro interno em tx.executeSql
          return false; // Add this line to return a boolean value
        }
      );
    });
  });
};


export default {
  create,
  all,
  remove
};