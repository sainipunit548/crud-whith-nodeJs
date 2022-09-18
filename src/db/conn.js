const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Student")
    .then(() => {
        console.log("Connection is Successfully");
    }).catch((err) => {
        console.log(`Connection is Failed ${err}`);
})