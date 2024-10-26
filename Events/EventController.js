const { httpErrors, httpSuccess } = require("../constents")
const eventDetilsModel = require("../EventDetails/EventDetailsModel")
const eventModel = require("./EventModel")

class EventController {
  async createEvent(req, res) {
    try {
      const { societyId, title, date, dueDate, amount, description } = req.body
      if (!societyId || !title || !date || !dueDate || !amount || !description) throw httpErrors[400]
      const result = await eventModel.model.create({ ...req.body })
      const societyMembers = await eventModel.model.find({ societyId: societyId })
      await Promise.all(
        societyMembers.map(async (data) => {
          // Create maintenance details for each member
          const eventDetails = await eventDetilsModel.model.create({
            societyId,
            eventId: result._id,
            memberId: data._id,
            amount: amount,
            paymentDate: result.dueDate
          });
          if (!eventDetails) {
            throw new Error(`Failed to create maintenance details for member ID: ${data._id}`);
          }
        })
      );
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }

  async listEvent(req, res) {
    try {
      const { societyId } = req.params
      const result = await eventModel.model.find({ societyId: societyId })
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }

  async getEventById(req, res) {
    try {
      const { eventId } = req.params
      const result = await eventModel.model.find({ _id: eventId })
      if (!result) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess, data: result })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }

  async updateEvent(req, res) {
    try {
      const { eventId, societyId, title, date, dueDate, amount, description } = req.body
      if (!eventId || !societyId || !title || !date || !dueDate || !amount || !description) throw httpErrors[400]
      const result = await eventModel.model.updateOne({ _id: eventId }, { societyId: societyId, title: title, data: date, dueDate: dueDate, amount: amount, description: description })
      if (!result || result.modifiedCount <= 0) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }
  async deleteEvent(req, res) {
    try {
      const { eventId } = req.params
      const result = await eventModel.model.deleteOne({ _id: eventId })
      if (!result || result.deletedCount <= 0) throw httpErrors[500]
      return res.status(200).send({ message: httpSuccess })
    } catch (error) {
      console.log(error)
      throw httpErrors[500]
    }
  }
}

const eventController = new EventController()
module.exports = eventController