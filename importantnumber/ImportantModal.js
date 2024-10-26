const mongoose = require("mongoose")

class ImportantModal {
    constructor(){
        this.schema = new mongoose.Schema({
            fullName : { type: String , required : true},
            phoneNumber : { type: String , required : true},
            work : { type: String , required : true}
        },{timestamps:true})

        this.model = mongoose.model('tbl_workernumbers' , this.schema)
    }
}

const importantModal = new ImportantModal()
module.exports = importantModal