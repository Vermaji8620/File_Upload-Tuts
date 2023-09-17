const express = require("express");
const router = express.Router();

const { localFileUpload } = require("../controllers/fileupload");

router.post("/localFileUpload", localFileUpload);

module.exports = router;
