const Icon = require("../models/icon.model");
const multer = require("multer");

//using multer for uploaded images
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
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
            contentType: "image/svg",
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

const getAllIcons = async (req, res) => {
  try {
    const icons = await Icon.find();
    res.status(200).send(icons);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { uploadIcon, getAllIcons };
