const { uploadMedia, httpSuccess, httpErrors } = require("../constents");
const memberModel = require("./MemberModel");
const randomstring = require("randomstring");
const sendEmail = require("../mailconfig/Nodemailer");
const bcrypt = require("bcrypt");
const userModel = require("../Users/UserModel");

class MemberController {
  async createMember(req, res) {
    try {
      let { residentStatus, unitStatus, fullName, email, phoneNumber, age, wing, unit, familyMember, vehicle, OwnerInfo } = req.body;
      let { profileImage, aadharFront, aadharBack, veraBill, agreement } = req.files;
      unitStatus = "Occupied";
      // just for testing
      (residentStatus = "Owner"),
        (OwnerInfo = {
          fullName: "jnsdlkjnjsndkjansdf",
          phoneNumber: 1234598760,
          address: "14 kajsdkjfkj asnd kjasnkjfjs kjnakjdfja knbkjnawnkf b",
        });
      //

      if (!residentStatus || !unitStatus || !fullName || !email || !phoneNumber || !age || !wing || !unit || !profileImage || !aadharFront || !aadharBack || !veraBill || !agreement || !familyMember || !vehicle) throw httpErrors[400];
      if (residentStatus === "Tenant" && !OwnerInfo) throw httpErrors[400];
      familyMember = JSON.parse(familyMember);
      vehicle = JSON.parse(vehicle);
      phoneNumber = Number(phoneNumber);
      age = Number(age);
      familyMember = familyMember.map((member) => ({
        ...member,
        age: Number(member.age),
        phoneNumber: Number(member.phoneNumber),
      }));
      let password = randomstring.generate({ length: 8, charset: "alphabetic" });
      const encryptedPass = bcrypt.hashSync(password, 5);
      if (!encryptedPass) throw httpErrors[500];

      const user = await userModel.model.create({ fullName, email, password: encryptedPass, phoneNumber, role: "Member" })
      if (!user) throw httpErrors[500]

      profileImage = profileImage[0].path;
      aadharFront = aadharFront[0].path;
      aadharBack = aadharBack[0].path;
      veraBill = veraBill[0].path;
      agreement = agreement[0].path;

      const text = `Dear ${fullName},

             We have generated a password for your account. Please use the following credentials to log in:
                 **Password**: ${password}

       For your security, we recommend changing your password once you log in. If you didn’t request this password, please contact our support team immediately.

       Best regards,
       Society-management-Team`;
      const subject = `Login Crediantial For Dashstack`;

      sendEmail({ to: email, subject, text });

      let result;
      const data = {
        userId: user._id,
        residentStatus,
        unitStatus,
        age,
        wing,
        unit,
        familyMember,
        vehicle,
        profileImage,
        aadharFront,
        aadharBack,
        veraBill,
        agreement,
        societyId: "671ac29415a25bbaedeb52ca"
      };
      if (residentStatus === "Tenant") {
        result = await memberModel.model.create({ ...data, OwnerInfo: OwnerInfo });
        if (!result) throw httpErrors[500];
      } else {
        result = await memberModel.model.create({ ...data });
        if (!result) throw httpErrors[500];
      }
      return res.status(200).send({ message: httpSuccess });
    } catch (error) {
      console.log(error);
      throw httpErrors[500];
    }
  }

  async listMember(req, res) {
    try {
      const { societyId } = req.params
      const Member = await memberModel.model.find({ societyId: societyId }).populate([{ path: "userId" }, { path: "wing" }, { path: "unit" }])
      if (!Member) throw httpErrors[500];
      return res.status(200).send({ message: httpSuccess, data: Member });
    } catch (error) {
      console.log(error);
      throw httpErrors[500];
    }
  }

  async listMemberByWing(req, res) {
    try {
      const { wingId } = req.params
      const Member = await memberModel.model.find({ wing: wingId }).populate([{ path: "userId" }, { path: "wing" }, { path: "unit" }])
      if (!Member) throw httpErrors[500];
      return res.status(200).send({ message: httpSuccess, data: Member });
    } catch (error) {
      console.log(error);
      throw httpErrors[500];
    }
  }

  async getMemberById(req, res) {
    try {
      const { MemberId } = req.params
      const Member = await memberModel.model.findOne({ _id: MemberId }).populate([{ path: "userId" }, { path: "wing" }, { path: "unit" }])
      if (!Member) throw httpErrors[500];
      return res.status(200).send({ message: httpSuccess, data: Member });
    } catch (error) {
      console.log(error);
      throw httpErrors[500];
    }
  }

  async updateMember(req, res) {
    try {
      let { residentStatus, unitStatus, fullName, email, phoneNumber, age, wing, unit, familyMember, vehicle, OwnerInfo, memberId } = req.body;
      let { profileImage, aadharFront, aadharBack, veraBill, agreement } = req.files;
      unitStatus = "Occupied";
      // just for testing
      (residentStatus = "Owner"),
        (OwnerInfo = {
          fullName: "jnsdlkjnjsndkjansdf",
          phoneNumber: 1234598760,
          address: "14 kajsdkjfkj asnd kjasnkjfjs kjnakjdfja knbkjnawnkf b",
        });
      //

      if (!memberId || !residentStatus || !unitStatus || !fullName || !email || !phoneNumber || !age || !wing || !unit || !familyMember || !vehicle) throw httpErrors[400];
      if (residentStatus === "Tenant" && !OwnerInfo) throw httpErrors[400];
      familyMember = JSON.parse(familyMember);
      vehicle = JSON.parse(vehicle);
      phoneNumber = Number(phoneNumber);
      age = Number(age);
      familyMember = familyMember.map((member) => ({
        ...member,
        age: Number(member.age),
        phoneNumber: Number(member.phoneNumber),
      }));
      const Memeber = await memberModel.model.findOne({ _id: memberId })
      const user = await userModel.model.findOneAndUpdate({ _id: Memeber.userId }, { fullName, email, phoneNumber, role: "Member" }, { new: true })
      if (!user) throw httpErrors[500]
      profileImage = profileImage[0].path;
      aadharFront = aadharFront[0].path;
      aadharBack = aadharBack[0].path;
      veraBill = veraBill[0].path;
      agreement = agreement[0].path;

      const text = `Dear ${fullName},

             We have generated a password for your account. Please use the following credentials to log in:
                 **Password**: ${password}

       For your security, we recommend changing your password once you log in. If you didn’t request this password, please contact our support team immediately.

       Best regards,
       Society-management-Team`;
      const subject = `Login Crediantial For Dashstack`;

      sendEmail({ to: email, subject, text });

      let result;
      const data = {
        userId: user._id,
        residentStatus,
        unitStatus,
        age,
        wing,
        unit,
        familyMember,
        vehicle,
        profileImage,
        aadharFront,
        aadharBack,
        veraBill,
        agreement,
      };
      if (residentStatus === "Tenant") {
        result = await memberModel.model.create({ ...data, OwnerInfo: OwnerInfo });
        if (!result) throw httpErrors[500];
      } else {
        result = await memberModel.model.create({ ...data });
        if (!result) throw httpErrors[500];
      }
      return res.status(200).send({ message: httpSuccess });
    } catch (error) {
      console.log(error);
      throw httpErrors[500];
    }
  }
}

const memberController = new MemberController();

module.exports = memberController;
