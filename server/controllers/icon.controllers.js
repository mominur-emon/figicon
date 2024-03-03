const Icon = require("../models/icon.model");
const multer = require("multer");

//using multer for uploaded images
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: Storage }).single("iconLink");

const uploadIcon = async (req, res) => {
  try {
    await upload(req, res, async (error) => {
      if (error) {
        res.status(404).send(error.message);
      } else {
        const newIcon = new Icon({
          name: req.body.name,
          iconLink: {
            data: req.file.filename,
            contentType: "image/png",
          },
          price: req.body.price,
          category: req.body.category,
          lanes: req.body.subCategory,
          shape: req.body.shape,
        });
        await newIcon.save();
        res.status(201).send(newIcon);
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { uploadIcon };
