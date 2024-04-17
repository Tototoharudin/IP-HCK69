const { User } = require("../models/");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class ControllerAuth {
  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);
      // if(!req.body) throw
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PassRequired" };

      const user = await User.findOne({ where: { email: email } });
      if (!user) throw { name: "InvalidLogin" };

      const checkPass = comparePassword(password, user.password);
      if (!checkPass) throw { name: "InvalidLogin" };

      const payload = { id: user.id };
      const token = signToken(payload);
      const status = user.status;
      res.status(200).json({ message: "Success Login", token, user, status });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      console.log(googleToken, "<<<<< TOKENNNNNNN");
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          "107241747679-g6eki46lfoc146gtqofmhpmmm65i1dp1.apps.googleusercontent.com",
      });
      if (!ticket) throw { name: "InvalidLogin" };

      console.log(ticket, "<<<>>>> TIKET");
      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email,
          password: Math.random().toString(),
        },
      });
      const payload = { id: user.id };
      const token = signToken(payload);
      const status = user.status;
      res.status(200).json({
        message: `Success Logged in as ${email}`,
        token,
        status,
        name,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerAuth;
