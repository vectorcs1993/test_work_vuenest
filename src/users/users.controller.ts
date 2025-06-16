import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiParam, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';
import { UserService } from './users.service';
import { IUser, IUserUpdate } from 'src/types/users.interface';
import { IApiResp } from 'src/types/api-resp.interface';
import { UserDto, UserResponseDto, UserUpdateDto } from './user.dto';

@ApiTags('Пользователи')
@Controller('api/users')
export class UserController {
  constructor(private readonly service: UserService) { }

  private formatResponse(data: any = null, status: string = 'success') {
    return { status, data };
  }

  private handleError(error: Error, defaultMessage: string) {
    if (error.message === 'USER_NOT_FOUND') {
      throw new HttpException(this.formatResponse(null, 'user_not_found'), HttpStatus.NOT_FOUND);
    }
    throw new HttpException(
      this.formatResponse({ error: error.message }, 'error'),
      HttpStatus.BAD_REQUEST
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить пользователя по ID',
    description: 'Возвращает данные пользователя по указанному идентификатору'
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя', example: 1 })
  @ApiOkResponse({ type: UserResponseDto })
  public async get(@Param('id') id: number): Promise<IApiResp> {
    try {
      const result = await this.service.get(id);
      if (!result) {
        return this.formatResponse(null, 'user_not_found');
      }
      return this.formatResponse(result);
    } catch (err) {
      this.handleError(err, 'Ошибка при извлечении пользователя');
    }
    return this.formatResponse(null, 'error');
  }

  @Get()
  @ApiOperation({
    summary: 'Получить список всех пользователей',
    description: 'Возвращает массив всех зарегистрированных пользователей'
  })
  @ApiOkResponse({ type: [UserResponseDto] })
  public async getAll(): Promise<IApiResp> {
    try {
      const result = await this.service.getAll();
      return this.formatResponse(result);
    } catch (err) {
      this.handleError(err, 'Ошибка при извлечении пользователей');
    }
    return this.formatResponse(null, 'error');
  }

  @Post()
  @ApiOperation({
    summary: 'Создать нового пользователя',
    description: 'Регистрирует нового пользователя в системе'
  })
  @ApiBody({ type: UserDto })
  public async create(@Body() data: IUser): Promise<IApiResp> {
    try {
      const result = await this.service.create(data);
      return this.formatResponse(result);
    } catch (err) {
      this.handleError(err, 'Ошибка при создании пользователя');
    }
    return this.formatResponse(null, 'error');
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Обновить данные пользователя',
    description: 'Обновляет информацию о пользователе по указанному ID'
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя', example: 1 })
  @ApiBody({ type: UserUpdateDto })
  @ApiOkResponse({ type: Number })
  public async update(@Param('id') id: number, @Body() data: IUserUpdate): Promise<IApiResp> {
    try {
      const result = await this.service.update(id, data);
      if (!result) {
        return this.formatResponse(null, 'user_not_found');
      }
      return this.formatResponse(result);
    } catch (err) {
      this.handleError(err, 'Ошибка при изменении пользователя');
    }
    return this.formatResponse(null, 'error');
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить пользователя',
    description: 'Удаляет пользователя по указанному ID'
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя', example: 1 })
  @ApiOkResponse({ type: Number })
  public async delete(@Param('id') id: number): Promise<IApiResp> {
    try {
      const result = await this.service.delete(id);
      if (!result) {
        return this.formatResponse(null, 'user_not_found');
      }
      return this.formatResponse(result);
    } catch (err) {
      this.handleError(err, 'Ошибка при удалении пользователя');
    }
    return this.formatResponse(null, 'error');
  }
}