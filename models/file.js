const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  emails: {
    type: String,
  },
});

// post middleware creation
//  doc ek object hai jo ki entry mera database me create hua hai aur kch nai
fileSchema.post("save", async (doc) => {
  try {
    console.log("DOC", doc);
    // transporter(jo mail bhej rha hai)
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send email
    let info = await transporter.sendMail({
      from: doc.name,
      to: doc.emails,
      subject: "New file is uploaded",
      html: `<h2>Hello people. File uploaded</h2> <a href=${doc.imageUrl}>click here</a>`,
    });

    console.log("INFO", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
