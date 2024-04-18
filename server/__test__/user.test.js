const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

beforeAll(async () => {
  try {
    let data = await User.create({
      username: "user1",
      email: "user1@mail.com",
      password: "user1",
      status: "Free",
    });

    token = signToken({ id: data.id });
  } catch (error) {
    console.log(error);
  }
});

describe("POST /register", () => {
  //Berhasil register
  test("register on success", async () => {
    const dataDummy = {
      username: "user1",
      email: "user1@mail.com",
      password: "user1",
      status: "Free",
    };

    const res = await request(app).post("/register").send(dataDummy);

    //   console.log(res.body, "<<<<<<<<");
    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "User created");
  });

  //
  afterAll(async () => {
    try {
      await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    } catch (error) {
      console.log(error);
    }
  });
});
