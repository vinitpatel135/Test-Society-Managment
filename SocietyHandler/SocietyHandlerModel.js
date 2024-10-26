const { default: mongoose } = require("mongoose"); class SocietyHandlerModel {
  constructor() {
    this.schema = new mongoose.Schema(
      {
        userId: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_users" },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        selectSociety: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_societies" },
      },
      { timestamps: true }
    );

    this.model = mongoose.model("tbl_society_managers", this.schema);
  }
}

const societyHandlerModel = new SocietyHandlerModel();

module.exports = societyHandlerModel;
