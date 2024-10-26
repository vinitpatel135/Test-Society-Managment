const { default: mongoose } = require("mongoose");

class VisitorModel {
  constructor() {
    this.schema = new mongoose.Schema({
      visitorName: { type: String, required: true },
      visitorPhone: { type: Number, required: true },
      societyId: { type: mongoose.Types.ObjectId, ref: "tbl_societies", required: true },
      unitId: { type: mongoose.Types.ObjectId, ref: "tbl_units", required: true },
      date: { type: Date, required: true }
    }, {
      timestamps: true
    })


    this.emergencyschema = new mongoose.Schema({
      alertType: { type: String, required: true },
      description: { type: String, required: true }
    }, { timestamps: true })


    this.model = mongoose.model("tbl_visitors", this.schema)
    this.emergencymodel = mongoose.model("tbl_emergencies", this.emergencyschema)

  }
}

const visitorModel = new VisitorModel()

module.exports = visitorModel