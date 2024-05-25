import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('dbName');

export default db;