const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

const gameImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path).resize(300, 300).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`public/images/games/${file.filename}`);
      fs.unlinkSync(`public/images/games/${file.filename}`);
    })
  );
  next();
};

module.exports = { uploadImage, gameImgResize };
