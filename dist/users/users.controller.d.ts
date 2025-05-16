import { UsersService } from './users.service';
import { RequestWithUser } from '../common/interfaces/request-with-user';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findMe(req: RequestWithUser): Promise<import("./entities/user.entity").User>;
    findAll(role?: string, sortBy?: 'name' | 'createdAt', order?: 'asc' | 'desc'): Promise<import("./entities/user.entity").User[]>;
    getProfile(req: RequestWithUser): Promise<import("./entities/user.entity").User>;
    createUser(req: RequestWithUser): void;
    remove(id: string): Promise<void>;
    getInactiveUsers(): Promise<import("./entities/user.entity").User[]>;
}
