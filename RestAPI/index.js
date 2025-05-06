const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")
const userRoute =require("./routes/users.js")
const authRoute =require("./routes/auth.js")
const postRoute =require("./routes/post.js")
const multer=require("multer")
const app=express()
const path=require("path")
dotenv.config()
// mongoDB connection 
mongoose.connect("mongodb+srv://anjalinegipkl:UC77qN1SPDBVVPgQ@cluster0.1chklvw.mongodb.net/facediaryDB", { useNewUrlParser: true });

// middleware
// if you use this images path dont make req instead just go to my personal directory defined below
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,"./public/images")
    },
    filename:(req,file,cb)=>{
        console.log("from index")
       const name=file.originalname.replaceAll(' ', '');
       console.log(name)
        return  cb(null,name)
    }
})

const upload=multer({storage:storage})
// creating a post request for uploading a single file . In "upload" we are using a package called multer in which we define "storage " ie where will the file be stored as well as what should we name that file 
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try {
        console.log(req.body.name)
        return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)
app.listen(8080,()=>{
    console.log("Backend Server is running at port 8080")
})