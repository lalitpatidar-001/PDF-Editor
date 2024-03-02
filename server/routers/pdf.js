const { uploadNewPdf, getAllPdfs, getPdf, removePdf } = require("../controllers/pdf");
const uploadPdf = require("../utils/multer");

const router = require("express").Router();

router.post("/upload/:id",uploadPdf.single("pdfFile"),uploadNewPdf);
router.get("/:id",getPdf);
router.get("/pdfs/:id",getAllPdfs);
router.delete("/:id",removePdf);

module.exports = router