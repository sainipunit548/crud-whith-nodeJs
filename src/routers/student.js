const express = require("express");
const path = require("path");
const router = new express.Router(); 
const multer = require('multer');
const Student = require("../models/student");
const image_path = path.join(__dirname, "../public/student_image");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, image_path)
    },
    filename: function (req, file, cb) {
        // console.log(file)
      cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
  })
 
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    res.render("create");
    
})

//For Insert Data
router.post("/insert_data" ,upload.array('image'),async (req, res) => {
    try {
        const all_image = req.files;
        const file = [];
        all_image.forEach(image => {
            file.push(image.filename)
        });
        req.body.image = file
        
        const user = new Student(req.body);
        await user.save();
        res.redirect("/show");
    } catch (err) {
        res.status(400).send(err);
    }
})



// For Show Data
 router.get("/show", async (req, res) => {
        try {
            const students = await Student.find();
            res.render("show",{students});
        } catch (err) {
            res.send(err);
        }
 })    
    


//  For Edit and Show
router.get("/edit_student/:id", async (req, res) => {
    try {
        const Find_Student = await Student.findById(req.params.id)
        res.render("edit", { Find_Student });
    } catch (err) {
        res.send(err);
     }
 })


 //for Update Student
router.post("/update_student/:id",upload.array('image'), async (req, res) => {
    try {
       
        if (req.files.length>0) {
            let newItem = [];
            req.files.forEach(image => {
                console.log(image);
                newItem.push(image.filename)
            })
            req.body.image = newItem;
        }
        // console.log("---------->",req.body);
        // console.log("---------->----------->",req.files);
        const _id = req.params.id;  
        const UpdateStudent = await Student.findByIdAndUpdate(_id, req.body);
        res.redirect("/show");
    } catch (err) {
        res.send(err);
    }
})


 //for Delete Data
 router.get("/delete_student/:id", async (req, res) => {
     try {
         const deletestudent = await Student.findByIdAndDelete(req.params.id)
         if (!req.params.id) {
             res.send("Delete Id Not Found")
         }
         res.redirect("/show");
    } catch (err) {
        res.send(err);
    }
 })  

// For particular Image Delete

router.get("/delete_image/:id/:key", async (req, res) => {
    try {
        const data = await Student.findById(req.params.id)
        for (const [index, value] of data.image.entries()) {
            const image_new_path = path.join(image_path, value);  //create image path for delete image from folder
            if (index == req.params.key) {
                data.image.splice(index, 1);
                fs.unlink(image_new_path, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("File SuccessFul Deleted"); 
                })
            }
          }
           await data.save();
          res.redirect("/show"); 
    } catch (err) {
        res.send(err);
    }
})


module.exports = router;