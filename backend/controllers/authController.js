const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../Utils/sendEmail");
const Users = require("../models/users");
const Tokens = require("../models/tokens");

const cookieOptions = { httpOnly: true, secure: true, sameSite: "none" };

const signToken = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const sendSession = (res, user) =>
  res.status(200).cookie("access_token", signToken(user), cookieOptions).json({ message: Users.toPublic(user) });

module.exports.signup = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await Users.create({
      userName,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });

    const token = crypto.randomBytes(32).toString("hex");
    await Tokens.create(user.id, token);

    const text = `Kindly click on the link below to verify your email for Mid Orchard\nThis is a one time link\nYou will be redirected to the signin page from this link\nThank You\n\n${process.env.BASE_URL}api/user/${user.id}/verify/${token}`;
    await sendEmail(user.email, "Verify Email for Mid Orchard", text);

    res.status(201).json("An Email sent to your account for verification");
  } catch (e) {
    if (e.code === "23505") {
      if (e.constraint === "users_email_key") return res.status(400).send({ message: "Email is already in use" });
      if (e.constraint === "users_user_name_key") return res.status(400).send({ message: "Username is already in use" });
    }
    res.status(400).json({ message: e.message });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await Users.findByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.verified) return res.status(400).send("Email not verified");

    sendSession(res, user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.googleSignIn = async (req, res) => {
  const { email, name, googlePhotoURL } = req.body;

  try {
    let user = await Users.findByEmail(email);

    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(-8);
      user = await Users.create({
        userName: name.toLowerCase().split(" ").join("") + Math.floor(Math.random() * 1000),
        email,
        password: bcrypt.hashSync(generatedPassword, bcrypt.genSaltSync(10)),
        profilePicture: googlePhotoURL,
        verified: true,
      });
    }

    sendSession(res, user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.signout = (req, res) => {
  res.clearCookie("access_token").json({ message: "Signout success" });
};
