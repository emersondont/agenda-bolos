import { FillingType } from '../types';
import db from './SQLIteDatabase';

db.transaction((tx) => {
  // tx.executeSql("DROP TABLE Fillings;");
  // console.log('apagando')
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS Fillings (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
  );
});

const create = (name: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO Fillings (name) values (?);",
        [name],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
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

export default {
  create,
  all
};