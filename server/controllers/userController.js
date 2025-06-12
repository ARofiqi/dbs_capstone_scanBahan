"use strict";

const userService = require("../services/userService");
const { formatError } = require("../utils/errorUtils");
const path = require("path");
const { writeFile, unlink } = require("fs/promises");

async function getAllUsers(request, h) {
  try {
    const { page = 1, limit = 10, search = "" } = request.query;
    const users = await userService.getAllUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    });
    return h.response({ success: true, data: users }).code(200);
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function updateUser(request, h) {
  try {
    const { id } = request.params;
    const { payload } = request;
    let photoUrl = null;

    const existingUser = await userService.getUserById(id);

    if (payload.photo) {
      const photo = payload.photo;
      const filename = `Photo Profile-${Date.now()}-${photo.hapi.filename}`;
      const uploadPath = path.join(__dirname, "../uploads", filename);

      try {
        if (existingUser.photo) {
          const oldPhotoPath = path.join(__dirname, "..", existingUser.photo);
          try {
            await unlink(oldPhotoPath);
          } catch (err) {
            console.error("Gagal menghapus foto lama:", err);
          }
        }

        await writeFile(uploadPath, photo._data);
        photoUrl = `/uploads/${filename}`;
      } catch (uploadErr) {
        console.error("Error uploading photo:", uploadErr);
        throw new Error("Gagal mengupload foto");
      }
    } else if (payload.removePhoto === "true") {
      if (existingUser.photo) {
        const oldPhotoPath = path.join(__dirname, "..", existingUser.photo);
        try {
          await unlink(oldPhotoPath);
        } catch (err) {
          console.error("Gagal menghapus foto lama:", err);
        }
      }
      photoUrl = null;
    } else {
      photoUrl = existingUser.photo;
    }

    const updatedData = {
      username: payload.username,
      fullname: payload.fullname,
      photo: photoUrl,
    };

    const updatedUser = await userService.updateUser(id, updatedData);

    const filteredUser = {
      id: updatedUser.id,
      username: updatedUser.username,
      fullname: updatedUser.fullname,
      photo: updatedUser.photo,
    };

    return h.response({ success: true, data: filteredUser }).code(200);
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function deleteUser(request, h) {
  try {
    const { id } = request.params;
    await userService.deleteUser(id);
    return h.response({ success: true, message: "User berhasil dihapus" }).code(200);
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
