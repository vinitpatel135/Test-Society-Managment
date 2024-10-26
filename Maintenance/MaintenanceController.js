const { httpErrors, httpSuccess } = require("../constents")
const maintenanceDetailsModel = require("../MaintenanceDetails/MaintenanceDetailsModel")
const memberModel = require("../Society Member/MemberModel")
const maintenanceModel = require("./MaintenanceModel")

class MaintenanceController {
  async createMaintenance(req, res) {
    try {
      let { maintenanceAmount, penaltyAmount, dueDate, dueDays, societyId } = req.body
      if (!maintenanceAmount || !penaltyAmount || !dueDate || !dueDays || !societyId) throw httpErrors[400]
      const result = await maintenanceModel.model.create({ ...req.body })
      if (!result) throw httpErrors[500]

      const penaltyDate = result.dueDate;
      penaltyDate.setDate(penaltyDate.getDate() + result.dueDays);
      // penaltyDate.setMinutes(penaltyDate.getMinutes() + 1);

      const societyMembers = await memberModel.model.find({ societyId: societyId })
      await Promise.all(
        societyMembers.map(async (data) => {
          // Create maintenance details for each member
          const maintenanceDetails = await maintenanceDetailsModel.model.create({
            societyId,
            maintenanceId: result._id,
            memberId: data._id,
            amount: maintenanceAmount,
            paymentDate: result.dueDate
          });
          if (!maintenanceDetails) {
            throw new Error(`Failed to create maintenance details for member ID: ${data._id}`);
          }
          // Schedule the penalty job after successful creation
          await maintenanceDetailsModel.schedulePenaltyJob(maintenanceDetails._id, penaltyDate, penaltyAmount);
        })
      );

      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }
  async maintenanceAmount(req, res) {
    try {
      const result = await maintenanceModel.model.find()
      let MaintenanceAmount
      for (let i = 0; i < result.length; i++) {
        MaintenanceAmount += result[i].maintenanceAmount
      }
      return res.status(200).send({ message: httpSuccess, data: MaintenanceAmount })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }
  async penaltyAmount(req, res) {
    try {
      const result = await maintenanceModel.model.find()
      let PenaltyAmount
      for (let i = 0; i < result.length; i++) {
        PenaltyAmount += result[i].penaltyAmount
      }
      return res.status(200).send({ message: httpSuccess, data: PenaltyAmount })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }
}

const maintenanceController = new MaintenanceController()
module.exports = maintenanceController