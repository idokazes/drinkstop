const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    if (req.body?._id) {
      cb(null, req.body?._id + "." + extension);
    }

    cb(null, Date.now() + "." + extension);
  },
});

const upload = multer({ storage });

module.exports = { upload };
