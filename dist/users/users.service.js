"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(data) {
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async update(id, data) {
        await this.usersRepository.update(id, data);
        return this.findOne(id);
    }
    async updateLastLogin(id) {
        await this.usersRepository.update(id, { lastLogin: new Date() });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async findAll(filters) {
        const query = this.usersRepository.createQueryBuilder('user');
        if (filters?.role) {
            query.where('user.role = :role', { role: filters.role });
        }
        if (filters?.sortBy) {
            query.orderBy(`user.${filters.sortBy}`, filters.order?.toUpperCase() || 'ASC');
        }
        return query.getMany();
    }
    async findInactiveUsers() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return this.usersRepository
            .createQueryBuilder('user')
            .where('user.lastLogin IS NULL OR user.lastLogin < :date', { date: thirtyDaysAgo })
            .getMany();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map