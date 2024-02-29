const  multer = require("multer");


// custome storage
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        console.log("filee",file)
        cb(null,"pdfFiles")
    },
    filename:function (req,file,cb){
        const uniqueSuffix = Date.now();
        const {name} = req.body
        console.log("name in file",file.originalname)
        let filename= file.originalname
        if (!filename.endsWith('.pdf')) {  
            console.log("rannn") 
            filename=filename + '.pdf';
        }
        console.log("filename",filename)
        return cb(null , uniqueSuffix.toString() + filename)
      
        

    }
});

const uploadPdf = multer({storage:storage});

module.exports = uploadPdf