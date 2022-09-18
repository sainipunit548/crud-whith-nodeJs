const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: Number,
        required: true,
        // maxlegth:10
    },
    address: {
        type: String,
        required:true
    },
    image: {
        type: Array,
        // required:true
    }
})

const Student_Details = new mongoose.model("Student_Detail", studentSchema);

module.exports = Student_Details;