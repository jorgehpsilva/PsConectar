import { RequestWithUser } from './common/interfaces/request-with-user';
import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: RequestWithUser): Promise<import("./users/entities/user.entity").User>;
}
