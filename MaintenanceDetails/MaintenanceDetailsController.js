const { httpErrors } = require("../constents")
const maintenanceDetailsModel = require('./MaintenanceDetailsModel.js')

class MaintenanceDetailsController {
  async createMaintenanceDetails(req, res) {
    try {
      const { maintenanceId, memberId, amount, penaltyAmount, paymentStatus, paymentMethod, paymentDate, societyId } = req.body
      if (!maintenanceId || !memberId || !amount || !penaltyAmount || !paymentStatus || !paymentMethod || !paymentDate || !societyId) throw httpErrors[400]
      const result = await maintenanceDetailsModel.model.create({ ...req.body })
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }

  async getUserMaintenanceDetails(req, res) {
    try {
      const { societyId } = req.params
      const result = await maintenanceDetailsModel.model.find({ societyId: societyId }).populate([
        { path: "maintenanceId" },
        {
          path: "memberId", populate: [
            { path: "userId" },
            { path: "wing" },
            { path: "unit" },
          ]
        },
      ])
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }

  async updateMaintenanceDetails(req, res) {
    try {
      const { maintenanceId, memberId, amount, penaltyAmount, paymentMethod, paymentDate, societyId } = req.body
      if (!maintenanceId || !memberId || !amount || !penaltyAmount || !paymentMethod || !paymentDate || !societyId) throw httpErrors[400]
      const result = await maintenanceDetailsModel.model.updateOne({
        societyId: societyId,
        maintenanceId: maintenanceId,
        memberId: memberId
      }, {
        paymentMethod: paymentMethod,
        paymentStatus: "Done",
        paymentDate: paymentDate,
        amount: amount,
        penaltyAmount: penaltyAmount
      })
      if (!result && result.updatedCount < 0) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }

}

const maintenanceDetailsController = new MaintenanceDetailsController()
module.exports = maintenanceDetailsController