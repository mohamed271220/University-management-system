import { userRequest } from "../interfaces";
import User from "../models/User";

export default class UserService {
  static async getAllUsers(limit: number = 10, offset: number = 0) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["passwordHash"] },
        limit,
        offset,
      });
      return users;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  static async getUserById(id: string) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["passwordHash"] },
      });
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  static async updateUser(
    id: string,
    updates: Partial<User>,
    reqUser: userRequest
  ) {
    try {
      const user = await User.findByPk(id);
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
      if (updates.role && reqUser.user.role === "admin") user.role = updates.role;

      await user.save();
      return user;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  static async deleteUser(id: string) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");

      await user.destroy();
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
}
