const Users = require("../models/users");
const Tokens = require("../models/tokens");

module.exports.verifyEmail = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (!Number.isInteger(userId)) return res.status(400).send("Invalid link");

    const user = await Users.findById(userId);
    if (!user) return res.status(400).send("Invalid link");

    const token = await Tokens.find(userId, req.params.token);
    if (!token) return res.status(400).send("Invalid link");

    await Users.markVerified(userId);
    await Tokens.remove(userId);

    res.redirect(`${process.env.FRONTEND_URL}/signin/?verified=true&originalUrl=${req.query.originalUrl}`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
