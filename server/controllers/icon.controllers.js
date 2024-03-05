const Icon = require("../models/icon.model");
const multer = require("multer");

//get-> get all icons (/api/icons)
const getAllIcons = async (req, res) => {
  try {
    const icons = await Icon.find();
    res.status(200).send(icons);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get-> get single icon (/api/icons/:_id)
const getSingleIcon = async (req, res) => {
  try {
    const icon = await Icon.findById(req.params._id);

    if (!icon) {
      res
        .status(500)
        .json({ message: "The icon with the given ID was not found." });
    }
    res.status(200).send(icon);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//using multer for upload images
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: Storage }).single("iconLink");

//post-> upload icon (/api/icons)
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
          category: req.body.category,
          lanes: req.body.subCategory,
          shape: req.body.shape,
          pro: req.body.pro,
        });
        await newIcon.save();
        res.status(201).send(newIcon);
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//put-> update icon (/api/icons/:_id)
const updateIcon = async (req, res) => {
  try {
    await upload(req, res, async (error) => {
      if (error) {
        res.status(404).send(error.message);
      } else {
        const icon = await Icon.findByIdAndUpdate(
          req.params._id,
          {
            name: req.body.name,
            iconLink: {
              data: req.file.filename,
              contentType: "image/svg",
            },
            category: req.body.category,
            lanes: req.body.subCategory,
            shape: req.body.shape,
            pro: req.body.pro,
          },
          { new: true }
        );

        if (!icon) return res.status(400).send("the icon cannot be updated!");

        res.status(201).send(icon);
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//delete-> delete single icon by id (/api/icons/:_id)
const deleteIcon = async (req, res) => {
  try {
    const icon = await Icon.findByIdAndDelete(req.params._id);

    if (icon) {
      return res
        .status(200)
        .json({ success: true, message: "The icon is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Icon not found!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  getAllIcons,
  getSingleIcon,
  uploadIcon,
  updateIcon,
  deleteIcon,
};
