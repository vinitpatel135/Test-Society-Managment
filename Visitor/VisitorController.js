const visitorModel = require('./VisitorModel')
const { httpErrors, httpSuccess } = require("../constents")

class VisitorController {
  async createvisitor(req, res) {
    try {
      const { visitorName, visitorPhone, societyId, unitId, date, securityId } = req.body

      if (!visitorName || !visitorPhone || !societyId || !unitId || !date || !securityId) throw httpErrors[400]

      const result = await visitorModel.model.create({ ...req.body })
      if (!result) throw httpErrors[400]

      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error);
      throw httpErrors[500]
    }
  }

  async getvisitor(req, res) {
    try {
      const result = await visitorModel.model.find().populate([{ path: 'societyId' }, { path: 'unitId' }, { path: 'securityId' }])
      if (!result) throw httpErrors[400]

      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error);
      throw httpErrors[500]
    }
  }

  async createEmergencyAnnouncement(req, res) {
    try {
      const { societyId, securityId, alertType, description } = req.body
      if (!societyId || !securityId || !alertType || !description) throw httpErrors[400]
      const result = await visitorModel.emergencymodel.create({ ...req.body })
      if (!result) throw httpErrors[400]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error);
      throw httpErrors[500]
    }
  }

  async getEmergencyAnnouncement(req, res) {
    try {
      const result = await visitorModel.emergencymodel.find().populate([{ path: 'societyId' }, { path: 'securityId' }])
      if (!result) throw httpErrors[400]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error);
      throw httpErrors[500]
    }
  }
}


const visitorController = new VisitorController()

module.exports = visitorController