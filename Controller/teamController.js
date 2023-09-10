const sendResponse = require("../Helper/Helper");
const teamModel = require("../models/teamModel");
const cloudinary = require("cloudinary").v2;

const Controller = {
  getTeam: async (req, res) => {},
  postTeam: async (req, res) => {},
  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        return res
          .send(sendResponse(false, null, "No Image Selected to Upload"))
          .status(400);
      }

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer);

    //   // Return the Cloudinary URL as a response
    //   res.json({ imageUrl: result.secure_url });
      res
        .send(
          sendResponse(
            false,
            result,
            `Image Uploaded Successfully : ${res.json({
              imageUrl: result.secure_url,
            })}`
          )
        )
        .status(200);
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ error: "Image upload failed" });
    }
  },
};

module.exports = Controller;
