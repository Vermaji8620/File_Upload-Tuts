const File = require("../models/file");

// localFileUpload -> handler function

exports.localFileUpload = async (req, res) => {
  try {
    let file = req.files.file;
    // console.log("FHHF         ", file);

    let path =
      __dirname + "/files/" + Date.now() + "." + file.name.split(".")[1];
    // console.log("PAth---> ", path);

    await file.mv(path);

    res.status(200).json({
      success: true,
      message: "Local  file is uploaded successfully",
    });
  } catch (erro) {
    return res.status(401).json({
      success: false,
      error: erro.message,
    });
  }
};
