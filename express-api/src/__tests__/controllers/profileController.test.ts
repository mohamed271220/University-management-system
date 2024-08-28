import request from "supertest";
import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../../controllers/profile";
import { ProfileService } from "../../services/profileService";
import Profile from "../../models/Profile";

jest.mock("../../services/profileService");

describe("getProfile", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { user: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return the profile if found", async () => {
    const profile = { id: "1", firstName: "First", lastName: "Last" };
    (ProfileService.prototype.getProfile as jest.Mock).mockResolvedValue(
      profile
    );

    await getProfile(req, res, next);

    expect(ProfileService.prototype.getProfile).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profile found successfully",
      profile,
    });
  });

  it("should return a 404 status if profile not found", async () => {
    const errorMessage = "Profile not found";
    (ProfileService.prototype.getProfile as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await getProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it("should return a 500 status if an error occurs", async () => {
    const errorMessage = "Internal server error";
    (ProfileService.prototype.getProfile as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await getProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe("createProfile", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { user: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should create and return the profile", async () => {
    const profile = { id: "1", firstName: "First", lastName: "Last" };
    (ProfileService.prototype.createProfile as jest.Mock).mockResolvedValue(
      profile
    );

    await createProfile(req, res, next);

    expect(ProfileService.prototype.createProfile).toHaveBeenCalledWith(
      "1",
      req.body
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profile created successfully",
      profile,
    });
  });

  it("should return a 400 status if profile already exists", async () => {
    const errorMessage = "Profile already exists";
    (ProfileService.prototype.createProfile as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await createProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it("should return a 400 status if missing required profile data", async () => {
    const errorMessage = "Missing required profile data";
    (ProfileService.prototype.createProfile as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await createProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it("should return a 500 status if an error occurs", async () => {
    const errorMessage = "Internal server error";
    (ProfileService.prototype.createProfile as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await createProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe("updateProfile", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { user: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should update and return the profile", async () => {
    const profile = { id: "1", firstName: "First", lastName: "Last" };
    (ProfileService.prototype.updateProfile as jest.Mock).mockResolvedValue(
      profile
    );

    await updateProfile(req, res, next);

    expect(ProfileService.prototype.updateProfile).toHaveBeenCalledWith(
      "1",
      req.body
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profile updated successfully",
      profile,
    });
  });

  it("should return a 500 status if an error occurs", async () => {
    const errorMessage = "Internal server error";
    (ProfileService.prototype.updateProfile as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await updateProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe("deleteProfile", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { user: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should delete the profile", async () => {
    await deleteProfile(req, res, next);

    expect(ProfileService.prototype.deleteProfile).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profile deleted successfully",
    });
  });

  it("should return a 401 status if unauthorized", async () => {
    req = { user: undefined };

    await deleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return a 500 status if an error occurs", async () => {
    const errorMessage = "Internal server error";
    (ProfileService.prototype.deleteProfile as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await deleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
