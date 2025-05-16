import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(data: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findOne(id: string): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    updateLastLogin(id: string): Promise<void>;
    remove(id: string): Promise<void>;
    findAll(filters?: {
        role?: string;
        sortBy?: 'name' | 'createdAt';
        order?: 'asc' | 'desc';
    }): Promise<User[]>;
    findInactiveUsers(): Promise<User[]>;
}
