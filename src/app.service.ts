import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';


@Injectable()
export class AppService {
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
    this.db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    this.db.run('CREATE TABLE IF NOT EXISTS checks (id INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, sum REAL NOT NULL)');
  }

  getHello(): string {
    return 'Hello World! My Test Work with vue nest!!!';
  }

  getUsers(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
          console.error('Ошибка при извлечении пользователей', err);
          reject(err);
        } else {
          console.log('Список пользователей', rows);
          resolve(rows);
        }
      });
    });
  }
  createUser(name: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO users (name) VALUES (?)', [name], (err) => {
        if (err) {
          console.error('Ошибка создания пользователя', err);
          reject(err);
        } else {
          console.log(`Пользователь создан`);
          resolve(1);
        }
      }
      );
    });
  }

  getChecks(): Promise<any[]> {
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

  createCheck(userId: number, sum: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO checks (user, sum) VALUES (?, ?)', [userId, sum], (err) => {
        if (err) {
          console.error('Ошибка добавления чека', err);
          reject(err);
        } else {
          console.log(`Чек добавлен для пользователя ${userId}`);
          resolve(1);
        }
      }
      );
    });
  }
}