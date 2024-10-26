const { httpErrors, httpSuccess } = require("../constents");
const complaintModel = require("./ComplaintModel");

class ComplaintController {
  async createComplaint(req, res) {
    try {
      const { memberId, complainerName, complaintName, discription, wingId, unitId, priorityStatus, complaintype } = req.body
      if (!memberId || !complainerName || !complaintName || !discription || !wingId || !unitId || !priorityStatus || !complaintype) throw httpErrors[400]
      const result = await complaintModel.model.create({ ...req.body })
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error);
      throw httpErrors[500]
    }
  }

  async listAllComplain(req, res) {
    try {
      const { societyId } = req.params
      const result = await complaintModel.model.find({ societyId: societyId })
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
    }
  }
  async listComplain(req, res) {
    try {
      const { societyId } = req.params
      const result = await complaintModel.model.find({ societyId: societyId, complaintype: "Complain" })
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
    }
  }
  async listRequest(req, res) {
    try {
      const { societyId } = req.params
      const result = await complaintModel.model.find({ societyId: societyId, complaintype: "Request" })
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
    }
  }

  async getComplainById(req, res) {
    try {
      const { memeberId } = req.params
      const result = await complaintModel.model.findOne({ memeberId: memeberId })
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
    }
  }
}

const complaintController = new ComplaintController()
module.exports = complaintController