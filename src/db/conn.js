const mongoose = require("mongoose");

const url = process.env.user ? `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.3jrrbql.mongodb.net/?retryWrites=true&w=majority` : "mongodb://localhost:27017/Student"

mongoose.connect(url)
    .then(() => {
        console.log("Connection is Successfully");
    }).catch((err) => {
        console.log(`Connection is Failed ${err}`);
})