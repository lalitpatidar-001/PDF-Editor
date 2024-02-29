const { uploadNewPdf, getAllPdfs, getPdf } = require("../controllers/pdf");
const uploadPdf = require("../utils/multer");

const router = require("express").Router();

router.post("/upload/:id",uploadPdf.single("pdfFile"),uploadNewPdf);
router.get("/:id",getPdf);
router.get("/pdfs/:id",getAllPdfs);

module.exports = router