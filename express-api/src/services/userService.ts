import { userRequest } from "../interfaces";
import User from "../models/User";
import { CustomError } from "../utils/CustomError";

export default class UserService {
  constructor(private userRepository = User) {}

  async getAllUsers(limit: number = 10, offset: number = 0) {
    const { count, rows: users } = await this.userRepository.findAndCountAll({
      attributes: { exclude: ["passwordHash"] },
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.ceil(offset / limit) + 1;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    const pagination = {
      totalItems: count,
      itemsPerPage: limit,
      currentPage: currentPage,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      nextPage: hasNextPage ? currentPage + 1 : null,
      previousPage: hasPreviousPage ? currentPage - 1 : null,
    };
    return { users, pagination };
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findByPk(id, {
      attributes: { exclude: ["passwordHash"] },
    });
    if (!user) throw new CustomError("User not found", 404);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>, reqUser: userRequest) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new CustomError("User not found", 404);

    if (!reqUser.user) throw new CustomError("Unauthorized", 401);

    if (
      (reqUser.user.role === "student" && reqUser.user.id !== user.id) ||
      ["professor", "staff", "admin"].indexOf(reqUser.user.role) === -1
    ) {
      throw new CustomError("Unauthorized", 401);
    }

    if (updates.username) user.username = updates.username;
    if (updates.email) user.email = updates.email;
    if (updates.role && reqUser.user.role === "admin") user.role = updates.role;

    await user.save();
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new CustomError("User not found", 404);

    await user.destroy();
  }
}
