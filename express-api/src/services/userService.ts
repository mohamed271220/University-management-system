import { userRequest } from "../interfaces";
import User from "../models/User";

export default class UserService {
  constructor(private userRepository = User) {}

  async getAllUsers(limit: number = 10, offset: number = 0) {
    try {
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
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findByPk(id, {
        attributes: { exclude: ["passwordHash"] },
      });
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async updateUser(id: string, updates: Partial<User>, reqUser: userRequest) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) throw new Error("User not found");

      if (!reqUser.user) throw new Error("Unauthorized");

      if (
        (reqUser.user.role === "student" && reqUser.user.id !== user.id) ||
        ["professor", "staff", "admin"].indexOf(reqUser.user.role) === -1
      ) {
        throw new Error("Unauthorized");
      }

      if (updates.username) user.username = updates.username;
      if (updates.email) user.email = updates.email;
      if (updates.role && reqUser.user.role === "admin")
        user.role = updates.role;

      await user.save();
      return user;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) throw new Error("User not found");

      await user.destroy();
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
}
