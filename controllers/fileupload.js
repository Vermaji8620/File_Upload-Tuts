const { response } = require("express");
const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
// localFileUpload -> handler function

exports.localFileUpload = async (req, res) => {
  try {
    let file = req.files.file;

    let path =
      __dirname + "/files/" + Date.now() + "." + file.name.split(".")[1];

    await file.mv(path);

    return res.status(200).json({
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

const isFileTypeSupported = (type, sptpe) => {
  return sptpe.includes(type);
};

const uploadFileToCloudinary = async (file, folderr, quality) => {
  const options = {
    folder: folderr,
    resource_type: "auto",
  };

  if (quality) {
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
  // tempFilePath inbuilt funciton hota hai jisse ki file ka temporariy path mil jata hai
  // folder: folderr krne se desired folder k andar me chal jayega
};

// imageUpload ka handler
exports.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, emails } = req.body;
    console.log(name, tags, emails);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported",
      });
    }

    // file format supported...now upload to cloudinary
    let response = await uploadFileToCloudinary(file, "myserver"); // cloud pe jo folder hai na..uska naam hai "myserver"
    console.log(response);

    // make an entry in DB
    const fileData = await File.create({
      name,
      tags,
      emails,
      imageUrl: response.secure_url,
    });
    return res.status(200).json({
      success: true,
      response: response.secure_url,
      message: "image uploading successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// videoupload ka handler
exports.videoUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, emails } = req.body;
    console.log(name, tags, emails);

    const file = req.files.videoFile;
    console.log(file);

    // validation
    const supportedTypes = ["mp4", "avi", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported",
      });
    }

    console.log("first");
    // file format supported...now upload to cloudinary
    let response = await uploadFileToCloudinary(file, "myserver");
    console.log(response);
    console.log("second");

    // make an entry in DB
    const fileData = await File.create({
      name,
      tags,
      emails,
      imageUrl: response.secure_url,
    });
    return res.status(200).json({
      success: true,
      response: response.secure_url,
      message: "image uploading successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    // data fetch
    const { name, tags, emails } = req.body;
    console.log(name, tags, emails);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported",
      });
    }

    // file format supported...now upload to cloudinary
    let response = await uploadFileToCloudinary(file, "myserver", 50);
    console.log(response);

    // make an entry in DB
    const fileData = await File.create({
      name,
      tags,
      emails,
      imageUrl: response.secure_url,
    });
    return res.status(200).json({
      success: true,
      response: response.secure_url,
      message: "image uploading successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
