const multer = require('multer');

const imageUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    files: 4,
    fileSize: 8 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

module.exports = imageUpload;