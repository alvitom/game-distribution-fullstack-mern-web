const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (filePath, options) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, options);
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

// const cloudinaryDeleteImg = async (file) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.destroy(file, (result) => {
//       resolve(
//         {
//           url: result.secure_url,
//           asset_id: result.asset_id,
//           public_id: result.public_id,
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });
// };

module.exports = { uploadToCloudinary /* , cloudinaryDeleteImg */ };
