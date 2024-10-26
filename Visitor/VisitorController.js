const visitorModel = require('./VisitorModel')
const { httpErrors, httpSuccess } = require("../constents")

class VisitorController {
  async createvisitor(req, res) {
    try {
      const { visitorName, visitorPhone, societyId, unitId, date } = req.body

      if (!visitorName || !visitorPhone || !societyId || !unitId || !date) throw httpErrors[400]

      const result = await visitorModel.model.create({ ...req.body })
      if (!result) throw httpErrors[400]

      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {

    }
  }
}