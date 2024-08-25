import { getUserById } from "../../controllers/user";
import UserService from "../../services/userService";
import { deleteUser } from "../../controllers/user";
import { updateUser } from "../../controllers/user";

jest.mock("../../services/userService");

describe("getUserById", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { params: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return the user if found", async () => {
    const user = { id: "1", username: "User1" };
    (UserService.prototype.getUserById as jest.Mock).mockResolvedValue(user);

    await getUserById(req, res);

    expect(UserService.prototype.getUserById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User found successfully",
      user,
    });
  });

  it("should return a 404 status if user not found", async () => {
    const errorMessage = "User not found";
    (UserService.prototype.getUserById as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

jest.mock("../../services/userService");

describe("getUserById", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { params: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return the user if found", async () => {
    const user = { id: "1", username: "User1" };
    (UserService.prototype.getUserById as jest.Mock).mockResolvedValue(user);

    await getUserById(req, res);

    expect(UserService.prototype.getUserById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User found successfully",
      user,
    });
  });

  it("should return a 404 status if user not found", async () => {
    const errorMessage = "User not found";
    (UserService.prototype.getUserById as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

jest.mock("../../services/userService");

describe("updateUser", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: { username: "UpdatedUser" },
      user: { id: "1", role: "student" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should update and return the updated user", async () => {
    const updatedUser = { id: "1", username: "UpdatedUser" };
    (UserService.prototype.updateUser as jest.Mock).mockResolvedValue(
      updatedUser
    );

    await updateUser(req, res);

    expect(UserService.prototype.updateUser).toHaveBeenCalledWith(
      "1",
      req.body,
      req
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User updated successfully",
      user: updatedUser,
    });
  });

  it("should return a 500 status on error", async () => {
    const errorMessage = "Internal server error";
    (UserService.prototype.updateUser as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

jest.mock("../../services/userService");

describe("deleteUser", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { params: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should delete the user and return a success message", async () => {
    (UserService.prototype.deleteUser as jest.Mock).mockResolvedValue(
      undefined
    );

    await deleteUser(req, res);

    expect(UserService.prototype.deleteUser).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
  });

  it("should return a 500 status on error", async () => {
    const errorMessage = "Internal server error";
    (UserService.prototype.deleteUser as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
