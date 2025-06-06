import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';


@Injectable()
export class CheckService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('test.db', (err) => {
      if (err) {
        console.error('Ошибка подключения:', err);
      } else {
        console.log('Подключено к БД');
        this.initDB();
      }
    });
  }

  private initDB() {
    this.db.run('CREATE TABLE IF NOT EXISTS checks (id INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, sum REAL NOT NULL)');
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM checks', (err, rows) => {
        if (err) {
          console.error('Ошибка при извлечении чеков', err);
          reject(err);
        } else {
          console.log('Список чеков', rows);
          resolve(rows);
        }
      });
    });
  }

  create(userId: number, sum: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO checks (user, sum) VALUES (?, ?)', [userId, sum], function (this: { lastID: number }, err) {
        if (err) {
          console.error('Ошибка добавления чека', err);
          reject(err);
        } else {
          console.log(`Чек добавлен для пользователя ${userId}`);
          resolve(this.lastID);
        }
      }
      );
    });
  }
  getChecksFromUser(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM checks WHERE user = $1', [id], (err, rows) => {
        if (err) {
          console.error('Ошибка при извлечении чеков пользователя', err);
          reject(err);
        } else {
          console.log('Список чеков пользователя', rows);
          resolve(rows);
        }
      });
    });
  }
}