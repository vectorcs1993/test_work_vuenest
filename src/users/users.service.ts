import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';


@Injectable()
export class UserService {
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
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users ORDER BY id DESC', (err, rows) => {
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
  create(name: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO users (name) VALUES (?)', [name], function (this: { lastID: number }, err) {
        if (err) {
          console.error('Ошибка создания пользователя', err);
          reject(err);
        } else {
          console.log(`Пользователь создан`);
          resolve(this.lastID);
        }
      }
      );
    });
  }
  delete(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM users WHERE id = $1;', [id], (err) => {
        if (err) {
          console.error('Ошибка удалени пользователя', err);
          reject(err);
        } else {
          console.log(`Пользователь удален`);
          resolve(1);
        }
      }
      );
    });
  }
  getAllDataWithCheck(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT users.id, users.name, COUNT(checks.id) AS checks_count, COALESCE(SUM(checks.sum), 0) AS checks_sum FROM users LEFT JOIN  checks ON users.id = checks.user GROUP BY users.id;', 
        (err, rows) => {
        if (err) {
          console.error('Ошибка при извлечении полных данных пользователей', err);
          reject(err);
        } else {
          console.log('Список всех данных пользователей', rows);
          resolve(rows);
        }
      });
    });
  }
}