const cloudinary = require('../config/cloudinary');

const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'find_companion',
        resource_type: 'image',
        ...(uploadPreset
          ? { unsigned: true, upload_preset: uploadPreset }
          : {}),
      },
      (error, result) => {
        if (error) {
          error.uploadMode = uploadPreset ? 'unsigned' : 'signed';
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    stream.end(fileBuffer);
  });
};

module.exports = uploadImage;