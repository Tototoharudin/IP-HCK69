const { User, Favorite, Anime, Score, Order } = require("../models/index");
const midtransClient = require("midtrans-client");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { Op, where } = require("sequelize");

class Controller {
  static async getAnime(req, res, next) {
    try {
      let { search, page } = req.query;
      let option = { order: [["id", "ASC"]] };

      if (search) {
        option.where = {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      // console.log(req.query, "<<<");
      let limit = 6;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = +page.size;
          option.limit = limit;
        }

        if (page.number) {
          pageNumber = +page.number;
          option.offset = limit * (pageNumber - 1);
          option.limit = limit;
        }
      } else {
        option.limit = limit;
        option.offset = limit * (pageNumber - 1);
      }

      const { count, rows } = await Anime.findAndCountAll(option);
      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAnimeById(req, res, next) {
    try {
      const { id } = req.params;
      // console.log(id, "<<<<");
      const anime = await Anime.findOne({
        where: {
          id: id,
        },
        include: {
          model: Score,
        },
      });
      // console.log(anime , "<<<<<<");
      if (!id) {
        throw { name: "NotFound" };
      }
      if (!anime) {
        throw { name: "NotFound" };
      }

      res.status(200).json(anime);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getFav(req, res, next) {
    try {
      const { id } = req.user;
      const favorite = await Favorite.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: Anime,
          include: {
            model: Score,
          },
        },
      });

      res.status(200).json(favorite);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addFav(req, res, next) {
    try {
      const { id } = req.user;
      const { animeId } = req.params;

      const findData = await Anime.findByPk(animeId);
      if (!findData) {
        throw { name: "NotFound" };
      }

      const dataFav = await Favorite.findOne({
        where: {
          UserId: id,
          AnimeId: animeId,
        },
      });

      if (dataFav) {
        throw { name: "AnimeAdded" };
      }

      const newFav = await Favorite.create({
        UserId: id,
        AnimeId: animeId,
      });

      //   console.log(newFav, ">>>>>>>>");
      res.status(201).json(`${findData.title} Added to Favorites`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editFav(req, res, next) {
    try {
      const { ScoreId, status } = req.body;
      const { animeId } = req.params;

      const anime = await Anime.findByPk(animeId);
      const score = await Score.findByPk(ScoreId);

      if (!anime) {
        throw { name: "NotFound" };
      }

      if (!score) {
        throw { name: "NotFound" };
      }

      const updated = await anime.update({
        ScoreId,
        status,
      });

      res.status(200).json(updated);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteFav(req, res, next) {
    try {
      const { animeId } = req.params;
      console.log(animeId, "<<<<<<");

      const findFav = await Favorite.findByPk(animeId);
      if (!findFav) {
        throw {
          name: "NotFoundId",
          animeId,
        };
      }

      await findFav.destroy();

      res
        .status(200)
        .json({ message: `Successfully Removed From My Favorite` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getScore(req, res, next) {
    try {
      // console.log(Type, "<<<<");
      const score = await Score.findAll();
      res.status(200).json(score);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async paymentMidtrans(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-WBSSQfYYyFMSlm8HPMnaJv0D", //clear
      });

      let OrderId = Math.random().toString();
      let amount = 200_000;

      let parameter = {
        transaction_details: {
          order_id: OrderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: req.user.username,
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      await Order.create({
        OrderId,
        amount,
        UserId: req.user.id,
      });

      console.log(transactionToken, OrderId, ">>>>>>>>>>>");
      res
        .status(200)
        .json({ message: "Order Created", transactionToken, OrderId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async upgradeAccount(req, res, next) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });
    console.log("KKKKK<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

    try {
      const { OrderId } = req.body;

      const order = await Order.findOne({
        where: {
          OrderId,
        },
      });

      if (!order) throw { name: "OrderNotFound" };

      if (req.user.status === "Premium") {
        return res.status(400).json({ message: "You Are Already Premium" });
      }

      if (order.status === "Paid") {
        return res.status(400).json({ message: "Order Already Paid" });
      }

      const serverKey = "SB-Mid-server-WBSSQfYYyFMSlm8HPMnaJv0D";
      const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");
      const { data } = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${OrderId}/status`,
        {
          headers: {
            Authorization: `Basic ${base64ServerKey}`,
          },
        }
      );
      console.log(data, "<<< MIDTRANS");
      if (
        data.transaction_status === "settlement" &&
        data.status_code === "200"
      ) {
        await req.user.update({ status: "Premium" });
        await order.update({ status: "Paid", paidDate: new Date() });

        async function main() {
          const mailOptions = await transporter.sendMail({
            from: "tohatoto052@gmail.com",
            to: req.user.email,
            subject: "Payment Notification",
            text: `Dear ${req.user.username},\n\nYour payment has been successfully processed. Thank you for your purchase!\n\nEnjoy Your Premium Wibulovers Account !! 🤩😘😍`,
          });
          console.log("Message sent: %s", mailOptions.messageId);
        }

        main().catch(console.error);

        console.log(
          "<<<<<<<<<<<<<<<<<<<<<<<<<<SUCESSSSSSSSSSSSSSSSSSSSS<<<<<<<<<<<<<<<<<<"
        );

        res.status(200).json({ message: "Upgrade Success" });
      } else {
        res
          .status(400)
          .json({ message: "Upgrade Failed, Please Contact Admin" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // static async getUserByEmail(req, res, next) {
  //   try {
  //     const getUser = await User.findOne({
  //       where: {
  //         email: req.body.email,
  //       },
  //     });
  //     return res.status(200).json(getUser);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}

module.exports = Controller;
