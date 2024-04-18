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

  //email tidak diberikan / tidak di infut
  test("throw error email null", async () => {
    const dataDummy = {
      username: "user1",
      password: "user1",
      status: "Free",
    };
    const res = await request(app).post("/register").send(dataDummy);
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email Can't be empty");
  });

  //Password tidak diberikan / tidak diinput
  test("throw error password null", async () => {
    const dataDummy = {
      username: "user1",
      email: "user1@mail.com",
      status: "Free",
    };

    const res = await request(app).post("/register").send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Password Can't be empty");
  });

  //Email diberikan string kosong
  test("throw error email empty", async () => {
    const dataDummy = {
      username: "user1",
      email: "",
      password: "user1",
      status: "Free",
    };

    const res = await request(app).post("/register").send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email Can't be empty");
  });
  //Password diberikan string kosong
  test("throw error password empty", async () => {
    const dataDummy = {
      username: "user1",
      email: "user1@mail.com",
      password: "",
      status: "Free",
    };

    const res = await request(app).post("/register").send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Password Can't be empty");
  });

  //Email sudah terdaftar
  test("throw email already done", async () => {
    const dataDummy = {
      username: "user1",
      email: "user1@mail.com",
      password: "user1",
      status: "Free",
    };

    const res = await request(app).post("/register").send(dataDummy);

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email has been registered");
  });

  test("throw email is not format email", async () => {
    const dataDummy = {
      username: "user1",
      email: "user1il.com",
      password: "user1",
      status: "Free",
    };

    const res = await request(app).post("/register").send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email Must Be Email Format");
  });

  describe("POST /login", () => {
    //Berhasil login
    test("success login", async () => {
      const dataDummy = {
        email: "user1@mail.com",
        password: "user1",
      };

      const res = await request(app).post("/login").send(dataDummy);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", "Success Login");
    });
    //Email tidak diberikan / tidak diinput
    test("throw error email null", async () => {
      const dataDummy = {
        password: "user1",
      };

      const res = await request(app).post("/login").send(dataDummy);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", "Email is required");
    });
    //
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
