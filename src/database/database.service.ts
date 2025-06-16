import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mariadb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor(private configService: ConfigService) {
        this.pool = createPool({
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            user: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            connectionLimit: 10,
        });
        this.initializeDatabase();
    }
    private async initializeDatabase(): Promise<void> {
        await this.createUsersTable();
    }
    private async createUsersTable(): Promise<void> {
        await this.query(`CREATE TABLE IF NOT EXISTS users 
            (id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name TEXT UNIQUE NOT NULL, 
            email TEXT UNIQUE NOT NULL,
            role TEXT NOT NULL,
            password TEXT NOT NULL,
            status INTEGER NOT NULL,
            branch INTEGER NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);
    }
    async query(sql: string, params?: any[]): Promise<any> {
        const connection = await this.pool.getConnection();
        try {
            const results = await connection.query(sql, params);
            return results;
        } finally {
            connection.release();
        }
    }
}