import { ApiProperty } from '@nestjs/swagger';
import { IUser, IUserUpdate } from 'src/types/users.interface';
import { UserStatus } from './user-status.enum';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'user', description: 'Роль' })
  role: string;

  @ApiProperty({ example: 0, description: 'Подразделение' })
  branch: number;

  @ApiProperty({
    example: 'active',
    description: 'Статус',
    enum: UserStatus
  })
  status: UserStatus;
}

export class UserDto implements IUser {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'Иван Иванов', description: 'ФИО' })
  name: string;

  @ApiProperty({ example: 'user', description: 'Роль' })
  role: string;

  @ApiProperty({ example: 0, description: 'Подразделение' })
  branch: number;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  password: string;
}

export class UserUpdateDto implements IUserUpdate {
  @ApiProperty({ example: 'Иван Иванов', description: 'ФИО' })
  name: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'user', description: 'Роль' })
  role: string;

  @ApiProperty({ example: 0, description: 'Статус' })
  status: number;

  @ApiProperty({ example: 'branch', description: 'Подразделение' })
  branch: number;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  password: string;
}
