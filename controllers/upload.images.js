const multer = require(`multer`);
const path = require(`path`);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./image`);
  },
  filename: (req, file, cb) => {
    cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({

    storage: storage,

  fileFilter: (req, file, cb) => {

    const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`];
    if (!acceptedType.includes(file.mimetype)) {
      cb(null, false); /** refuse upload */
      return cb(`Invalid file type (${file.mimetype})`);
    }

    const fileSize = req.headers[`content-length`];
    const maxSize = 1 * 1024 * 1024; /** max: 1MB */
    if (fileSize > maxSize) {
      cb(null, false); /** refuse upload */
      return cb(`File size is too large`);
    }
    cb(null, true); /** accept upload */
  },
});
module.exports = upload;
