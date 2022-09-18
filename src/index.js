const express = require("express");
const ejs = require("ejs");
const path = require("path");

const port = "7000";
const app = express()

require("./db/conn");
app.set("view engine", "ejs");


const view_file_path = path.join(__dirname, 'views');
const css_path = path.join(__dirname, '/public');


app.set('views', view_file_path);          
app.use(express.static(css_path));

const student_router = require("./routers/student");
app.use(express.urlencoded({
    extended: true
}))

app.use(student_router);


app.listen(port, () => {
    console.log(`Local host run on port no ${port}`);
})