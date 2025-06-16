import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IUser, IUserUpdate } from 'src/types/users.interface';
import { UserStatus } from './user-status.enum';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) { }

  get(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.database.query('SELECT id, name, email, status, role, branch FROM users WHERE id=? LIMIT 1', [id]).then((row) => {
        console.log('Пользователь', row[0]);
        resolve(row[0]);
      }).catch((err) => {
        // console.error('Ошибка при извлечении пользователей', err.message);
        reject(err);
      });
    });
  }
  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.database.query('SELECT id, name, email, status, role, branch FROM users ORDER BY id DESC').then((rows) => {
        console.log('Список пользователей', rows);
        resolve(rows);
      }).catch((err) => {
        // console.error('Ошибка при извлечении пользователей', err.message);
        reject(err);
      });
    });
  }
  create(newUser: IUser): Promise<number> {
    return new Promise((resolve, reject) => {
      this.database.query('INSERT INTO users (name, email, status, role, branch) VALUES (?,?,?,?,?)',
        [newUser.name, newUser.email, UserStatus.PENDING, newUser.role, newUser.branch]).then((result) => {
          console.log(`Пользователь создан`);
          resolve(Number(result.insertId));
        }).catch((err) => {
          console.error('Ошибка создания пользователя');
          reject(err);
        });
    });
  }
  async update(id: number, userData: IUserUpdate): Promise<number> {
    try {
      const updates: string[] = [];
      const values: (string | number)[] = [];
      if (userData.name !== undefined) {
        updates.push('name = ?');
        values.push(userData.name);
      }
      if (userData.email !== undefined) {
        updates.push('email = ?');
        values.push(userData.email);
      }
      if (userData.status !== undefined) {
        updates.push('status = ?');
        values.push(userData.status);
      }
      if (userData.role !== undefined) {
        updates.push('role = ?');
        values.push(userData.role);
      }
      if (userData.branch !== undefined) {
        updates.push('branch = ?');
        values.push(userData.branch);
      }
      if (updates.length > 0) {
        values.push(id);
        const result = await this.database.query(`UPDATE users SET ${updates.join(', ')} WHERE id=?`, values);
        const affectedRows = result.affectedRows || result.rowCount || 0;
        console.log(`Обновлено пользователей: ${affectedRows}`);
        return affectedRows;
      } else {
        throw new Error('Отсутствуют поля для обновления');
      }
    } catch (err) {
      console.error('Ошибка обновления пользователя:', err);
      throw err;
    }
  }
  delete(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.database.query('DELETE FROM users WHERE id=?;', [id]).finally(() => {
        console.log(`Пользователь удален`);
        resolve(1);
      });
    });
  }
}