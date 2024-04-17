const authorization = async (req, res, next) => {
  try {
    // console.log(req.user, "<<<");
    if (req.user.status === "Premium") {
      next();
    } else {
      throw { name: "ForbiddenStatus" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authorization };
