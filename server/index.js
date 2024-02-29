const express  = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors")
// router imports
const authRouter = require("./routers/auth");
const pdfRouter = require("./routers/pdf");


// middlewares
app.use(express.json());
app.use(cors());
app.use("/api/pdf/pdfFiles",express.static("pdfFiles"));

app.use("/get",()=>{
    return res.json({count:400});
})
//routes
app.use("/api/auth",authRouter);
app.use("/api/pdf",pdfRouter);

mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("DB Connected..."))
    .catch((error)=>console.log(error,"DB CONNECTION ERROR"));

app.listen(process.env.PORT,()=>{
    console.log("server is running...",process.env.PORT);
});
