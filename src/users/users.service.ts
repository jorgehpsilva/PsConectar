import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    return this.findOne(id);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLogin: new Date() });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findAll(filters?: {
    role?: string;
    sortBy?: 'name' | 'createdAt';
    order?: 'asc' | 'desc';
  }): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('user');

    if (filters?.role) {
      query.where('user.role = :role', { role: filters.role });
    }

    if (filters?.sortBy) {
      query.orderBy(`user.${filters.sortBy}`, (filters.order?.toUpperCase() as 'ASC' | 'DESC') || 'ASC');

    }

    return query.getMany();
  }

  async findInactiveUsers(): Promise<User[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.lastLogin IS NULL OR user.lastLogin < :date', { date: thirtyDaysAgo })
      .getMany();
  }
}
