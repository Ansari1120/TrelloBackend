const sendResponse = require("../Helper/Helper");
const teamModel = require("../models/teamModel");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier"); // Import the streamifier library

const Controller = {
  getTeam: async (req, res) => {
    return res
      .send(sendResponse(true, null, "route is working fine of teams"))
      .status(200);
  },
  postTeam: async (req, res) => {},
  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        return res
          .send(sendResponse(false, null, "No Image Selected to Upload"))
          .status(400);
      }

      // Convert the multer file buffer to a readable stream
      const imageStream = streamifier.createReadStream(req.file.buffer);

      // Upload the image to Cloudinary using a stream
      const result = await cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, async (error, result) => {
          if (error) {
            console.error("Image upload error:", error);
            res.status(500).json({ error: "Image upload failed" });
          } else {
            // Return the Cloudinary URL as a response
            res
              .status(200)
              .send(
                sendResponse(
                  false,
                  result,
                  `Image Uploaded Successfully: ${result.secure_url}`
                )
              );
          }
        })
        .end(imageStream);
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ error: "Image upload failed" });
    }
  },
};

module.exports = Controller;
