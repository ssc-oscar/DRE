const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 
    
// View Engine Setup 
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs") 
    
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
		cb(null, file.originalname)
    }
})
       
// Define the maximum size for uploading 
const maxSize = 1 * 1000 * 1000; 
    
var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    
}).single("file");        
  
app.get("/",function(req,res){ 
    res.render("frontend"); 
}) 
    
app.post("/uploadFile",function (req, res, next) { 
    upload(req,res,function(err) { 
        if(err) { 
   
            res.send(err) 
        } 
        else { 
            // SUCCESS
            res.send("Success, File uploaded!") 
        } 
    }) 
}) 
    

app.listen(8080,function(error) { 
    if(error) throw error 
        console.log("Server created Successfully on PORT 8080") 
}) 