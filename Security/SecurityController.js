const randomstring = require("randomstring");
const securityModel = require("../Security/SecurityModel.js")
const sendEmail = require("../mailconfig/Nodemailer");
const bcrypt = require("bcrypt");
const { uploadMedia, httpSuccess, httpErrors } = require("../constents");
const userModel = require("../Users/UserModel.js");

class SecurityController {
  async createSecurity(req, res) {
    try {
      const { fullName, email, phoneNumber, gender, shift, joiningDate, shiftTime, societyId } = req.body;
      const { profileImage, adharCardImage } = req.files;

      if (!societyId || !fullName || !email || !phoneNumber || !gender || !shift || !joiningDate || !shiftTime || !profileImage || !adharCardImage)
        throw httpErrors[400];

      let password = randomstring.generate({ length: 8, charset: "alphabetic" });
      const encryptedPass = bcrypt.hashSync(password, 5);
      if (!encryptedPass) throw httpErrors[500];
      const user = await userModel.model.create({ fullName, email, password: encryptedPass, phoneNumber, role: "Security" })
      if (!user) throw httpErrors[500]

      profileImage = profileImage[0].path;
      adharCardImage = adharCardImage[0].path;

      const text = `Dear ${fullName},

      We have generated a password for your account. Please use the following credentials to log in:
          **Password**: ${password}

For your security, we recommend changing your password once you log in. If you didn’t request this password, please contact our support team immediately.

Best regards,
Society-management-Team`;
      const subject = `Login Crediantial For Dashstack`;

      sendEmail({ to: email, subject, text });

      let data = {
        userId: user._id,
        gender,
        shift,
        joiningDate,
        shiftTime,
        societyId,
        profileImage,
        adharCardImage
      }
      const result = await securityModel.model.create({ ...data })
      if (!result) throw httpErrors[400]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error);
      throw httpErrors[500];
    }
  }

  async getSecurity(req, res) {
    try {
      const result = await securityModel.model.find().populate([{ path: 'societyId' }, { path: 'userId' }])
      if (!result) throw httpErrors[400]

      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }

  async deleteSecurity(req, res) {
    try {
      const { id } = req.params
      if (!id) throw httpErrors[400]
      const result = await securityModel.model.deleteOne({ _id: id })
      if (!result || !result.deletedCount <= 0) throw httpErrors[400]
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error);
      throw httpErrors[500]
    }
  }
}

const securityController = new SecurityController();
module.exports = securityController;
