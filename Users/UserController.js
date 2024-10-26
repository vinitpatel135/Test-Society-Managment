const { httpErrors, httpSuccess } = require("../constents")
const userModel = require("./UserModel")
const bcrypt = require("bcrypt")

class UserController {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw httpErrors[400]
      let user
      if (email.length === 10 && typeof (Number(email) === "Number")) {
        const phone = Number(email)
        user = await userModel.model.findOne({ phoneNumber: phone })
        if (!user) throw httpErrors[500]
      } else {
        user = await userModel.model.findOne({ email: email })
        if (!user) throw httpErrors[500]
      }
      if (!bcrypt.compareSync(password, user.password)) return res.status(500).send({ message: "Invalid Password" })
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "30d" })
      if (!token) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, token })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }
  async authenticationPermission(req, res) {
    try {
      const { id, password } = req.body // id : Society Chairman Id
      const result = await userModel.model.findOne({ _id: id })
      if (!result) throw httpErrors[500]
      if (!bcrypt.compareSync(password, result.password)) return res.status(401).send({ message: "Invalid Password" })
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }
}

const userController = new UserController();
module.exports = userController;
