import request from "supertest";
import express from "express";
import { getAllUsers } from "../../controllers/user";
import UserService from "../../services/userService";

const app = express();
app.get("/api/v1/users", getAllUsers);

describe("GET /api/v1/users", () => {
  let mockGetAllUsers: jest.SpyInstance;

  beforeEach(() => {
    mockGetAllUsers = jest.spyOn(UserService.prototype, 'getAllUsers');
  });

  afterEach(() => {
    mockGetAllUsers.mockRestore();
  });

  it("should return 200 and a list of users", async () => {
    const mockUsers = [
      { id: "1", name: "User One" },
      { id: "2", name: "User Two" },
    ];

    mockGetAllUsers.mockResolvedValue(mockUsers);

    const res = await request(app).get("/api/v1/users?limit=2&offset=0");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Users retrieved successfully");
    expect(res.body.users).toEqual(mockUsers);
  });

  it("should use default limit and offset if not provided", async () => {
    const mockUsers = [
      { id: "1", name: "User One" },
      { id: "2", name: "User Two" },
    ];

    mockGetAllUsers.mockResolvedValue(mockUsers);

    const res = await request(app).get("/api/v1/users");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Users retrieved successfully");
    expect(res.body.users).toEqual(mockUsers);
    expect(mockGetAllUsers).toHaveBeenCalledWith(10, 0);
  });

  it("should return 500 if an error occurs", async () => {
    mockGetAllUsers.mockRejectedValue(
      new Error("Internal server error")
    );

    const res = await request(app).get("/api/v1/users");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });
});
